from django.contrib import admin

# Register your models here.

from apps.mailsending.models import MailModel


# ModelAdmin Class # DataFlair
class MailModel1(admin.ModelAdmin):
    list_display = ('uuid', 'from_email', 'to_email', 'subject', 'message',)
    list_filter = ('sent_date_time',)


admin.site.register(MailModel, MailModel1)

admin.site.site_header = "Bulk emails django Admin"
