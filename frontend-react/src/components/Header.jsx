import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const Header = () => {
	const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
	const navigate = useNavigate();

	const logout = () => {
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
		setIsLoggedIn(false);
		navigate("/login");
	};

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-success shadow-sm">
			<div className="container">
				{/* Brand */}
				{isLoggedIn ? (
          <Link className="navbar-brand text-white fw-bold" to="/dashboard">
					Grocery Delivery
				</Link>
        ):(
          <Link className="navbar-brand text-white fw-bold" to="/">
					Grocery Delivery
				</Link>
        )}

				{/* Mobile toggle */}
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				{/* Nav links */}
				<div
					className="collapse navbar-collapse justify-content-end"
					id="navbarNav"
				>
					<ul className="navbar-nav align-items-center">
						{isLoggedIn ? (
							<li className="nav-item me-2">
								<Link className="nav-link text-white" to="/dashboard">
									Home
								</Link>
							</li>
						) : (
							<li className="nav-item me-2">
								<Link className="nav-link text-white" to="/">
									Home
								</Link>
							</li>
						)}

						{isLoggedIn && (
							<>
								<li className="nav-item me-2">
									<Link className="nav-link text-white" to="/cart">
										Cart
									</Link>
								</li>
								<li className="nav-item me-2">
									<Link className="nav-link text-white" to="/orders">
										Orders
									</Link>
								</li>
							</>
						)}
						{/* Auth buttons */}
						{isLoggedIn ? (
							<li className="nav-item">
								<button className="btn btn-danger" onClick={logout}>
									Logout
								</button>
							</li>
						) : (
							<>
								<li className="nav-item me-2">
									<Link className="btn btn-outline-light" to="/login">
										Login
									</Link>
								</li>
								<li className="nav-item">
									<Link className="btn btn-light text-success" to="/register">
										Register
									</Link>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Header;
