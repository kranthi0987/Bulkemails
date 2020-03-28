# Create your views here.
from django.core.mail import send_mail
from rest_framework import status
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from apps.mailsending.models import MailModel
from apps.mailsending.serializer import MailModelSerializer


class emailView(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_class = JSONWebTokenAuthentication

    def get(self, request, *args, **kwargs):
        pk = self.kwargs.get('mailuuid')
        if pk is None:
            print("no pk")
            mailModels = MailModel.objects.all()
            # the many param informs the serializer that it will be serializing more than a single article.
            serializer = MailModelSerializer(mailModels, many=True)
            return Response({"status": True, "message": "sucessful retrieved list", "mails": serializer.data})
        else:
            print("no pk")
            mailModels = MailModel.objects.get(uuid=pk)
            # the many param informs the serializer that it will be serializing more than a single article.
            serializer = MailModelSerializer(mailModels)
            return Response({"status": True, "message": "sucessful retrieved list", "mails": serializer.data})

    def put(self, request, *args, **kwargs):
        pk = self.kwargs.get('mailuuid')
        saved_article = get_object_or_404(MailModel.objects.all(), pk=pk)
        data = request.data.get('mails')
        serializer = MailModelSerializer(instance=saved_article, data=data, partial=True)
        if serializer.is_valid(raise_exception=True):
            article_saved = serializer.save()
        return Response({"success": "mail '{}' updated successfully".format(article_saved.uuid)})

    def delete(self, request, *args, **kwargs):
        pk = self.kwargs.get('mailuuid')
        # Get object with this pk
        article = get_object_or_404(MailModel.objects.all(), pk=pk)
        article.delete()
        return Response({"message": "mail with id `{}` has been deleted.".format(pk)}, status=204)

    def post(self, request):
        mails = request.data.get('mails')
        # Create an article from the above data
        serializer = MailModelSerializer(data=mails)
        if serializer.is_valid(raise_exception=True):
            mails_saved = serializer.save()
            send_mail(mails['subject'], "normal message", mails['from_email'], ['kranthi0987@gmail.com'],
                      fail_silently=False,html_message=mails['message'])
            return Response({"status": "True", "message": "mail '{}' created successfully".format(mails_saved.uuid)},
                            status=status.HTTP_201_CREATED)
        else:
            return Response({"message": "Bad request", "status": False}, status=status.HTTP_400_BAD_REQUEST)
