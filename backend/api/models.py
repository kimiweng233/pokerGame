from django.contrib.postgres.fields import ArrayField
from django.db import models
from django.db.models.fields import BooleanField, CharField

class Room(models.Model):
    room_code = models.CharField(max_length=30)
    deck = ArrayField(models.JSONField(), size=236, blank=True, default=None)
    open = BooleanField(default=True)

class Player(models.Model):
    key = CharField(max_length=300)
    present = BooleanField()
    current_ID = CharField(max_length=300)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)