from rest_framework import serializers
from .models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ["product", "quantity", "price"]


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    status_name = serializers.CharField(source="status.status", read_only=True)

    class Meta:
        model = Order
        fields = [
            "id",
            "name",
            "phone",
            "address",
            "city",
            "state",
            "country",
            "items",
            "created_at",
            "status",
            "status_name"
        ]
        read_only_fields = ["created_at"]

    def create(self, validated_data):
        items_data = validated_data.pop("items")
        user = self.context["request"].user

        order = Order.objects.create(user=user, **validated_data)

        for item in items_data:
            OrderItem.objects.create(order=order, **item)

        return order
