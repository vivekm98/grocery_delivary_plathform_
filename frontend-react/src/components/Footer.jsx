import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="footer mt-5">
  <div className="container py-5">
    <div className="row">

      {/* Logo + About */}
      <div className="col-md-4">
        <h5 className="fw-bold text-success">FreshMart</h5>
        <p className="text-muted small">
          Fresh groceries delivered to your doorstep. Quality products,
          fast delivery and trusted service.
        </p>
      </div>

      {/* Quick Links */}
      <div className="col-md-2">
        <h6 className="fw-semibold">Quick Links</h6>
        <ul className="footer-links">
          <li>Home</li>
          <li>Categories</li>
          <li>Products</li>
          <li>Cart</li>
        </ul>
      </div>

      {/* Categories */}
      <div className="col-md-3">
        <h6 className="fw-semibold">Top Categories</h6>
        <ul className="footer-links">
          <li>Vegetables</li>
          <li>Fruits</li>
          <li>Dairy</li>
          <li>Snacks</li>
        </ul>
      </div>

      {/* Contact */}
      <div className="col-md-3">
        <h6 className="fw-semibold">Contact</h6>
        <p className="small text-muted mb-1">📍 Maharashtra, India</p>
        <p className="small text-muted mb-1">📞 +91 9876543210</p>
        <p className="small text-muted">✉ support@freshmart.com</p>
      </div>

    </div>

    {/* Bottom */}
    <hr />
    <div className="text-center small text-muted">
      © {new Date().getFullYear()} FreshMart. All rights reserved.
    </div>
  </div>

  {/* Styling */}
  <style>{`
    .footer {
      background: #f8faf9;
      border-top: 1px solid #e6e6e6;
    }

    .footer-links {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .footer-links li {
      font-size: 14px;
      color: #555;
      margin-bottom: 8px;
      cursor: pointer;
      transition: 0.2s;
    }

    .footer-links li:hover {
      color: #198754;
      padding-left: 4px;
    }
  `}</style>
</footer>

  );
};

export default Footer;
