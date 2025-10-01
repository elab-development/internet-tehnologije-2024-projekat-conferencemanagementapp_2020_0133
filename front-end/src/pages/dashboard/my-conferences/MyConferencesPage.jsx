import { useState } from "react";
import DashboardMenu from "../components/DashboardMenu";
import { useUser } from "../../../context/UserContext";
import MyConferencesListSection from "./components/MyConferencesListSection";
import AddConferenceSection from "./components/AddConferenceSection";

function MyConferencesPage() {
  const { user } = useUser();
  const [showAdd, setShowAdd] = useState(false);
  const [editConferenceId, setEditConferenceId] = useState(null);

  const handleAdd = () => {
    setEditConferenceId(null);
    setShowAdd(true);
  };

  const handleEdit = (id) => {
    setEditConferenceId(id);
    setShowAdd(true);
  };

  const handleBack = () => {
    setEditConferenceId(null);
    setShowAdd(false);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-start justify-center bg-gray-100 p-4">
      {/* DashboardMenu */}
      <div className="w-full md:w-1/6 flex justify-center mb-6 md:mb-0 md:mr-6">
        <DashboardMenu user={user} />
      </div>
      {/* Main section */}
      <div className="w-full md:w-5/6 flex flex-col gap-6">
        {!showAdd ? (
          <MyConferencesListSection
            onAddConference={handleAdd}
            onEditConference={handleEdit}
          />
        ) : (
          <AddConferenceSection
            onBack={handleBack}
            editConferenceId={editConferenceId}
          />
        )}
      </div>
    </div>
  );
}

export default MyConferencesPage;
