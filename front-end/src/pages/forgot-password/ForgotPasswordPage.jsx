import { useState } from "react";
import { useForgotPassword } from "../../hooks/useAuth";
import { toast } from "sonner";
import { useNavigate } from "react-router";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const forgotPassword = useForgotPassword();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    forgotPassword.mutate(
      { email },
      {
        onSuccess: () => {
          toast.success("Reset link sent! Please check your email.");
        },
        onError: (err) => {
          toast.error(
            err?.response?.data?.message || "Failed to send reset link."
          );
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md flex flex-col items-center p-8">
        <img
          src="/assets/images/undraw_forgot-password.png"
          alt="Forgot password illustration"
          className="w-48 mb-8"
        />
        <h1 className="text-2xl font-bold text-center mb-2">
          Forgot your password?{" "}
          <span role="img" aria-label="key">
            🔑
          </span>
        </h1>
        <p className="text-gray-700 text-center mb-6">
          Enter your email and we’ll send you a reset link.
        </p>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-gray-700 font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
            disabled={forgotPassword.isLoading}
          >
            {forgotPassword.isLoading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        <div className="flex flex-col items-center gap-1 mt-6 text-sm">
          <a
            href="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Remembered your password? Sign in
          </a>
          <a
            href="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Don’t have an account? Sign up
          </a>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
