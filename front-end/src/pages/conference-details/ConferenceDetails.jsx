import { useParams } from "react-router";
import { useConferenceById } from "../../hooks/useConferences";
import HeroSection from "./components/HeroSection";
import ObjectiveSection from "./components/ObjectiveSection";
import OrganizerDetailsSection from "./components/OrganizerDetailsSection";
import AgendaSection from "./components/AgendaSection";
import AttendNowSection from "./components/AttendNowSection";

function ConferenceDetailsPage() {
  const { id } = useParams();
  const { data: conference, isLoading, isError } = useConferenceById(id);

  if (isLoading) {
    return (
      <div className="w-full h-[40vh] flex items-center justify-center bg-gray-100">
        <span>Loading...</span>
      </div>
    );
  }

  if (isError || !conference) {
    return (
      <div className="w-full h-[40vh] flex items-center justify-center bg-gray-100">
        <span>Conference not found.</span>
      </div>
    );
  }

  return (
    <>
      <HeroSection
        title={conference.title}
        start_date={conference.start_date}
        end_date={conference.end_date}
        city={conference.city}
        country={conference.country}
        submission_deadline={conference.submission_deadline}
      />
      <div className="px-4 md:px-8 lg:px-16 flex flex-col md:flex-row gap-6 mt-6">
        <div className="flex-1">
          <ObjectiveSection
            description={conference.description}
            topics={conference.topics}
          />
        </div>
        <OrganizerDetailsSection
          organization={conference.organization}
          contact_email={conference.contact_email}
          contact_phone={conference.contact_phone}
          created_by={conference.created_by}
        />
      </div>
      <AgendaSection
        agendaItems={conference.agenda_items}
        startDate={conference.start_date}
        endDate={conference.end_date}
      />
      <AttendNowSection ticketTypes={conference.ticket_types} conference={conference} />
    </>
  );
}

export default ConferenceDetailsPage;
