import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../../../context/UserContext";
import DashboardMenu from "../components/DashboardMenu";
import FormInput from "../../../components/FormInput";
import { countries } from "countries-list";
import axiosConferenceInstance from "../../../api/axiosConfig";
import { toast } from "sonner";

function UserInfoPage() {
  const { user, loading } = useUser();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
    country: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
        city: user.city || "",
        country: user.country || "",
      });
    }
  }, [user]);

  const [countryOptions] = useState(
    typeof window !== "undefined"
      ? Object.values(countries).map((c) => c.name)
      : []
  );
  const [countrySuggestions, setCountrySuggestions] = useState([]);
  const [countryTouched, setCountryTouched] = useState(false);
  const [saving, setSaving] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await axiosConferenceInstance.put("/user", {
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone,
        city: form.city,
        country: form.country,
      });
      toast.success(res.data?.message || "Profile updated successfully!");
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "An error occurred while updating your profile."
      );
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="text-lg text-gray-500">Loading...</span>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-start justify-center bg-gray-100 p-4">
      {/* DashboardMenu: sa strane na md+, iznad forme na xs/sm */}
      <div className="w-full md:w-1/6 flex justify-center mb-6 md:mb-0 md:mr-6">
        <DashboardMenu user={user} />
      </div>
      {/* Forma */}
      <div className="w-full md:w-5/6 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-8">
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-5"
            autoComplete="off"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-2 text-center">
              My Personal Info
            </h2>
            <div className="flex gap-3">
              <FormInput
                id="firstName"
                name="firstName"
                label="First Name"
                type="text"
                required
                value={form.firstName}
                onChange={handleChange}
              />
              <FormInput
                id="lastName"
                name="lastName"
                label="Last Name"
                type="text"
                required
                value={form.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-3">
              <FormInput
                id="city"
                name="city"
                label="City"
                type="text"
                required
                value={form.city}
                onChange={handleChange}
              />
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
            <FormInput
              id="phone"
              name="phone"
              label="Phone Number"
              type="tel"
              required
              value={form.phone}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserInfoPage;
