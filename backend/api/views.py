from rest_framework.decorators import api_view
from rest_framework.response import Response
import django_rq
from django.conf import settings
import redis
from time import sleep
from datetime import datetime
from .serializers import RoomSerializer, PlayerSerializer, RoomPlayersSerializer
from .models import Room, Player

redis_connection = redis.StrictRedis(host=settings.REDIS_HOST, port=settings.REDIS_PORT, db=0)

def constant_check():
    x = 1
    while True:
        sleep(20)
        print(str(x))
        current_time = datetime.now()
        databases = redis_connection.hgetall("Pending Databases")
        for entry in databases.items():
            elapsed_time = current_time - datetime.strptime(entry[1].decode('utf-8'), "%Y-%m-%d %H:%M:%S.%f")
            if  elapsed_time.total_seconds() > 20.0:
                room = Room.objects.get(room_code=entry[0].decode('utf-8'))
                room.delete()
                redis_connection.hdel("Pending Databases", entry[0])
                print("room deleted")
        x += 20

def employ_constant_check():
    queue = django_rq.get_queue('default')
    queue.enqueue(constant_check, job_timeout=-1)

employ_constant_check()

@api_view(['GET'])
def playersInRoom(request, room_code):
	room = Room.objects.get(room_code=room_code)
	serializer = RoomPlayersSerializer(room, many=False)
	return Response(serializer.data)

@api_view(['GET'])
def getRoom(request, room_code):
	room = Room.objects.get(room_code=room_code)
	serializer = RoomSerializer(room, many=False)
	return Response(serializer.data)

@api_view(['GET'])
def getPlayerByCurrentID(request, id):
	player = Player.objects.get(current_ID=id)
	serializer = PlayerSerializer(player, many=False)
	return Response(serializer.data)

@api_view(['GET'])
def getPlayer(request, key):
	player = Player.objects.get(key=key)
	serializer = PlayerSerializer(player, many=False)
	return Response(serializer.data)

@api_view(['POST'])
def createRoom(request):
	serializer = RoomSerializer(data=request.data)
	if serializer.is_valid():
		serializer.save()
		# print(serializer.data)
	return Response(serializer.data)

@api_view(['POST'])
def createPlayer(request):
	serializer = PlayerSerializer(data=request.data)
	if serializer.is_valid():
		serializer.save()
	else:
		print(serializer.errors)
	return Response(serializer.data)

@api_view(['POST'])
def updateRoom(request, pk):
	room = Room.objects.get(id=pk)
	serializer = RoomSerializer(instance=room, data=request.data)
	if serializer.is_valid():
		serializer.save()
	return Response('Room updated')

@api_view(['POST'])
def updatePlayerByCurrentID(request, id):
	player = Player.objects.get(current_ID=id)
	serializer = RoomSerializer(instance=player, data=request.data)
	if serializer.is_valid():
		serializer.save()
	return Response('Room updated')

@api_view(['POST'])
def updatePlayer(request, pk):
	player = Player.objects.get(id=pk)
	serializer = RoomSerializer(instance=player, data=request.data)
	if serializer.is_valid():
		serializer.save()
	return Response('Room updated')

@api_view(['DELETE'])
def deleteRoom(request, pk):
	room = Room.objects.get(id=pk)
	room.delete()
	return Response('Room deleted')

