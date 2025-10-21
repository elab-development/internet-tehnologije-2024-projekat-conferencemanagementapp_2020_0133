import { useEffect, useState } from "react";
import axiosConferenceInstance from "../../../../api/axiosConfig";
import dayjs from "dayjs";
import { toast } from "sonner";
import ReviewForm from "./ReviewForm";

const statusClasses = {
  Submitted: "bg-yellow-100 text-yellow-800 border-yellow-300",
  "In review": "bg-yellow-100 text-yellow-800 border-yellow-300",
  Accepted: "bg-green-100 text-green-800 border-green-300",
  Denied: "bg-red-100 text-red-800 border-red-300",
};

function PaperDetailSection({ paperId, onBack }) {
  const [paper, setPaper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddReview, setShowAddReview] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const fetchPaper = async () => {
    setLoading(true);
    try {
      const res = await axiosConferenceInstance.get(`/papers/${paperId}`);
      setPaper(res.data);
    } catch (err) {
      toast.error("Failed to load paper details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaper();
    // eslint-disable-next-line
  }, [paperId]);

  const handleDownload = async () => {
    if (!paper?.file_path) {
      toast.error("No file available for this paper.");
      return;
    }
    setDownloading(true);
    try {
      // try dedicated download endpoint first
      try {
        const res = await axiosConferenceInstance.get(
          `/papers/${paperId}/download`,
          {
            responseType: "blob",
          }
        );
        const blob = new Blob([res.data]);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        // try to infer filename
        const filename = paper.file_path.split("/").pop() || "paper.pdf";
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        toast.success("Download started");
      } catch (err) {
        // fallback: open direct file URL (assumes backend serves files outside /api)
        const base = axiosConferenceInstance.defaults.baseURL || "";
        const fileUrl = base.replace(/\/api\/?$/, "") + "/" + paper.file_path;
        window.open(fileUrl, "_blank");
        toast.success("Opening file in new tab");
      }
    } catch {
      toast.error("Failed to download file.");
    } finally {
      setDownloading(false);
    }
  };

  const handleReviewSaved = () => {
    setShowAddReview(false);
    fetchPaper();
  };

  if (loading) {
    return <div className="text-gray-500">Loading paper...</div>;
  }

  if (!paper) {
    return <div className="text-gray-500">Paper not found.</div>;
  }

  const hasReview = Array.isArray(paper.reviews) && paper.reviews.length > 0;

  return (
    <div className="w-full flex flex-col gap-4">
      <div>
        <button className="text-blue-600 hover:underline mb-2" onClick={onBack}>
          &larr; Back
        </button>
      </div>

      <div className="bg-white rounded-xl shadow p-6 border relative">
        <span
          className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold border ${
            statusClasses[paper.status] ||
            "bg-gray-100 text-gray-700 border-gray-300"
          }`}
        >
          {paper.status}
        </span>

        <h3 className="text-2xl font-bold mb-2">{paper.title}</h3>
        <div className="text-sm text-gray-600 mb-3">
          Conference:{" "}
          <span className="font-medium text-gray-900">
            {paper.conference?.title}
          </span>
        </div>
        <div className="text-gray-700 mb-4">{paper.abstract}</div>

        <div className="text-gray-600 text-sm mb-1">
          Topic:{" "}
          <span className="font-medium text-gray-900">{paper.topic?.name}</span>
        </div>
        <div className="text-gray-600 text-sm mb-1">
          Author:{" "}
          <span className="font-medium text-gray-900">
            {paper.main_author?.first_name} {paper.main_author?.last_name}
          </span>
        </div>
        <div className="text-gray-400 text-xs mt-3">
          Submitted:{" "}
          {paper.submission_date
            ? dayjs(paper.submission_date).format("DD.MM.YYYY HH:mm")
            : ""}
        </div>

        <div className="flex gap-2 mt-4">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition"
          >
            {downloading ? "Downloading..." : "Download paper"}
          </button>

          {!hasReview && (
            <button
              onClick={() => setShowAddReview((v) => !v)}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded transition"
            >
              {showAddReview ? "Cancel review" : "Add review"}
            </button>
          )}
        </div>
      </div>

      {/* If paper has review(s) show them */}
      {hasReview && (
        <div className="bg-white rounded-xl shadow p-4 border">
          <h4 className="font-bold mb-2">Review</h4>
          {paper.reviews.map((r) => (
            <div key={r.id} className="mb-3">
              <div className="text-sm text-gray-600">
                Recommendation:{" "}
                <span className="font-medium">{r.recommendation}</span>
              </div>
              <div className="text-gray-700 mt-1">
                {r.comments || (
                  <span className="text-gray-400">No comments</span>
                )}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                Created: {dayjs(r.created_at).format("DD.MM.YYYY HH:mm")}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add review form */}
      {showAddReview && !hasReview && (
        <div className="bg-white rounded-xl shadow p-4 border">
          <ReviewForm
            paperId={paper.id}
            onSaved={handleReviewSaved}
            onCancel={() => setShowAddReview(false)}
          />
        </div>
      )}
    </div>
  );
}

export default PaperDetailSection;
