import React, { useEffect, useState } from "react";
import axiosInstance from "./axiosInstance";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [posters, setPosters] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    Promise.all([
      axiosInstance.get("/categories/"),
      axiosInstance.get("/products/?limit=8"),
      axiosInstance.get("/posters/")
    ])
      .then(([catRes, prodRes, posterRes]) => {
        setCategories(catRes.data || []);
        setProducts(prodRes.data.results || prodRes.data || []);
        setPosters(posterRes.data || []);
      })
      .catch(() => {
        console.log("Dashboard fetch error");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  /* ================= SEARCH ================= */
  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (filteredCategories.length > 0) {
      navigate(`/category/${filteredCategories[0].id}`);
    }
  };

  /* ================= ADD TO CART ================= */
  const handleAddToCart = async (productId) => {
    try {
      await axiosInstance.post("/cart/add/", {
        product_id: productId,
        quantity: 1
      });

      alert("Product added to cart ✅");
    } catch {
      alert("Please login first");
      navigate("/login");
    }
  };

  /* ================= LOADING ================= */
  if (loading)
    return <p className="text-center mt-5">Loading...</p>;

  return (
    <>
      {/* 🎞 CAROUSEL */}
{posters.length > 0 && (
  <div
    id="heroCarousel"
    className="carousel slide"
    data-bs-ride="carousel"
    data-bs-interval="3000"
  >

    {/* Indicators */}
    <div className="carousel-indicators">
      {posters.map((_, index) => (
        <button
          key={index}
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide-to={index}
          className={index === 0 ? "active" : ""}
        />
      ))}
    </div>

    {/* Slides */}
    <div className="carousel-inner">
      {posters.map((p, i) => (
        <div
          key={p.id}
          className={`carousel-item ${i === 0 ? "active" : ""}`}
        >
          <img
            src={p.image}
            className="d-block w-100 hero-img"
            alt="Banner"
          />
        </div>
      ))}
    </div>

    {/* Prev Button */}
    <button
      className="carousel-control-prev"
      type="button"
      data-bs-target="#heroCarousel"
      data-bs-slide="prev"
    >
      <span className="carousel-control-prev-icon" />
    </button>

    {/* Next Button */}
    <button
      className="carousel-control-next"
      type="button"
      data-bs-target="#heroCarousel"
      data-bs-slide="next"
    >
      <span className="carousel-control-next-icon" />
    </button>

  </div>
)}

      <div className="container dashboard">

        {/* 🔍 SEARCH */}
        <form onSubmit={handleSearchSubmit} className="search-bar">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Search category (Fruits, Dairy...)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {search && filteredCategories.length > 0 && (
            <ul className="search-suggestions">
              {filteredCategories.slice(0, 5).map(cat => (
                <li
                  key={cat.id}
                  onClick={() => navigate(`/category/${cat.id}`)}
                >
                  {cat.name}
                </li>
              ))}
            </ul>
          )}
        </form>

        {/* 📂 CATEGORIES */}
        <h4 className="section-title">Categories</h4>

        {categories.length === 0 ? (
          <p>No categories available</p>
        ) : (
          <div className="grid">
            {categories.map(cat => (
              <div
                key={cat.id}
                className="category-box"
                onClick={() => navigate(`/category/${cat.id}`)}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  onError={(e) => (e.target.src = "/placeholder.png")}
                />
                <div className="box-body">
                  <h6>{cat.name}</h6>
                  <span>Explore →</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 📦 PRODUCTS */}
        <h4 className="section-title">Popular Products</h4>

        {products.length === 0 ? (
          <p>No products available</p>
        ) : (
          <div className="grid">
            {products.map(product => (
              <div key={product.id} className="product-box">

                <img
                  src={product.image}
                  alt={product.name}
                  onClick={() => navigate(`/product/${product.id}`)}
                  onError={(e) => (e.target.src = "/placeholder.png")}
                />

                <div className="box-body center">
                  <h6
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    {product.name}
                  </h6>

                  <p>₹{product.price}</p>

                  <button
                    disabled={product.stock === 0}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product.id);
                    }}
                  >
                    {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                  </button>

                </div>
              </div>
            ))}
          </div>
        )}

        {/* 💅 CSS */}
        <style>{`
          .hero-img {
            height: 420px;
            object-fit: cover;
          }

          .dashboard {
            padding-bottom: 40px;
          }

          .search-bar {
            position: sticky;
            top: 0;
            background: #fff;
            padding: 20px 0;
            z-index: 20;
          }

          .search-suggestions {
            list-style: none;
            padding: 0;
            margin: 6px 0 0;
            background: white;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.12);
            position: absolute;
            width: 100%;
            max-width: 600px;
            z-index: 30;
          }

          .search-suggestions li {
            padding: 12px 16px;
            cursor: pointer;
            border-bottom: 1px solid #eee;
          }

          .search-suggestions li:hover {
            background: #f1f5ff;
          }

          .section-title {
            margin: 32px 0 16px;
            font-weight: 600;
          }

          .grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
            gap: 20px;
          }

          .category-box, .product-box {
            background: #fff;
            border-radius: 14px;
            overflow: hidden;
            box-shadow: 0 8px 20px rgba(0,0,0,0.06);
            transition: transform 0.25s ease;
            cursor: pointer;
          }

          .category-box:hover, .product-box:hover {
            transform: translateY(-6px);
          }

          .category-box img, .product-box img {
            height: 150px;
            width: 100%;
            object-fit: cover;
          }

          .box-body {
            padding: 14px;
          }

          .box-body h6 {
            margin: 0;
            font-weight: 600;
          }

          .box-body span {
            font-size: 13px;
            color: #0d6efd;
          }

          .center {
            text-align: center;
          }

          .center p {
            margin: 6px 0;
            font-weight: 600;
            color: #198754;
          }

          .center button {
            border: none;
            background: #0d6efd;
            color: white;
            padding: 6px 14px;
            border-radius: 20px;
            font-size: 14px;
          }

          .center button:disabled {
            background: gray;
            cursor: not-allowed;
          }
        `}</style>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
