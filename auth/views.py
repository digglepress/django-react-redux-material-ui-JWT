from rest_framework import permissions
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from auth.serializers import UserSerializer


class UsersView(CreateAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = UserSerializer
    authentication_classes = ()


class Protected(APIView):
    def get(self, request):
        return Response(data={'type': 'protected'})
