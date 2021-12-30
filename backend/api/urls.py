from django.urls import path
from . import views

urlpatterns = [
	path('players-in-room/<str:room_code>/', views.playersInRoom, name="players-in-room"),
    path('get-room/<str:room_code>/', views.getRoom, name="get-room"),
    path('get-player/<str:key>/', views.getPlayer, name="get-player"),
    path('get-player-by-current-id/<str:id>/', views.getPlayerByCurrentID, name="get-player-by-current-id"),
	path('create-room/', views.createRoom, name="create-room"),
    path('create-player/', views.createPlayer, name="create-player"),
	path('update-room/<str:pk>/', views.updateRoom, name="update-room"),
    path('update-player/<str:pk>/', views.updatePlayer, name="update-player"),
    path('update-player-by-current-id/<str:id>/', views.updatePlayerByCurrentID, name="update-player-by-current-id"),
	path('delete-room/<str:pk>/', views.deleteRoom, name="delete-room"),
]