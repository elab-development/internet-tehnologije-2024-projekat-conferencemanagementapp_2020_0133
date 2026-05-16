import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { useResetPassword } from "../../hooks/useAuth";
import { toast } from "sonner";
import FormInput from "../../components/FormInput";

function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "";
  const token = searchParams.get("token") || "";
  const [form, setForm] = useState({
    password: "",
    passwordConfirmation: "",
  });
  const resetPassword = useResetPassword();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.password || !form.passwordConfirmation) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (form.password !== form.passwordConfirmation) {
      toast.error("Passwords do not match.");
      return;
    }
    if (!email || !token) {
      toast.error("Invalid or expired reset link.");
      return;
    }
    resetPassword.mutate(
      {
        email,
        token,
        password: form.password,
        password_confirmation: form.passwordConfirmation,
      },
      {
        onSuccess: () => {
          toast.success("Password updated! You can now sign in.");
          navigate("/login");
        },
        onError: (err) => {
          toast.error(
            err?.response?.data?.message || "Failed to reset password."
          );
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md flex flex-col items-center p-8">
        <img
          src="/assets/images/undraw_enter-password.png"
          alt="Reset password illustration"
          className="w-48 mb-8"
        />
        <h1 className="text-2xl font-bold text-center mb-2">
          Reset your password{" "}
          <span role="img" aria-label="lock">
            🔒
          </span>
        </h1>
        <p className="text-gray-700 text-center mb-6">
          Enter your new password below to regain access to your account.
        </p>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <FormInput
            id="password"
            name="password"
            label="New Password"
            type="password"
            required
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
          />
          <FormInput
            id="passwordConfirmation"
            name="passwordConfirmation"
            label="Confirm Password"
            type="password"
            required
            value={form.passwordConfirmation}
            onChange={handleChange}
            autoComplete="new-password"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
            disabled={resetPassword.isLoading}
          >
            {resetPassword.isLoading ? "Updating..." : "Update Password"}
          </button>
        </form>
        <div className="flex flex-col items-center gap-1 mt-6 text-sm">
          <a
            href="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Remembered your password? Sign in
          </a>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
