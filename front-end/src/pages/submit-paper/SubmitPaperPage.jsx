import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { conferencesApi } from "../../api/conference/conferencesApi";
import { toast } from "sonner";
import { useSubmitPaper } from "../../hooks/useSubmitPaper";

function SubmitPaperPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [conference, setConference] = useState(null);
  const [loading, setLoading] = useState(true);

  // Form state
  const [form, setForm] = useState({
    paperTitle: "",
    coAuthors: "",
    topicId: "",
    abstract: "",
    file: null,
  });
  const [fileError, setFileError] = useState("");
  const fileInputRef = useRef();

  const submitPaper = useSubmitPaper();

  useEffect(() => {
    setLoading(true);
    conferencesApi
      .getConferenceById(id)
      .then((res) => setConference(res.data))
      .catch(() => toast.error("Failed to load conference info."))
      .finally(() => setLoading(false));
  }, [id]);

  // File validation
  const handleFileChange = (e) => {
    setFileError("");
    const file = e.target.files[0];
    if (!file) {
      setForm((prev) => ({ ...prev, file: null }));
      return;
    }
    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowed.includes(file.type)) {
      setFileError("File must be PDF, DOC, or DOCX.");
      setForm((prev) => ({ ...prev, file: null }));
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      setFileError("File size must be less than 20MB.");
      setForm((prev) => ({ ...prev, file: null }));
      return;
    }
    setForm((prev) => ({ ...prev, file }));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      fileInputRef.current.files = e.dataTransfer.files;
      handleFileChange({ target: { files: e.dataTransfer.files } });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.file) {
      setFileError("File is required.");
      return;
    }
    if (!form.topicId) {
      toast.error("Please select a valid topic.");
      return;
    }

    submitPaper.mutate(
      {
        title: form.paperTitle,
        abstract: form.abstract,
        file: form.file,
        topicId: form.topicId,
        conferenceId: conference.id,
        coAuthors: form.coAuthors,
      },
      {
        onSuccess: (res) => {
          toast.success(res.data?.message || "Paper submitted successfully!");
          navigate(-1);
        },
        onError: (err) => {
          toast.error(
            err?.response?.data?.message ||
              "An error occurred while submitting your paper."
          );
        },
      }
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="text-lg text-gray-500">Loading...</span>
      </div>
    );
  }

  if (!conference) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="text-lg text-red-500">Conference not found.</span>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#f7f7f7] flex flex-col items-center pt-8 pb-16 px-2">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8">
        {/* Main content */}
        <div className="flex-1 flex flex-col gap-8">
          {/* Info card */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-2xl font-bold mb-2">Share Your Work With Us</h2>
            <p className="text-gray-700">
              Thank you for choosing to share your work with our conference. We
              truly believe that every idea, effort, and piece of research holds
              the power to inspire change and contribute to our community.
              <br />
              <br />
              Please fill out the form below and carefully select one topic
              under which you would like to submit your paper. We are excited to
              learn from your contribution and grateful to have you as part of
              this journey!
            </p>
          </div>
          {/* Form card */}
          <form
            className="bg-white rounded-xl shadow p-6 flex flex-col gap-6"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-2">
              <label className="font-semibold" htmlFor="paperTitle">
                Paper Title
              </label>
              <input
                id="paperTitle"
                name="paperTitle"
                type="text"
                required
                value={form.paperTitle}
                onChange={handleChange}
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold" htmlFor="coAuthors">
                Co-authors{" "}
                <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                id="coAuthors"
                name="coAuthors"
                type="text"
                value={form.coAuthors}
                onChange={handleChange}
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Separate names with commas"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold" htmlFor="topicId">
                Topic
              </label>
              <select
                id="topicId"
                name="topicId"
                required
                value={form.topicId}
                onChange={handleChange}
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select a topic</option>
                {conference.topics.map((topic) => (
                  <option key={topic.id} value={topic.id}>
                    {topic.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold" htmlFor="abstract">
                Abstract
              </label>
              <textarea
                id="abstract"
                name="abstract"
                required
                value={form.abstract}
                onChange={handleChange}
                rows={5}
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-vertical"
              />
            </div>
            {/* File upload */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Upload Paper</label>
              <div
                className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition
                  ${
                    fileError ? "border-red-500" : "border-gray-300"
                  } bg-gray-50 hover:bg-gray-100`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current.click()}
              >
                <span className="text-gray-500 mb-2">
                  Drag & drop your file here or
                </span>
                <button
                  type="button"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current.click();
                  }}
                >
                  Choose from device
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  className="hidden"
                  onChange={handleFileChange}
                />
                {form.file && (
                  <span className="mt-2 text-blue-700 font-medium">
                    {form.file.name}
                  </span>
                )}
                {fileError && (
                  <span className="mt-2 text-red-600 text-sm">{fileError}</span>
                )}
                <span className="mt-2 text-xs text-gray-400">
                  Accepted formats: PDF, DOC, DOCX. Max size: 20MB.
                </span>
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded transition mt-2 w-full max-w-xs self-end"
              disabled={loading || submitPaper.isLoading}
            >
              {submitPaper.isLoading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
        {/* Side info card */}
        <div className="w-full md:w-[350px] flex-shrink-0">
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h3 className="font-bold text-lg mb-2">Submission Deadline</h3>
            <div className="text-blue-700 font-semibold text-xl mb-4">
              {conference.submission_deadline
                ? new Date(conference.submission_deadline).toLocaleDateString()
                : "N/A"}
            </div>
            <h4 className="font-semibold mb-1">Available Topics</h4>
            <ul className="list-disc list-inside text-gray-700">
              {conference.topics.map((topic) => (
                <li key={topic.id}>{topic.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubmitPaperPage;
