from rest_framework import serializers
from .models import Cart, CartItem

from products.serializers import ProductSerializer

class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    unit_name = serializers.CharField(source="product.unit.name", read_only=True)

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'quantity',"unit_name",]

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'items']
