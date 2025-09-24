import { useState } from "react";
import { Link, useLocation } from "react-router";
import { FaShoppingCart, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";

function Header() {
  const { cart } = useCart();
  const { user } = useUser();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/conferences", label: "Conferences" },
    { to: "/about-us", label: "About Us" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="w-full bg-white shadow flex items-center px-12 py-3 fixed top-0 left-0 z-50">
      {/* Left: Logo */}
      <Link
        to="/"
        className="text-2xl font-extrabold tracking-widest text-blue-700 mr-8"
      >
        CONFE
      </Link>
      {/* Burger icon for mobile */}
      <button
        className="md:hidden ml-auto text-2xl text-blue-700"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Open menu"
      >
        <FaBars />
      </button>
      {/* Center: Navigation (desktop) */}
      <nav className="flex-1 justify-center hidden md:flex">
        <ul className="flex gap-6">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`uppercase font-medium text-gray-700 hover:text-blue-700 transition ${
                  location.pathname === link.to ? "text-blue-700" : ""
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {/* Right: Cart & Auth (desktop) */}
      <div className="hidden md:flex items-center gap-4 ml-auto">
        <Link to="/cart" className="relative">
          <FaShoppingCart className="text-2xl text-blue-700" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-0.5 font-bold">
              {cart.length}
            </span>
          )}
        </Link>
        {!user ? (
          <Link
            to="/login"
            className="ml-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition"
          >
            Sign in
          </Link>
        ) : (
          <button type="button" className="ml-2" title="User profile">
            <FaUserCircle className="text-2xl text-blue-700" />
          </button>
        )}
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-50 md:hidden"
          onClick={() => setMenuOpen(false)}
        >
          <nav
            className="fixed top-0 left-0 w-3/4 max-w-xs h-full bg-white shadow-lg flex flex-col p-6 z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="self-end mb-8 text-2xl text-blue-700"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <FaTimes />
            </button>
            <ul className="flex flex-col gap-6 mb-8">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`uppercase font-medium text-gray-700 hover:text-blue-700 transition ${
                      location.pathname === link.to ? "text-blue-700" : ""
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4 mt-auto">
              <Link
                to="/cart"
                className="relative"
                onClick={() => setMenuOpen(false)}
              >
                <FaShoppingCart className="text-2xl text-blue-700" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-0.5 font-bold">
                    {cart.length}
                  </span>
                )}
              </Link>
              {!user ? (
                <Link
                  to="/login"
                  className="ml-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign in
                </Link>
              ) : (
                <button type="button" className="ml-2" title="User profile">
                  <FaUserCircle className="text-2xl text-blue-700" />
                </button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
