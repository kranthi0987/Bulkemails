from django.contrib import admin

from apps.users.profile.models import UserProfile

admin.site.register(UserProfile)
