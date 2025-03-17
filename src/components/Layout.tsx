import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { items } = useCart();
  const location = useLocation();

  const cartItemCount = items.reduce(
    (total: any, item: { quantity: any }) => total + item.quantity,
    0
  );

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-primary">
                ShopApp
              </Link>
            </div>
            <nav className="flex space-x-4">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === "/"
                    ? "text-primary bg-primary/10"
                    : "text-gray-700 hover:text-primary"
                }`}
              >
                Products
              </Link>
              <Link
                to="/cart"
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                  location.pathname === "/cart"
                    ? "text-primary bg-primary/10"
                    : "text-gray-700 hover:text-primary"
                }`}
              >
                Cart
                {cartItemCount > 0 && (
                  <span className="ml-1 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
      <footer className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} ShopApp. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
