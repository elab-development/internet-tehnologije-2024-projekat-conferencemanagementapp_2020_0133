import { useState } from "react";
import axiosConferenceInstance from "../../../../api/axiosConfig";
import { useUser } from "../../../../context/UserContext";
import { toast } from "sonner";

function ReviewForm({ paperId, onSaved, onCancel }) {
  const { user } = useUser();
  const [comments, setComments] = useState("");
  const [recommendation, setRecommendation] = useState("Accept");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(user);
    if (!user?.id) {
      toast.error("Reviewer not available.");
      return;
    }
    setSaving(true);
    try {
      await axiosConferenceInstance.post("/reviews", {
        paper_id: paperId,
        reviewer_id: user.id,
        comments: comments,
        recommendation: recommendation,
      });
      toast.success("Review submitted");
      onSaved && onSaved();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to submit review");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <h4 className="font-bold">Add Review</h4>
      <div className="flex flex-col gap-1">
        <label className="text-sm">Recommendation</label>
        <select
          value={recommendation}
          onChange={(e) => setRecommendation(e.target.value)}
          required
          className="border rounded px-3 py-2"
        >
          <option value="Accept">Accept</option>
          <option value="Reject">Reject</option>
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm">Comments</label>
        <textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          rows={4}
          className="border rounded px-3 py-2"
        />
      </div>

      <div className="flex gap-2 mt-2">
        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
        >
          {saving ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-600 px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
