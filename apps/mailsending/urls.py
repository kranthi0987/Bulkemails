from django.urls import path

from apps.mailsending.views import emailViewSet

urlpatterns = [
    path('mail/', emailViewSet.as_view()),
]
