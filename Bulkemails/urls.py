"""Bulkemails URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.urls import path, include

from apps.landingpage.views import landingPage

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('apps.users.api.user.urls')),
    path('api/', include('apps.users.api.profile.urls')),
    path('api/', include('apps.mailsending.urls')),
    path('', include('apps.landingpage.urls')),
    path('web/', include('apps.users.web.webusersystem.urls')),
]
urlpatterns += staticfiles_urlpatterns()
