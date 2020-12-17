from rest_framework import viewsets

from todos.api.serializer import TodosSerializer
from todos.models import Todos


class TodosViewSet(viewsets.ModelViewSet):
    queryset = Todos.objects.all()
    serializer_class = TodosSerializer
