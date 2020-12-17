from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from todos.models import Todos


class TodosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todos
        fields = ["id", "title", "description", "completed", "modified_at"]
        order_by = '-modified_at'
