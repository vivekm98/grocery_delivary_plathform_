from django.urls import path
from .views import *

urlpatterns = [  
    path("orders/create/", OrderCreateAPIView.as_view(), name="order-create"),
    path("orders/", UserOrderListAPIView.as_view(), name="user-orders"),
    
]