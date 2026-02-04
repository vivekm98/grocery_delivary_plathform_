import React, { useEffect, useState } from "react";
import axiosInstance from "./axiosInstance";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "./Footer";

const ProductsCategory = () => {
  const { id } = useParams(); // category id
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const BASE_URL = "http://127.0.0.1:8000/api";

  // Fetch products for category
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get(`${BASE_URL}/products/?category=${id}`);
        setProducts(res.data);
        setFilteredProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [id]);

  // Handle search input
  useEffect(() => {
    if (search.trim() === "") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((p) =>
          p.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, products]);

  const handleAddToCart = async (productId) => {
    try {
      await axiosInstance.post("/cart/add/", {
        product_id: productId,
        quantity: 1,
      });
      alert("Product added to cart ✅");
    } catch (err) {
      alert("Please login to add to cart");
    }
  };

  return (
    <>
    <div className="container my-5">
      <h3 className="mb-4">Category Products</h3>

      {/* 🔍 Search Bar */}
      <div className="mb-4 position-relative">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && filteredProducts.length > 0 && (
          <ul className="search-suggestions">
            {filteredProducts.slice(0, 5).map((p) => (
              <li key={p.id} onClick={() => navigate(`/product/${p.id}`)}>
                {p.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary"></div>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="alert alert-warning">No products found</div>
      ) : (
        <div className="row">
          {filteredProducts.map((product) => (
            <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <div className="card product-card h-100 shadow-sm">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: "180px", objectFit: "cover" }}
                  onClick={() => navigate(`/product/${product.id}`)}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h6 className="card-title">{product.name}</h6>
                    <p className="fw-bold text-success">₹{product.price}</p>
                    <p className="text-muted product-description">
                      {product.description
                        ? product.description.length > 60
                          ? product.description.substring(0, 60) + "..."
                          : product.description
                        : "No description available."}
                    </p>
                  </div>
                  <button
                    className="btn btn-primary mt-2"
                    onClick={() => handleAddToCart(product.id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CSS */}
      <style>{`
        .product-card {
          border-radius: 12px;
          transition: transform 0.3s, box-shadow 0.3s;
          cursor: pointer;
        }
        .product-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 28px rgba(0,0,0,0.15);
        }
        .product-description {
          font-size: 14px;
          margin: 6px 0;
          color: #555;
        }
        .btn-primary {
          border-radius: 20px;
          transition: background 0.3s;
        }
        .btn-primary:hover {
          background: #0b5ed7;
        }
        .search-suggestions {
          list-style: none;
          padding: 0;
          margin: 4px 0 0;
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.12);
          position: absolute;
          width: 100%;
          z-index: 100;
        }
        .search-suggestions li {
          padding: 10px 16px;
          cursor: pointer;
          border-bottom: 1px solid #eee;
        }
        .search-suggestions li:hover {
          background: #f1f5ff;
        }
      `}</style>
      
    </div>
    <Footer />
    </>
    
  );
};

export default ProductsCategory;
