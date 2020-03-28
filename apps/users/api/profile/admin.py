from django.contrib import admin

from apps.users.api.profile.models import UserProfile

admin.site.register(UserProfile)
