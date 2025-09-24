import { useState } from "react";

function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle login logic
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row w-full max-w-4xl overflow-hidden">
        {/* Left Side */}
        <div className="md:w-1/2 flex flex-col justify-center items-center bg-blue-50 p-8">
          <h1 className="text-3xl font-bold mb-4 text-blue-900 text-center">
            Welcome Back 👋
          </h1>
          <p className="text-gray-700 mb-8 text-center">
            Log in to continue where you left off and stay connected with your
            community.
          </p>
          <img
            src="/assets/images/undraw_authentication.png"
            alt="Authentication Illustration"
            className="w-64 max-w-full"
          />
        </div>
        {/* Right Side */}
        <div className="md:w-1/2 flex items-center justify-center p-8">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm mx-auto flex flex-col gap-6"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-2 text-center">
              Sign in to your account
            </h2>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-gray-700 font-medium">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={handleChange}
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-gray-700 font-medium">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={form.password}
                onChange={handleChange}
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-gray-700">
                <input
                  type="checkbox"
                  name="remember"
                  checked={form.remember}
                  onChange={handleChange}
                  className="accent-blue-600"
                />
                Remember me
              </label>
              <a href="#" className="text-blue-600 hover:underline text-sm">
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
