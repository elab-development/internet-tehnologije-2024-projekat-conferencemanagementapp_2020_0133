import { useEffect, useState } from "react";
import axiosConferenceInstance from "../../../../api/axiosConfig";
import { toast } from "sonner";
import dayjs from "dayjs";

const toApiDateTime = (val) =>
  val ? dayjs(val).format("YYYY-MM-DDTHH:mm:ssZ") : "";

const conferenceTypes = [
  "conference",
  "seminar",
  "webinar",
  "workshop",
  "trade_show_expo",
  "professional_development_event",
  "other",
];

function AddConferenceSection({ onBack, editConferenceId }) {
  const [topics, setTopics] = useState([]);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(!!editConferenceId);

  // Form state
  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    submissionDeadline: "",
    location: "",
    city: "",
    country: "",
    type: "",
    capacity: "",
    organization: "",
    contactEmail: "",
    contactPhone: "",
    topics: [],
    agendaItems: [{ title: "", description: "", startTime: "", endTime: "" }],
    ticketTypes: [{ name: "", description: "", price: "", quantity: "" }],
    moderators: [],
  });

  // Fetch topics
  useEffect(() => {
    axiosConferenceInstance
      .get("/topics")
      .then((res) => setTopics(res.data))
      .catch(() => setTopics([]));
  }, []);

  // Fetch conference for edit
  useEffect(() => {
    if (editConferenceId) {
      setLoading(true);
      axiosConferenceInstance
        .get(`/conferences/${editConferenceId}`)
        .then((res) => {
          const c = res.data;
          setForm({
            title: c.title || "",
            description: c.description || "",
            startDate: c.start_date?.slice(0, 10) || "",
            endDate: c.end_date?.slice(0, 10) || "",
            submissionDeadline: c.submission_deadline?.slice(0, 10) || "",
            location: c.location || "",
            city: c.city || "",
            country: c.country || "",
            type: c.type || "",
            capacity: c.capacity || "",
            organization: c.organization || "",
            contactEmail: c.contact_email || "",
            contactPhone: c.contact_phone || "",
            topics: c.topics?.map((t) => String(t.id)) || [],
            agendaItems: c.agenda_items
              ? c.agenda_items.map((a) => ({
                  title: a.title || "",
                  description: a.description || "",
                  startTime: a.start_time ? a.start_time.slice(0, 16) : "",
                  endTime: a.end_time ? a.end_time.slice(0, 16) : "",
                }))
              : [{ title: "", description: "", startTime: "", endTime: "" }],
            ticketTypes: c.ticket_types
              ? c.ticket_types.map((t) => ({
                  name: t.name || "",
                  description: t.description || "",
                  price: t.price || "",
                  quantity: t.quantity || "",
                }))
              : [{ name: "", description: "", price: "", quantity: "" }],
            moderators: c.moderators?.map((m) => m.email) || [],
          });
        })
        .finally(() => setLoading(false));
    }
    // eslint-disable-next-line
  }, [editConferenceId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // For array fields (topics, moderators)
  const handleArrayChange = (name, value) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Agenda Items
  const handleAgendaChange = (idx, field, value) => {
    setForm((prev) => {
      const agenda = [...prev.agendaItems];
      agenda[idx][field] = value;
      return { ...prev, agendaItems: agenda };
    });
  };

  const addAgendaItem = () => {
    setForm((prev) => ({
      ...prev,
      agendaItems: [
        ...prev.agendaItems,
        { title: "", description: "", startTime: "", endTime: "" },
      ],
    }));
  };

  const removeAgendaItem = (idx) => {
    setForm((prev) => ({
      ...prev,
      agendaItems: prev.agendaItems.filter((_, i) => i !== idx),
    }));
  };

  // Ticket Types
  const handleTicketChange = (idx, field, value) => {
    setForm((prev) => {
      const tickets = [...prev.ticketTypes];
      tickets[idx][field] = value;
      return { ...prev, ticketTypes: tickets };
    });
  };

  const addTicketType = () => {
    setForm((prev) => ({
      ...prev,
      ticketTypes: [
        ...prev.ticketTypes,
        { name: "", description: "", price: "", quantity: "" },
      ],
    }));
  };

  const removeTicketType = (idx) => {
    setForm((prev) => ({
      ...prev,
      ticketTypes: prev.ticketTypes.filter((_, i) => i !== idx),
    }));
  };

  // Moderators
  const handleModeratorsChange = (e) => {
    const value = e.target.value;
    const emails = value
      .split(",")
      .map((email) => email.trim())
      .filter(Boolean);
    setForm((prev) => ({
      ...prev,
      moderators: emails,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        capacity: form.capacity ? Number(form.capacity) : null,
        topics: form.topics.map((id) => Number(id)),
        agendaItems: form.agendaItems.map((a) => ({
          ...a,
          startTime: toApiDateTime(a.startTime),
          endTime: toApiDateTime(a.endTime),
        })),
        ticketTypes: form.ticketTypes.map((t) => ({
          ...t,
          price: t.price ? Number(t.price) : 0,
          quantity: t.quantity ? Number(t.quantity) : 1,
        })),
      };

      if (editConferenceId) {
        await axiosConferenceInstance.patch(
          `/conferences/${editConferenceId}`,
          payload
        );
        toast.success("Conference updated successfully!");
      } else {
        await axiosConferenceInstance.post("/conferences", payload);
        toast.success("Conference created successfully!");
      }
      onBack();
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "An error occurred while saving the conference."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!editConferenceId) return;
    const ok = window.confirm(
      "Are you sure you want to delete this conference? This action cannot be undone."
    );
    if (!ok) return;
    setDeleting(true);
    try {
      await axiosConferenceInstance.delete(`/conferences/${editConferenceId}`);
      toast.success("Conference deleted");
      onBack();
    } catch (err) {
      const status = err?.response?.status;
      let msg =
        err?.response?.data?.message ??
        err?.message ??
        "Failed to delete conference";
      if (status) msg += ` (status: ${status})`;
      toast.error(msg);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <span className="text-lg text-gray-500">Loading...</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-6 md:p-8 relative">
      <button
        className="mb-4 text-blue-600 hover:underline font-medium"
        onClick={onBack}
      >
        &larr; Back
      </button>
      {editConferenceId && (
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>
      )}
      <h2 className="text-2xl font-bold mb-4">Add Conference</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex flex-col gap-2">
            <label>Title *</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="border rounded px-3 py-2"
            />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <label>Type *</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              required
              className="border rounded px-3 py-2"
            >
              <option value="">Select type</option>
              {conferenceTypes.map((type) => (
                <option key={type} value={type}>
                  {type.replace(/_/g, " ")}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="border rounded px-3 py-2"
            rows={2}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex flex-col gap-2">
            <label>Start Date *</label>
            <input
              name="startDate"
              type="date"
              value={form.startDate}
              onChange={handleChange}
              required
              className="border rounded px-3 py-2"
            />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <label>End Date *</label>
            <input
              name="endDate"
              type="date"
              value={form.endDate}
              onChange={handleChange}
              required
              className="border rounded px-3 py-2"
            />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <label>Submission Deadline *</label>
            <input
              name="submissionDeadline"
              type="date"
              value={form.submissionDeadline}
              onChange={handleChange}
              required
              className="border rounded px-3 py-2"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex flex-col gap-2">
            <label>Location *</label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              required
              className="border rounded px-3 py-2"
            />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <label>City</label>
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              className="border rounded px-3 py-2"
            />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <label>Country</label>
            <input
              name="country"
              value={form.country}
              onChange={handleChange}
              className="border rounded px-3 py-2"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex flex-col gap-2">
            <label>Capacity</label>
            <input
              name="capacity"
              type="number"
              min={1}
              value={form.capacity}
              onChange={handleChange}
              className="border rounded px-3 py-2"
            />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <label>Organization</label>
            <input
              name="organization"
              value={form.organization}
              onChange={handleChange}
              className="border rounded px-3 py-2"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex flex-col gap-2">
            <label>Contact Email *</label>
            <input
              name="contactEmail"
              type="email"
              value={form.contactEmail}
              onChange={handleChange}
              required
              className="border rounded px-3 py-2"
            />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <label>Contact Phone</label>
            <input
              name="contactPhone"
              value={form.contactPhone}
              onChange={handleChange}
              className="border rounded px-3 py-2"
            />
          </div>
        </div>
        {/* Topics */}
        <div className="flex flex-col gap-2">
          <label>Topics *</label>
          <select
            multiple
            name="topics"
            value={form.topics}
            onChange={(e) =>
              handleArrayChange(
                "topics",
                Array.from(e.target.selectedOptions, (opt) => opt.value)
              )
            }
            required
            className="border rounded px-3 py-2"
          >
            {topics.map((topic) => (
              <option key={topic.id} value={topic.id}>
                {topic.name}
              </option>
            ))}
          </select>
          <span className="text-xs text-gray-400">
            Hold Ctrl (Windows) or Cmd (Mac) to select multiple topics.
          </span>
        </div>
        {/* Agenda Items */}
        <div className="flex flex-col gap-2">
          <label>Agenda Items *</label>
          {form.agendaItems.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row gap-2 items-center border rounded p-2 mb-2"
            >
              <input
                type="text"
                placeholder="Title"
                value={item.title}
                onChange={(e) =>
                  handleAgendaChange(idx, "title", e.target.value)
                }
                required
                className="border rounded px-2 py-1 flex-1"
              />
              <input
                type="text"
                placeholder="Description"
                value={item.description}
                onChange={(e) =>
                  handleAgendaChange(idx, "description", e.target.value)
                }
                className="border rounded px-2 py-1 flex-1"
              />
              <input
                type="datetime-local"
                placeholder="Start Time"
                value={item.startTime}
                onChange={(e) =>
                  handleAgendaChange(idx, "startTime", e.target.value)
                }
                required
                className="border rounded px-2 py-1 flex-1"
              />
              <input
                type="datetime-local"
                placeholder="End Time"
                value={item.endTime}
                onChange={(e) =>
                  handleAgendaChange(idx, "endTime", e.target.value)
                }
                required
                className="border rounded px-2 py-1 flex-1"
              />
              {form.agendaItems.length > 1 && (
                <button
                  type="button"
                  className="text-red-600 ml-2"
                  onClick={() => removeAgendaItem(idx)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="text-blue-600 hover:underline w-fit"
            onClick={addAgendaItem}
          >
            + Add Agenda Item
          </button>
        </div>
        {/* Ticket Types */}
        <div className="flex flex-col gap-2">
          <label>Ticket Types *</label>
          {form.ticketTypes.map((ticket, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row gap-2 items-center border rounded p-2 mb-2"
            >
              <input
                type="text"
                placeholder="Name"
                value={ticket.name}
                onChange={(e) =>
                  handleTicketChange(idx, "name", e.target.value)
                }
                required
                className="border rounded px-2 py-1 flex-1"
              />
              <input
                type="text"
                placeholder="Description"
                value={ticket.description}
                onChange={(e) =>
                  handleTicketChange(idx, "description", e.target.value)
                }
                className="border rounded px-2 py-1 flex-1"
              />
              <input
                type="number"
                placeholder="Price"
                min={0}
                value={ticket.price}
                onChange={(e) =>
                  handleTicketChange(idx, "price", e.target.value)
                }
                required
                className="border rounded px-2 py-1 flex-1"
              />
              <input
                type="number"
                placeholder="Quantity"
                min={1}
                value={ticket.quantity}
                onChange={(e) =>
                  handleTicketChange(idx, "quantity", e.target.value)
                }
                required
                className="border rounded px-2 py-1 flex-1"
              />
              {form.ticketTypes.length > 1 && (
                <button
                  type="button"
                  className="text-red-600 ml-2"
                  onClick={() => removeTicketType(idx)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="text-blue-600 hover:underline w-fit"
            onClick={addTicketType}
          >
            + Add Ticket Type
          </button>
        </div>
        {/* Moderators */}
        <div className="flex flex-col gap-2">
          <label>Moderators (emails, comma separated)</label>
          <input
            type="text"
            placeholder="moderator1@email.com, moderator2@email.com"
            value={form.moderators.join(", ")}
            onChange={handleModeratorsChange}
            className="border rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition mt-2 w-full max-w-xs self-end"
          disabled={saving}
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}

export default AddConferenceSection;
