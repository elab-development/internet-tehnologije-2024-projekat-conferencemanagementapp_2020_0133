import { useState } from "react";
import { useLogin } from "../../hooks/useAuth";
import { useNavigate, useLocation, Link } from "react-router";
import { toast } from "sonner";
import { useUser } from "../../context/UserContext"; // Dodaj import
import FormInput from "../../components/FormInput";

function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const login = useLogin();
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useUser();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login.mutate(form, {
      onSuccess: (res) => {
        const token = res?.data?.token;
        const user = res?.data?.user;
        if (token && user) {
          localStorage.setItem("token", "Bearer " + token);
          setUser(user);
          const from = location.state?.from?.pathname || "/";
          navigate(from, { replace: true });
        } else {
          toast.error("Authentication failed.");
        }
      },
      onError: () => {
        toast.error("Authentication failed.");
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row w-full max-w-4xl overflow-hidden">
        {/* Leva strana */}
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
        {/* Desna strana */}
        <div className="md:w-1/2 flex items-center justify-center p-8">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm mx-auto flex flex-col gap-6"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-2 text-center">
              Sign in to your account
            </h2>
            <FormInput
              id="email"
              name="email"
              label="Email address"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
            />
            <FormInput
              id="password"
              name="password"
              label="Password"
              type="password"
              required
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
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
              <Link
                to="/forgot-password"
                className="text-blue-600 hover:underline text-sm"
              >
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
              disabled={login.isLoading}
            >
              {login.isLoading ? "Signing In..." : "Sign In"}
            </button>
            <div className="text-center text-gray-600 text-sm mt-2">
              Don't have an account?{" "}
              <a
                href="/register"
                className="text-blue-600 hover:underline font-medium"
              >
                Sign up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
