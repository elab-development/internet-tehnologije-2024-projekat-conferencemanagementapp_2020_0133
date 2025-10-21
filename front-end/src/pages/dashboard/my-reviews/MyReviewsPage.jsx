import { useEffect, useState } from "react";
import DashboardMenu from "../components/DashboardMenu";
import axiosConferenceInstance from "../../../api/axiosConfig";
import { useUser } from "../../../context/UserContext";
import dayjs from "dayjs";
import PapersOfConferenceSection from "./components/PapersOfConferenceSection";

function MyReviewsPage() {
  const { user } = useUser();
  const [conferences, setConferences] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // selected conference for viewing papers
  const [selectedConference, setSelectedConference] = useState(null);

  const fetchConferences = async (params = {}) => {
    setLoading(true);
    try {
      const res = await axiosConferenceInstance.get("/my-conferences", {
        params: {
          page,
          search: search || undefined,
          ...params,
        },
      });
      setConferences(res.data.data);
      setMeta(res.data.meta);
    } catch {
      setConferences([]);
      setMeta(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConferences();
    // eslint-disable-next-line
  }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchConferences({ page: 1, search });
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  if (selectedConference) {
    return (
      <div className="min-h-screen flex flex-col md:flex-row items-start justify-center bg-gray-100 p-4">
        <div className="w-full md:w-1/6 flex justify-center mb-6 md:mb-0 md:mr-6">
          <DashboardMenu user={user} />
        </div>
        <div className="w-full md:w-5/6">
          <PapersOfConferenceSection
            conference={selectedConference}
            onBack={() => setSelectedConference(null)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-start justify-center bg-gray-100 p-4">
      {/* DashboardMenu */}
      <div className="w-full md:w-1/6 flex justify-center mb-6 md:mb-0 md:mr-6">
        <DashboardMenu user={user} />
      </div>
      {/* Conferences list */}
      <div className="w-full md:w-5/6 flex flex-col gap-6">
        <h2 className="text-2xl font-bold mb-4">My Reviews</h2>
        {/* Search */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Search conferences..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded px-3 py-2 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition"
          >
            Search
          </button>
        </form>
        {/* List */}
        {loading ? (
          <div className="text-gray-500 text-center">Loading...</div>
        ) : conferences.length === 0 ? (
          <div className="text-gray-500 text-center">No conferences found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {conferences.map((conf) => (
              <div
                key={conf.id}
                className="bg-white rounded-xl shadow p-6 flex flex-col gap-2 border cursor-pointer hover:shadow-lg transition"
                onClick={() => setSelectedConference(conf)}
                title="View papers for this conference"
              >
                <h3 className="text-lg font-bold mb-1">{conf.title}</h3>
                <div className="text-gray-600 text-sm mb-1">
                  {conf.city}, {conf.country}
                </div>
                <div className="text-gray-600 text-sm mb-1">
                  From:{" "}
                  <span className="font-medium text-gray-900">
                    {dayjs(conf.startDate).format("DD.MM.YYYY")}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium text-gray-900">
                    {dayjs(conf.endDate).format("DD.MM.YYYY")}
                  </span>
                </div>
                {conf.submission_deadline && (
                  <div className="text-gray-600 text-sm">
                    Submission deadline:{" "}
                    <span className="font-medium text-gray-900">
                      {dayjs(conf.submission_deadline).format("DD.MM.YYYY")}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {/* Pagination */}
        {meta && meta.last_page > 1 && (
          <div className="flex gap-2 justify-center mt-6 flex-wrap">
            {meta.links
              .filter((l) => l.label && l.label !== "...") // skip "..."
              .map((link, idx) => (
                <button
                  key={idx}
                  disabled={!link.url || link.active}
                  onClick={() => link.page && handlePageChange(link.page)}
                  className={`px-3 py-1 rounded border text-sm font-medium ${
                    link.active
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-blue-700 border-blue-300 hover:bg-blue-50"
                  }`}
                >
                  {link.label
                    .replace("&laquo; Previous", "«")
                    .replace("Next &raquo;", "»")}
                </button>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyReviewsPage;
