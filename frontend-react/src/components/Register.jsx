import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Register = () => {
	const [username, SetUsername] = useState("");
	const [email, SetEmail] = useState("");
	const [password, SetPassword] = useState("");
	const [error, Seterror] = useState({});
	const [success, Setsuccess] = useState(false);
	const [loading, Setloading] = useState(false);

	const handelRegistration = async (e) => {
		Setloading(true);
		e.preventDefault();
		const userData = { username, email, password };

		try {
			await axios.post("http://127.0.0.1:8000/api/register/", userData);
			Seterror({});
			Setsuccess(true);
		} catch (error) {
			Seterror(error.response?.data || {});
		} finally {
			Setloading(false);
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

						<div
							className="card border-0 shadow-lg rounded-4 p-4"
							style={{ backdropFilter: "blur(8px)" }}
						>

							{/* HEADER */}
							<div className="text-center mb-4">
								<div
									className="rounded-circle bg-success text-white d-inline-flex align-items-center justify-content-center mb-3"
									style={{ width: 60, height: 60 }}
								>
									<FontAwesomeIcon icon={faUserPlus} size="lg" />
								</div>

								<h4 className="fw-bold">Create Account</h4>
								<p className="text-muted small mb-0">
									Register to continue shopping
								</p>
							</div>

							{/* SUCCESS MESSAGE */}
							{success && (
								<div className="alert alert-success text-center py-2">
									Account created successfully 🎉
								</div>
							)}

							{/* FORM */}
							<form onSubmit={handelRegistration}>

								{/* USERNAME */}
								<div className="form-floating mb-3">
									<input
										type="text"
										className="form-control"
										id="username"
										placeholder="Username"
										value={username}
										onChange={(e) => SetUsername(e.target.value)}
									/>
									<label htmlFor="username">Username</label>
									{error.username && (
										<small className="text-danger">
											{error.username}
										</small>
									)}
								</div>

								{/* EMAIL */}
								<div className="form-floating mb-3">
									<input
										type="email"
										className="form-control"
										id="email"
										placeholder="Email"
										value={email}
										onChange={(e) => SetEmail(e.target.value)}
									/>
									<label htmlFor="email">Email address</label>
									{error.email && (
										<small className="text-danger">
											{error.email}
										</small>
									)}
								</div>

								{/* PASSWORD */}
								<div className="form-floating mb-4">
									<input
										type="password"
										className="form-control"
										id="password"
										placeholder="Password"
										value={password}
										onChange={(e) => SetPassword(e.target.value)}
									/>
									<label htmlFor="password">Password</label>
									{error.password && (
										<small className="text-danger">
											{error.password}
										</small>
									)}
								</div>

								{/* BUTTON */}
								<button
									type="submit"
									className="btn btn-success w-100 py-2 fw-semibold"
									disabled={loading}
									style={{ transition: "0.3s" }}
								>
									{loading ? (
										<>
											<FontAwesomeIcon icon={faSpinner} spin className="me-2" />
											Creating account...
										</>
									) : (
										"Register"
									)}
								</button>
							</form>

							{/* FOOTER */}
							<div className="text-center mt-4">
								<small className="text-muted">
									Already have an account?{" "}
									<Link
										to="/login"
										className="fw-semibold text-success text-decoration-none"
									>
										Login
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

export default Register;
