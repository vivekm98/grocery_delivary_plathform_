from rest_framework import generics, permissions, status
from rest_framework.response import Response

from .models import Cart, CartItem
from products.models import Product
from .serializers import CartSerializer

# Create your views here.
def get_user_cart(user):
    cart, created = Cart.objects.get_or_create(user=user)
    return cart

class CartView(generics.RetrieveAPIView):
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return get_user_cart(self.request.user)


class AddToCartView(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        product_id = request.data.get("product_id")
        quantity = int(request.data.get("quantity", 1))

        if quantity < 1:
            return Response(
                {"error": "Quantity must be at least 1"},
                status=status.HTTP_400_BAD_REQUEST
            )

        product = Product.objects.get(id=product_id)

        # 🔥 STOCK CHECK
        if quantity > product.stock:
            return Response(
                {
                    "error": f"Only {product.stock} items available in stock"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        cart = get_user_cart(request.user)

        cart_item, created = CartItem.objects.get_or_create(
            cart=cart,
            product=product
        )

        new_quantity = quantity if created else cart_item.quantity + quantity

        # 🔥 TOTAL STOCK CHECK
        if new_quantity > product.stock:
            return Response(
                {
                    "error": f"Total quantity cannot exceed available stock ({product.stock})"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        cart_item.quantity = new_quantity
        cart_item.save()

        return Response(
            CartSerializer(cart).data,
            status=status.HTTP_201_CREATED
        )

class UpdateCartItemView(generics.UpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request, item_id, *args, **kwargs):
        quantity = int(request.data.get("quantity"))

        cart = get_user_cart(request.user)
        item = CartItem.objects.get(id=item_id, cart=cart)

        item.quantity = quantity
        item.save()

        return Response({"message": "Quantity updated"})

class RemoveCartItemView(generics.DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, item_id, *args, **kwargs):
        cart = get_user_cart(request.user)
        item = CartItem.objects.get(id=item_id, cart=cart)
        item.delete()

        return Response({"message": "Item removed"})
