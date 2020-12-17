from rest_framework import routers

from .api import TodosViewSet

router = routers.DefaultRouter()
router.register(prefix='v1/todos', viewset=TodosViewSet, basename="todos")
