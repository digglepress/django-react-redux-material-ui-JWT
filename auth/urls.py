from django.urls import path
from rest_framework_simplejwt import views as jwt_view

from auth import views

urlpatterns = [
    path("register", views.UsersView.as_view()),
    path('token', jwt_view.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', jwt_view.TokenRefreshView.as_view(), name='token_refresh'),
]
