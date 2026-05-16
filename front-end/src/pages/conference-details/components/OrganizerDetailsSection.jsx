import { FaUser, FaBuilding, FaEnvelope, FaPhone } from "react-icons/fa";

function OrganizerDetailsSection({
  organization,
  contact_email,
  contact_phone,
  created_by,
}) {
  return (
    <section className="w-full md:max-w-sm bg-blue-50 rounded-xl shadow p-6 md:p-8 ml-auto">
      <h2 className="text-lg md:text-xl font-semibold mb-4 text-blue-900">
        Organiser Details
      </h2>
      <div className="flex flex-col gap-4 text-blue-900">
        <div className="flex items-center gap-3">
          <FaUser className="text-xl" />
          <span className="font-medium">
            {created_by?.first_name} {created_by?.last_name}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <FaBuilding className="text-xl" />
          <span>{organization}</span>
        </div>
        <div className="flex items-center gap-3">
          <FaEnvelope className="text-xl" />
          <span>{contact_email}</span>
        </div>
        <div className="flex items-center gap-3">
          <FaPhone className="text-xl" />
          <span>{contact_phone}</span>
        </div>
      </div>
    </section>
  );
}

export default OrganizerDetailsSection;
