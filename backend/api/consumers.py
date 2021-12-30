# chat/consumers.py
import json
from asgiref.sync import async_to_sync
from django.db import connection
from channels.generic.websocket import WebsocketConsumer
from . import models
from datetime import datetime
import redis
from django.conf import settings

redis_connection = redis.StrictRedis(host=settings.REDIS_HOST, port=settings.REDIS_PORT, db=0)

class GameConsumer(WebsocketConsumer):
    def connect(self):
        # the six digit code in the websocket url
        self.room_name = self.scope['url_route']['kwargs']['roomCode']
        # construct the channel group name as "room_######"
        self.room_group_name = 'room_%s' % self.room_name
        # add to channel group
        async_to_sync(self.channel_layer.group_add)(self.room_group_name, self.channel_name)
        self.accept()

        # turns room back open
        room = models.Room.objects.get(room_code=self.room_name)
        if room.open == False:
            room.open = True
            room.save()
            redis_connection.hdel("Pending Databases", room.room_code)
        # sends players to frontend to check if a logged out player is locally present
        payload = {
            'action': 'register',
            'players': [{'key': player.key, 'present': player.present} for player in room.player_set.all()],
            'player': self.channel_name,
        }

        self.send(text_data=json.dumps({
            'message': payload
        }))

        connection.close()

    def disconnect(self, close_code):
        room = models.Room.objects.get(room_code=self.room_name)
        close = True
        for player in room.player_set.all():
            if player.current_ID == self.channel_name:
                player.present = False
                player.save()
            if player.present:
                close = False
        if close:
            room.open = False
            room.save()
            redis_connection.hset("Pending Databases", room.room_code, str(datetime.now()))
        connection.close()

        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        data = text_data_json['message']
        action = data['action']

        if action=='new player':
            room = models.Room.objects.get(room_code=self.room_name)
            player = models.Player(key=self.channel_name, present=True, current_ID=self.channel_name, room=room)
            player.save()

            # if four players are added then game starts.
            if len(room.player_set.all()) == 4:
                async_to_sync(self.channel_layer.group_send)(
                    self.room_group_name,{
                    'type': 'group_message',
                    "action": "start game",
                })
    
        elif action=='returning player':
            player = models.Player.objects.get(key=data['key'])
            player.present = True
            player.current_ID = self.channel_name
            player.save()
            connection.close()

    def group_message(self, event):
        if event['action'] == "start game":
            room = models.Room.objects.get(room_code=self.room_name)
            deck = room.deck[0:13]
            room.deck = room.deck[13:]
            room.save()
            connection.close()
            payload = {
                "action":"fill hand",
                "hand":deck,
                "player":models.Player.objects.get(current_ID=self.channel_name).key,
            }
            self.send(text_data=json.dumps({
                "message":payload
            }))
            connection.close()