import { useEffect, useState } from "react";
import axiosConferenceInstance from "../../../../api/axiosConfig";
import dayjs from "dayjs";
import PaperDetailSection from "./PaperDetailSection";

const statusClasses = {
  Submitted: "bg-yellow-100 text-yellow-800 border-yellow-300",
  "In review": "bg-yellow-100 text-yellow-800 border-yellow-300",
  Accepted: "bg-green-100 text-green-800 border-green-300",
  Denied: "bg-red-100 text-red-800 border-red-300",
};

function PapersOfConferenceSection({ conference, onBack }) {
  const [papers, setPapers] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const [selectedPaperId, setSelectedPaperId] = useState(null);

  const fetchPapers = async (p = 1) => {
    setLoading(true);
    try {
      const res = await axiosConferenceInstance.get(
        `/conference/${conference.id}/papers`,
        { params: { page: p } }
      );
      setPapers(res.data.data || res.data);
      setMeta({
        links: res.data.links,
        last_page: res.data.last_page || res.data.meta?.last_page,
      });
    } catch (err) {
      setPapers([]);
      setMeta(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPapers(page);
    // eslint-disable-next-line
  }, [conference.id, page]);

  if (selectedPaperId) {
    return (
      <div className="w-full md:w-5/6">
        <PaperDetailSection
          paperId={selectedPaperId}
          onBack={() => setSelectedPaperId(null)}
        />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <button
            className="text-blue-600 hover:underline mb-2"
            onClick={onBack}
          >
            &larr; Back
          </button>
          <h2 className="text-2xl font-bold">{conference.title}</h2>
          <div className="text-sm text-gray-600">
            {conference.city}, {conference.country} •{" "}
            {dayjs(conference.startDate || conference.start_date).format(
              "DD.MM.YYYY"
            )}{" "}
            -{" "}
            {dayjs(conference.endDate || conference.end_date).format(
              "DD.MM.YYYY"
            )}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-gray-500">Loading papers...</div>
      ) : papers.length === 0 ? (
        <div className="text-gray-500">
          No papers found for this conference.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {papers.map((paper) => (
            <div
              key={paper.id}
              className="relative bg-white rounded-xl shadow p-6 flex flex-col gap-2 border cursor-pointer hover:shadow-lg transition"
              onClick={() => setSelectedPaperId(paper.id)}
              title="Open paper details"
            >
              <span
                className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold border ${
                  statusClasses[paper.status] ||
                  "bg-gray-100 text-gray-700 border-gray-300"
                }`}
              >
                {paper.status}
              </span>
              <h3 className="text-lg font-bold mb-1">{paper.title}</h3>
              <div className="text-gray-600 text-sm">
                Topic:{" "}
                <span className="font-medium text-gray-900">
                  {paper.topic?.name}
                </span>
              </div>
              <div className="text-gray-600 text-sm">
                Author:{" "}
                <span className="font-medium text-gray-900">
                  {paper.main_author?.first_name} {paper.main_author?.last_name}
                </span>
              </div>
              <div className="text-gray-400 text-xs mt-2">
                Submitted:{" "}
                {paper.submission_date
                  ? dayjs(paper.submission_date).format("DD.MM.YYYY HH:mm")
                  : ""}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {meta?.links && meta.links.length > 0 && (
        <div className="flex gap-2 justify-center mt-6 flex-wrap">
          {meta.links
            .filter((l) => l.label && l.label !== "...")
            .map((link, idx) => (
              <button
                key={idx}
                disabled={!link.url || link.active}
                onClick={() => link.page && setPage(link.page)}
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
  );
}

export default PapersOfConferenceSection;
