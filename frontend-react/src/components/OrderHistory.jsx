import React, { useEffect, useState } from "react";
import axiosInstance from "./axiosInstance";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        console.log("Fetching orders...");

        const res = await axiosInstance.get("/orders/");

        console.log("Orders Success Response:", res.data);

        setOrders(res.data || []);
      } catch (error) {
        console.error("Order Fetch Error:", error);

        if (error.response) {
          console.error("Status:", error.response.status);
          console.error("Error Data:", error.response.data);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Badge Styling
  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return "bg-warning text-dark";
      case "Processing":
        return "bg-info text-dark";
      case "Shipped":
        return "bg-primary";
      case "Delivered":
        return "bg-success";
      case "Cancelled":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  // Loading UI
  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-success"></div>
        <p className="mt-2">Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="container my-5" style={{ maxWidth: "900px" }}>
      <h3 className="fw-bold mb-4 text-center">📦 Your Orders</h3>

      {orders.length === 0 ? (
        <div className="card shadow-sm border-0 text-center p-4">
          <h5>No orders found</h5>
          <p className="text-muted mb-0">
            Looks like you haven't placed any order yet.
          </p>
        </div>
      ) : (
        orders.map((order) => {
          const items = order.items || [];

          const orderTotal = items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );

          return (
            <div
              key={order.id}
              className="card shadow-sm border-0 rounded-4 mb-4"
            >
              {/* Header */}
              <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-0 fw-semibold">Order #{order.id}</h6>
                  <small className="text-muted">
                    {new Date(order.created_at).toLocaleString()}
                  </small>
                </div>

                <span
                  className={`badge px-3 py-2 ${getStatusBadge(
                    order.status_name
                  )}`}
                >
                  {order.status_name}
                </span>
              </div>

              {/* Body */}
              <div className="card-body">
                {/* Delivery Info */}
                <div className="mb-3">
                  <p className="mb-1">
                    <strong>Name:</strong> {order.name}
                  </p>
                  <p className="mb-1">
                    <strong>Phone:</strong> {order.phone}
                  </p>
                  <p className="mb-0 text-muted">
                    {order.address}, {order.city}, {order.state},{" "}
                    {order.country}
                  </p>
                </div>

                <hr />

                {/* Items */}
                <ul className="list-group list-group-flush">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="list-group-item d-flex justify-content-between align-items-center px-0"
                    >
                      <div>
                        <h6 className="mb-0">{item.product_name}</h6>
                        <small className="text-muted">
                          ₹{item.price} × {item.quantity}
                        </small>
                      </div>

                      <strong className="text-success">
                        ₹{item.price * item.quantity}
                      </strong>
                    </li>
                  ))}
                </ul>

                <hr />

                {/* Total */}
                <div className="d-flex justify-content-end">
                  <h5 className="fw-bold">
                    Total:{" "}
                    <span className="text-success">₹{orderTotal}</span>
                  </h5>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default OrderHistory;
