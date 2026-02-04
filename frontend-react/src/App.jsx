import { useState } from "react";
import Header from "./components/Header";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import AuthProvider from "./components/AuthProvider";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Index from "./components/Index";
import CategoryProducts from "./components/CategoryProducts";
import Cart from "./components/Cart";
import ProductDetail from "./components/ProductDetail";
import OrderForm from "./components/OrderForm";
import OrderHistory from "./components/OrderHistory";
import Footer from "./components/Footer";

function App() {
	return (
		<>
			<AuthProvider>
				<BrowserRouter>
					<Header />
					<Routes>
						<Route path="/" element={<Index />} />
						<Route path="/register" element={<PublicRoute><Register /> </PublicRoute>} />
						<Route path="/login" element={<PublicRoute><Login /> </PublicRoute>} />
						<Route path="/dashboard" element={<PrivateRoute><Dashboard /> </PrivateRoute>} />
						<Route path="/category/:id" element={<PrivateRoute><CategoryProducts /> </PrivateRoute>} />
						<Route path="/cart" element={<PrivateRoute><Cart /> </PrivateRoute>} />
						<Route path="/product/:id" element={<PrivateRoute><ProductDetail /> </PrivateRoute>} />
						<Route path="order" element={<PrivateRoute><OrderForm /> </PrivateRoute> } />
						<Route path="orders" element={<PrivateRoute><OrderHistory /> </PrivateRoute> } />
					</Routes>
					
					
				</BrowserRouter>
		 </AuthProvider>
    </>
	);
}

export default App;