import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./axiosInstance";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  /* ================= FETCH CART ================= */
  useEffect(() => {
    axiosInstance.get("/cart/").then((res) => {
      setCartItems(res.data.items || res.data || []);
    });
  }, []);

  /* ================= SELECT ITEM ================= */
  const toggleSelect = (item) => {
    setSelectedItems((prev) =>
      prev.some((i) => i.id === item.id)
        ? prev.filter((i) => i.id !== item.id)
        : [...prev, item]
    );
  };

  /* ================= UPDATE QUANTITY ================= */
  const updateQuantity = (itemId, newQty) => {
    const item = cartItems.find((i) => i.id === itemId);
    if (!item || newQty < 1) return;

    if (newQty > item.product.stock) {
      alert(`Only ${item.product.stock} items available`);
      return;
    }

    setCartItems((prev) =>
      prev.map((i) =>
        i.id === itemId ? { ...i, quantity: newQty } : i
      )
    );

    setSelectedItems((prev) =>
      prev.map((i) =>
        i.id === itemId ? { ...i, quantity: newQty } : i
      )
    );

    axiosInstance.put(`/cart/update/${itemId}/`, { quantity: newQty });
  };

  /* ================= REMOVE ITEM ================= */
  const removeFromCart = (itemId) => {
    if (!window.confirm("Remove item from cart?")) return;

    setCartItems((prev) => prev.filter((i) => i.id !== itemId));
    setSelectedItems((prev) => prev.filter((i) => i.id !== itemId));

    axiosInstance.delete(`/cart/remove/${itemId}/`);
  };

  /* ================= TOTAL ================= */
  const totalPrice = selectedItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  /* ================= PLACE ORDER ================= */
  const handleOrder = () => {
    if (!selectedItems.length) {
      alert("Select at least one item");
      return;
    }

    navigate("/order", { state: { items: selectedItems } });
  };

  /* ================= UI ================= */
  return (
    <div className="container my-4">
      <h3>🛒 Your Cart</h3>

      {!cartItems.length ? (
        <div className="alert alert-warning">Cart is empty</div>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="card mb-3 shadow-sm">
              <div className="card-body d-flex align-items-center gap-3">
                <input
                  type="checkbox"
                  checked={selectedItems.some((i) => i.id === item.id)}
                  onChange={() => toggleSelect(item)}
                />

                <img
                  src={item.product.image}
                  alt={item.product.name}
                  width="80"
                  height="80"
                  style={{ objectFit: "cover", borderRadius: 8 }}
                />

                <div className="flex-grow-1">
                  <h6>{item.product.name}</h6>
                  <small>₹{item.product.price}</small>
                </div>

                <div className="d-flex gap-2">
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() =>
                      updateQuantity(item.id, item.quantity - 1)
                    }
                  >
                    −
                  </button>

                  <span>{item.quantity} {item.unit_name}</span>

                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() =>
                      updateQuantity(item.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>

                <strong>
                  ₹{item.product.price * item.quantity}
                </strong>

                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="card mt-3">
            <div className="card-body d-flex justify-content-between">
              <h5>Total: ₹{totalPrice}</h5>
              <button className="btn btn-success" onClick={handleOrder}>
                Order Selected Items
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
