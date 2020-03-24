from django.contrib import admin

# Register your models here.
from apps.mailsending.models import MailModel

admin.site.register(MailModel)
