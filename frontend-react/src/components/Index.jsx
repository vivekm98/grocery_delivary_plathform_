import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      {/* HERO SECTION */}
      <section className="bg-light py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="fw-bold mb-3">
                Fresh Groceries Delivered <span className="text-success">to Your Door</span>
              </h1>
              <p className="text-muted mb-4">
                Order fruits, vegetables, dairy, and daily essentials online
                and get fast delivery at your doorstep.
              </p>
              <Link to="/register" className="btn btn-success me-3">
                Get Started
              </Link>
              <Link to="/login" className="btn btn-outline-success">
                Login
              </Link>
            </div>

            <div className="col-md-6 text-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3081/3081559.png"
                alt="Grocery delivery"
                className="img-fluid"
                style={{ maxHeight: "300px" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-5">
        <div className="container text-center">
          <h2 className="mb-4 fw-bold">Why Choose Us?</h2>
          <div className="row">
            <div className="col-md-4 mb-3">
              <div className="card shadow-sm h-100 p-3">
                <h5 className="fw-bold text-success">Fresh Products</h5>
                <p className="text-muted">
                  We deliver farm-fresh vegetables and fruits every day.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card shadow-sm h-100 p-3">
                <h5 className="fw-bold text-success">Fast Delivery</h5>
                <p className="text-muted">
                  Get your groceries delivered within hours.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card shadow-sm h-100 p-3">
                <h5 className="fw-bold text-success">Secure Payments</h5>
                <p className="text-muted">
                  Safe and secure online payment options.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-light py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-4">How It Works</h2>
          <div className="row">
            <div className="col-md-4">
              <h5>1️⃣ Register</h5>
              <p className="text-muted">Create your free account</p>
            </div>
            <div className="col-md-4">
              <h5>2️⃣ Add to Cart</h5>
              <p className="text-muted">Choose groceries you need</p>
            </div>
            <div className="col-md-4">
              <h5>3️⃣ Get Delivery</h5>
              <p className="text-muted">Sit back & relax</p>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-5 text-center">
        <div className="container">
          <h2 className="fw-bold mb-3">Start Ordering Today</h2>
          <p className="text-muted mb-4">
            Join thousands of happy customers using our grocery delivery service.
          </p>
          <Link to="/register" className="btn btn-success btn-lg">
            Create Free Account
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
