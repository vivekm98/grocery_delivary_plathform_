import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "./axiosInstance";

const ProductDetail = () => {
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const [quantity, setQuantity] = useState(1);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchProduct();
	}, [id]);

	const fetchProduct = async () => {
		try {
			const res = await axiosInstance.get(`/products/${id}/`);
			setProduct(res.data);
			setQuantity(1);
		} catch (err) {
			console.error("Product fetch error", err);
		} finally {
			setLoading(false);
		}
	};

	const handleQuantityChange = (value) => {
		if (value < 1) return;
		if (value > product.stock) return;
		setQuantity(value);
	};

	const addToCart = async () => {
		if (quantity > product.stock) {
			alert("Quantity exceeds available stock");
			return;
		}

		try {
			await axiosInstance.post("/cart/add/", {
				product_id: product.id,
				quantity,
			});
			alert("Added to cart ✅");
		} catch (error) {
			alert("Please login first");
		}
	};

	if (loading) return <p className="text-center mt-5">Loading...</p>;
	if (!product) return <p className="text-center mt-5">Product not found</p>;

	const stockStatus =
		product.stock === 0
			? "Out of Stock"
			: product.stock <= 5
				? "Low Stock"
				: "In Stock";

	const stockClass =
		product.stock === 0
			? "badge bg-danger"
			: product.stock <= 5
				? "badge bg-warning text-dark"
				: "badge bg-success";

	return (
		<div className="container my-5">
			<div className="row g-4">
				{/* IMAGE */}
				<div className="col-md-5 text-center">
					<img
						src={product.image}
						alt={product.name}
						className="img-fluid rounded shadow-sm"
						style={{ maxHeight: "380px", objectFit: "contain" }}
					/>
				</div>

				{/* DETAILS */}
				<div className="col-md-7">
					<h3 className="fw-bold">{product.name}</h3>
					<p className="text-muted mb-1">{product.category_name}</p>

					<h4 className="text-success mb-2">₹{product.price}/{product.unit_name}</h4>

					<span className={stockClass}>{stockStatus}</span>

					{/* DESCRIPTION */}
					<div className="mt-4">
						<h6 className="fw-semibold">Description</h6>
						<p className="text-secondary">
							{product.description || "No description available."}
						</p>
					</div>

					{/* STOCK INFO */}
					<p className="mt-2">
						<strong>Available Stock:</strong> {product.stock}{" "}
						{product.unit_name}
					</p>

					{/* QUANTITY */}
					<div className="d-flex align-items-center gap-3 my-3">
						<label className="fw-semibold">Quantity</label>
						<input
							type="number"
							min="1"
							max={product.stock}
							value={quantity}
							onChange={(e) => handleQuantityChange(Number(e.target.value))}
							className="form-control"
							style={{ width: "90px" }}
							disabled={product.stock === 0}
						/>
						<span className="fw-semibold text-muted">{product.unit_name}</span>
					</div>

					{/* ADD TO CART */}
					<button
						className="btn btn-primary btn-lg mt-2"
						onClick={addToCart}
						disabled={product.stock === 0 || quantity > product.stock}
					>
						{product.stock === 0 ? "Out of Stock" : "Add to Cart"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProductDetail;
