import { useEffect, useState } from "react";
import DashboardMenu from "../components/DashboardMenu";
import axiosConferenceInstance from "../../../api/axiosConfig";
import { useUser } from "../../../context/UserContext";

const statusColors = {
  Submitted: "bg-yellow-100 text-yellow-800 border-yellow-300",
  "In review": "bg-yellow-100 text-yellow-800 border-yellow-300",
  Accepted: "bg-green-100 text-green-800 border-green-300",
  Denied: "bg-red-100 text-red-800 border-red-300",
};

function MyPapersPage() {
  const { user } = useUser();
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosConferenceInstance
      .get("/my-papers")
      .then((res) => setPapers(res.data))
      .catch(() => setPapers([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-start justify-center bg-gray-100 p-4">
      {/* DashboardMenu */}
      <div className="w-full md:w-1/6 flex justify-center mb-6 md:mb-0 md:mr-6">
        <DashboardMenu user={user} />
      </div>
      {/* Papers list */}
      <div className="w-full md:w-5/6 flex flex-col gap-6">
        <h2 className="text-2xl font-bold mb-4">My Papers</h2>
        {loading ? (
          <div className="text-gray-500 text-center">Loading...</div>
        ) : papers.length === 0 ? (
          <div className="text-gray-500 text-center">No papers found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {papers.map((paper) => (
              <div
                key={paper.id}
                className="relative bg-white rounded-xl shadow p-6 flex flex-col gap-2 border"
              >
                {/* Status badge */}
                <span
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold border ${
                    statusColors[paper.status] ||
                    "bg-gray-100 text-gray-700 border-gray-300"
                  }`}
                >
                  {paper.status}
                </span>
                <h3 className="text-lg font-bold mb-1">{paper.title}</h3>
                <div className="text-gray-600 text-sm mb-1">
                  Conference:{" "}
                  <span className="font-medium text-gray-900">
                    {paper.conference?.title}
                  </span>
                </div>
                <div className="text-gray-600 text-sm mb-1">
                  Topic:{" "}
                  <span className="font-medium text-gray-900">
                    {paper.topic?.name}
                  </span>
                </div>
                <div className="text-gray-400 text-xs mt-2">
                  Submitted: {paper.submission_date}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyPapersPage;
