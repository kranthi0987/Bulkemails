from django.contrib import admin

from apps.users.api.user.models import User


admin.site.register(User)
