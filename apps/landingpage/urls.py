from django.urls import path

from apps.landingpage.views import landingPage

urlpatterns = [
    path('', landingPage.as_view(), name='home'),
]
