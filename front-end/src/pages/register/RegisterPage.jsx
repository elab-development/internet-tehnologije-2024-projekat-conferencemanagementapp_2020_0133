import { useState } from "react";
import { useRegister } from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import { countries } from "countries-list";
import { toast } from "sonner";
import { useUser } from "../../context/UserContext"; 


function RegisterPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone: "",
    city: "",
    country: "",
  });
  const [countryOptions] = useState(
    Object.values(countries).map((c) => c.name)
  );
  const [countrySuggestions, setCountrySuggestions] = useState([]);
  const [countryTouched, setCountryTouched] = useState(false);

  const register = useRegister();
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "country") {
      setCountryTouched(true);
      const suggestions = countryOptions.filter((country) =>
        country.toLowerCase().includes(value.toLowerCase())
      );
      setCountrySuggestions(suggestions.slice(0, 5));
    }
  };

  const handleCountrySelect = (country) => {
    setForm((prev) => ({
      ...prev,
      country,
    }));
    setCountrySuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validCountry = countryOptions.find(
      (c) => c.toLowerCase() === form.country.toLowerCase()
    );
    if (!validCountry) {
      toast.error("Please select a valid country from the list.");
      return;
    }
    if (form.password !== form.password_confirmation) {
      window.toast?.error?.("Passwords do not match.");
      return;
    }
    register.mutate(form, {
      onSuccess: (res) => {
        const token = res?.data?.token;
        const user = res?.data?.user;
        if (token && user) {
          localStorage.setItem("token", "Bearer" + token);
          setUser(user); 
        }
        toast.success("Registration successful!");
        navigate("/");
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message || "Registration failed.");
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row w-full max-w-4xl overflow-hidden">
        {/* Leva strana */}
        <div className="md:w-1/2 flex flex-col justify-center items-center bg-blue-50 p-8">
          <img
            src="/assets/images/undraw_sign-up.png"
            alt="Sign Up Illustration"
            className="w-64 max-w-full mb-6"
          />
          <h1 className="text-3xl font-bold mb-4 text-blue-900 text-center">
            Join the community 🚀
          </h1>
          <p className="text-gray-700 mb-2 text-center">
            Create your account and unlock access to events, discussions, and
            more.
          </p>
          <p className="text-gray-500 text-sm text-center">
            It only takes a minute.
          </p>
        </div>
        {/* Desna strana */}
        <div className="md:w-1/2 flex items-center justify-center p-8">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm mx-auto flex flex-col gap-5"
            autoComplete="off"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-2 text-center">
              Create your account
            </h2>
            {/* First Name & Last Name */}
            <div className="flex gap-3">
              <div className="flex flex-col gap-2 w-1/2">
                <label
                  htmlFor="firstName"
                  className="text-gray-700 font-medium"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={form.firstName}
                  onChange={handleChange}
                  className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex flex-col gap-2 w-1/2">
                <label htmlFor="lastName" className="text-gray-700 font-medium">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={form.lastName}
                  onChange={handleChange}
                  className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
            {/* City & Country */}
            <div className="flex gap-3">
              <div className="flex flex-col gap-2 w-1/2">
                <label htmlFor="city" className="text-gray-700 font-medium">
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  required
                  value={form.city}
                  onChange={handleChange}
                  className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex flex-col gap-2 w-1/2 relative">
                <label htmlFor="country" className="text-gray-700 font-medium">
                  Country
                </label>
                <input
                  id="country"
                  name="country"
                  type="text"
                  required
                  autoComplete="off"
                  value={form.country}
                  onChange={handleChange}
                  onBlur={() =>
                    setTimeout(() => setCountrySuggestions([]), 100)
                  }
                  className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  list="country-list"
                />
                {/* Suggestions dropdown */}
                {countryTouched &&
                  countrySuggestions.length > 0 &&
                  !countryOptions.some(
                    (c) => c.toLowerCase() === form.country.toLowerCase()
                  ) && (
                    <ul className="absolute z-10 top-full left-0 right-0 bg-white border rounded shadow mt-1 max-h-40 overflow-y-auto">
                      {countrySuggestions.map((country) => (
                        <li
                          key={country}
                          className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                          onMouseDown={() => handleCountrySelect(country)}
                        >
                          {country}
                        </li>
                      ))}
                    </ul>
                  )}
              </div>
            </div>
            {/* Phone */}
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="text-gray-700 font-medium">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={form.phone}
                onChange={handleChange}
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            {/* Email */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-gray-700 font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            {/* Password */}
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-gray-700 font-medium">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={form.password}
                onChange={handleChange}
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            {/* Password Confirmation */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="password_confirmation"
                className="text-gray-700 font-medium"
              >
                Confirm Password
              </label>
              <input
                id="password_confirmation"
                name="password_confirmation"
                type="password"
                required
                value={form.password_confirmation}
                onChange={handleChange}
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
              disabled={register.isLoading}
            >
              {register.isLoading ? "Signing Up..." : "Sign Up"}
            </button>
            <div className="text-center text-gray-600 text-sm mt-2">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-blue-600 hover:underline font-medium"
              >
                Sign in
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
