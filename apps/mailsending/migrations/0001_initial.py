# Generated by Django 3.0.4 on 2020-03-27 19:10

import datetime
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='MailContent',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uuid', models.UUIDField(default=uuid.uuid4)),
                ('htmlcontent', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='MailModel',
            fields=[
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('from_email', models.EmailField(max_length=254)),
                ('to_email', models.EmailField(max_length=254)),
                ('sent_date_time', models.DateTimeField(default=datetime.datetime.now)),
                ('subject', models.TextField()),
                ('message', models.TextField()),
                ('mailcontent', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mailsending.MailContent')),
            ],
        ),
    ]
