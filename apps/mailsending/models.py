import uuid
from datetime import datetime

from django.db import models


# Create your models here.


class MailModel(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    from_email = models.EmailField()
    to_email = models.EmailField()
    sent_date_time = models.DateTimeField(default=datetime.now)
    subject = models.TextField()
    mailcontent = models.TextField()
    message = models.TextField()


