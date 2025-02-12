from django.urls import path
from api import views

urlpatterns = [
    path('', views.getCampaings),
    path('add/', views.addCampaing),
    path('toggle/', views.toggleActive),
    path('delete/', views.deleteCampaign),
]