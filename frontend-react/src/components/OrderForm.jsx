import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "./axiosInstance";

const OrderForm = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const items = state?.items ?? [];

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
  });

  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ FORM SUBMIT HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!items.length) {
      alert("Cart is empty ❌");
      return;
    }

    try {
      await axiosInstance.post("/orders/create/", {
        ...form,
        items: items.map((item) => ({
          product: item.product.id,
          quantity: item.quantity,
        })),
      });

      alert("Order placed successfully 🎉");
      navigate("/orders");
    } catch (error) {
      console.error("Order error:", error.response?.data || error);
      alert("Failed to place order ❌");
    }
  };

  return (
    <div className="container my-5">
      <div className="row g-4">

        {/* ORDER SUMMARY */}
        <div className="col-lg-5">
          <div
            className="card shadow-sm border-0 rounded-4 p-3 sticky-top"
            style={{ top: "90px" }}
          >
            <h5 className="fw-bold mb-3">🛒 Order Summary</h5>

            {items.map((item) => (
              <div
                key={item.product.id}
                className="d-flex align-items-center mb-3"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  width="60"
                  height="60"
                  className="rounded"
                  style={{ objectFit: "cover" }}
                />

                <div className="ms-3 flex-grow-1">
                  <h6 className="mb-0">{item.product.name}</h6>
                  <small className="text-muted">
                    Qty: {item.quantity}
                  </small>
                </div>

                <strong>
                  ₹{item.product.price * item.quantity}
                </strong>
              </div>
            ))}

            <hr />

            <h5 className="d-flex justify-content-between">
              <span>Total</span>
              <span className="text-success">₹{totalPrice}</span>
            </h5>
          </div>
        </div>

        {/* DELIVERY FORM */}
        <div className="col-lg-7">
          <form
            className="card shadow-sm border-0 rounded-4 p-4"
            onSubmit={handleSubmit}
          >
            <h5 className="fw-bold mb-4">📦 Delivery Details</h5>

            <div className="row g-3">

              {/* NAME */}
              <div className="col-md-6">
                <label className="form-label small">Full Name</label>
                <input
                  className="form-control"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              {/* PHONE */}
              <div className="col-md-6">
                <label className="form-label small">Phone</label>
                <input
                  className="form-control"
                  name="phone"
                  required
                  pattern="[0-9]{10}"
                  title="Enter 10 digit phone number"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>

              {/* ADDRESS */}
              <div className="col-12">
                <label className="form-label small">Address</label>
                <textarea
                  className="form-control"
                  name="address"
                  required
                  rows="3"
                  value={form.address}
                  onChange={handleChange}
                />
              </div>

              {/* CITY */}
              <div className="col-md-4">
                <label className="form-label small">City</label>
                <input
                  className="form-control"
                  name="city"
                  required
                  value={form.city}
                  onChange={handleChange}
                />
              </div>

              {/* STATE */}
              <div className="col-md-4">
                <label className="form-label small">State</label>
                <input
                  className="form-control"
                  name="state"
                  required
                  value={form.state}
                  onChange={handleChange}
                />
              </div>

              {/* COUNTRY */}
              <div className="col-md-4">
                <label className="form-label small">Country</label>
                <input
                  className="form-control"
                  name="country"
                  required
                  value={form.country}
                  onChange={handleChange}
                />
              </div>

            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="btn btn-success w-100 mt-4 py-2 fw-semibold"
              disabled={!items.length}
            >
              Place Order
            </button>

          </form>
        </div>

      </div>
    </div>
  );
};

export default OrderForm;
