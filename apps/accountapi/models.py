from django.contrib.auth.models import User, AbstractUser
from django.db import models
import ipdb

# Create your models here.
#
#
# class ExtendedUserModel(AbstractUser):
#     created = models.DateTimeField(auto_now_add=True)
#     phone_number = models.IntegerField(blank=True)
from django.db.models.signals import post_save
from django.dispatch import receiver


class UserProfiles(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.TextField()

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfiles.objects.create(user=instance)

# @receiver(post_save, sender=User)
# def save_user_profile(sender, instance, **kwargs):
#     instance.UserProfiles.save()
class Counter(models.Model):
    multimedia_message_count = models.BigIntegerField(default=0)
    text_message_count = models.BigIntegerField(default=0)
    total_message_count = models.BigIntegerField(default=0)