from rest_framework import serializers

from apps.mailsending.models import MailModel


class MailModelSerializer(serializers.ModelSerializer):
    # topic = mailContentSerializer(read_only=True)

    class Meta:
        model = MailModel
        fields = '__all__'

    def create(self, validated_data):
        return MailModel.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.from_email = validated_data.get('from_email', instance.from_email)
        instance.to_email = validated_data.get('to_email', instance.to_email)
        instance.subject = validated_data.get('subject', instance.subject)
        instance.message = validated_data.get('message', instance.message)
        instance.mailcontent=validated_data.get('mailcontent',instance.mailcontent)

        instance.save()
        return instance
