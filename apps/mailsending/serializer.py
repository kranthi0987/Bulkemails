from rest_framework import serializers

from apps.mailsending.models import MailModel


class MailModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = MailModel
        fields = '__all__'

    def create(self, validated_data):
        return MailModel.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)
        instance.body = validated_data.get('body', instance.body)
        instance.author_id = validated_data.get('author_id', instance.author_id)

        instance.save()
        return instance
