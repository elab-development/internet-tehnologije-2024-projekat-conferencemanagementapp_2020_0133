import { useNavigate, useLocation } from "react-router";
import axiosConferenceInstance from "../../../api/axiosConfig";

function DashboardMenu({ user }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isOrganizer = user?.roles?.includes("organizer");
  const isModerator = user?.roles?.includes("moderator");
  const isOrganizerOrModerator = isOrganizer || isModerator;

  const menuItems = [
    {
      label: "My Personal Info",
      path: "/dashboard/user-info",
      show: true,
    },
    {
      label: "My Papers",
      path: "/dashboard/my-papers",
      show: isOrganizerOrModerator,
    },
    {
      label: "My Reviews",
      path: "/dashboard/my-reviews",
      show: isOrganizerOrModerator,
    },
    {
      label: "My Conferences",
      path: "/dashboard/my-conferences",
      show: isOrganizer,
    },
  ];

    const handleLogout = () => {
    axiosConferenceInstance.post('/user');
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 w-56 min-h-[320px] flex flex-col items-stretch">
      <nav>
        <ul className="flex flex-col gap-2">
          {menuItems
            .filter((item) => item.show)
            .map((item) => (
              <li key={item.label}>
                <button
                  className={`w-full text-left px-4 py-2 rounded font-medium transition ${
                    location.pathname === item.path
                      ? "bg-blue-600 text-white"
                      : "hover:bg-blue-100 text-blue-900"
                  }`}
                  onClick={() => navigate(item.path)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          <li className="mt-4">
            <button
              className="w-full text-left px-4 py-2 rounded font-medium text-red-600 hover:bg-red-50 transition"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default DashboardMenu;
