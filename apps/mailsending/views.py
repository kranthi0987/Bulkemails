# Create your views here.
from django.core.mail import send_mail
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from apps.mailsending.models import MailModel
from apps.mailsending.serializer import MailModelSerializer


class emailViewSet(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_class = JSONWebTokenAuthentication

    def get(self, request):
        articles = MailModel.objects.all()
        return Response({"articles": articles})

    def put(self, request, pk):
        saved_article = get_object_or_404(MailModel.objects.all(), pk=pk)
        data = request.data.get('article')
        serializer = MailModelSerializer(instance=saved_article, data=data, partial=True)
        if serializer.is_valid(raise_exception=True):
            article_saved = serializer.save()
            send_mail('Subject here', 'Here is the message.', 'from@example.com', ['to@example.com'],
                      fail_silently=False)
        return Response({"success": "Article '{}' updated successfully".format(article_saved.title)})

    def delete(self, request, pk):
        # Get object with this pk
        article = get_object_or_404(MailModel.objects.all(), pk=pk)
        article.delete()
        return Response({"message": "Article with id `{}` has been deleted.".format(pk)}, status=204)

    def post(self, request):
        article = request.data.get('article')
        # Create an article from the above data
        serializer = MailModelSerializer(data=article)
        if serializer.is_valid(raise_exception=True):
            article_saved = serializer.save()
        return Response({"success": "Article '{}' created successfully".format(article_saved.title)})
