from rest_framework import serializers 
from .models import Room, Player

class RoomPlayersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ()
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['players'] =  [{'key':player.key, 'current_ID':player.current_ID, 'present':player.present} for player in instance.player_set.all()]
        return representation

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'

class PlayerSerializer(serializers.ModelSerializer):
    room = serializers.CharField()

    class Meta:
        model = Player
        fields = '__all__'

    def create(self, validated_data):
        room = validated_data.pop('room')
        room_entry = Room.objects.get(id=room)
        player_instance = Player.objects.create(**validated_data, room=room_entry)
        return player_instance