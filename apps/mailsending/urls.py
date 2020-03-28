from django.conf.urls import url
from django.urls import path
from apps.mailsending.views import emailView

urlpatterns = [
    path('mail/', emailView.as_view()),
    url(r'^mail/(?P<mailuuid>[0-9A-Fa-f-]+)', emailView.as_view()),
]
