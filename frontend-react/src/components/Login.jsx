import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/token/",
        { username, password }
      );

      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);
      setIsLoggedIn(true);
      navigate("/dashboard");
    } catch {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "linear-gradient(135deg, #e8f5e9, #ffffff)",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5 col-lg-4">

            <div className="card border-0 shadow-lg rounded-4 p-4">

              {/* HEADER */}
              <div className="text-center mb-4">
                <div
                  className="rounded-circle bg-success text-white d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: 60, height: 60 }}
                >
                  <FontAwesomeIcon icon={faRightToBracket} size="lg" />
                </div>

                <h4 className="fw-bold">Welcome Back</h4>
                <p className="text-muted small mb-0">
                  Login to continue shopping
                </p>
              </div>

              {/* ERROR MESSAGE */}
              {error && (
                <div className="alert alert-danger text-center py-2">
                  {error}
                </div>
              )}

              {/* FORM */}
              <form onSubmit={handleLogin}>

                {/* USERNAME */}
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <label htmlFor="username">Username</label>
                </div>

                {/* PASSWORD */}
                <div className="form-floating mb-4">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label htmlFor="password">Password</label>
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  className="btn btn-success w-100 py-2 fw-semibold"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <FontAwesomeIcon icon={faSpinner} spin className="me-2" />
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </button>
              </form>

              {/* FOOTER */}
              <div className="text-center mt-4">
                <small className="text-muted">
                  Don’t have an account?{" "}
                  <Link
                    to="/register"
                    className="fw-semibold text-success text-decoration-none"
                  >
                    Register
                  </Link>
                </small>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
