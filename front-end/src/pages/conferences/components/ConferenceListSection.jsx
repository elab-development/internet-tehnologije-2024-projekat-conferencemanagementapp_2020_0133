import dayjs from "dayjs";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import Spinner from "../../../components/Spinner";

function ConferenceListSection({
  data,
  isLoading,
  isError,
  onNavClick,
  state,
  onChange,
}) {
  const navigate = useNavigate();

  const getPaginationList = () => {
    const meta = data.meta;
    meta.links[0].label = "Prev";
    meta.links[meta.links.length - 1].label = "Next";
    return meta.links;
  };
  const isDisabled = (page) => {
    if (page.active || page.url === null) {
      return true;
    }
  };

  // Kada klikneš na konferenciju:
  const handleConferenceClick = (id) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Navigacija sa query parametrom
    navigate(`/conference/${id}${window.location.search}`);
  };

  return (
    <section className="w-full xl:w-3/4 xl:pe-16">
      {isLoading ? (
        <div className="flex justify-center py-6">
          <Spinner size="w-5 h-5" />
        </div>
      ) : (
        !isError && (
          <div>
            <div className="w-full flex flex-col items-end  space-y-2">
              <div className="flex space-x-2 items-center">
                <label htmlFor="sortBy">Sort by:</label>
                <select
                  name="sortBy"
                  className="p-2 border rounded-lg"
                  value={state.sortBy}
                  onChange={onChange}
                >
                  <option value="asc">Earliest first</option>
                  <option value="desc">Latest first</option>
                </select>
              </div>
              <div className="w-full">
                {data.data.map((conference) => (
                  <ConferencePreviewCard
                    key={conference.id}
                    conference={conference}
                    onClick={() => handleConferenceClick(conference.id)}
                  />
                ))}
              </div>
            </div>
            <div className="flex w-full mt-4 mb-6 justify-center">
              <div className="flex w-full justify-center mx-auto ">
                {getPaginationList().map((p, index) => (
                  <button
                    key={index}
                    disabled={isDisabled(p)}
                    onClick={() => onNavClick(p.page)}
                    className={`text-sm sm:text-normal first:border-s-1 w-1/11 xl:w-1/22 
                    border-e sm:w-1/15 md:w-1/17 lg:w-1/20 border-y text-center py-2 ${
                      p.active ? "bg-black text-white" : ""
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )
      )}
    </section>
  );
}
function ConferencePreviewCard({ conference, onClick }) {
  return (
    <div
      className="w-full p-6 rounded-4xl border mt-1 cursor-pointer"
      onClick={onClick}
    >
      <h3 className="text-lg sm:text-xl">{conference.title}</h3>
      <div className="my-1 space-x-1 space-y-1 flex  w-full  flex-wrap">
        {conference.topics.map((topic) => (
          <div
            key={topic.id}
            className="sm:py-1 px-2 border rounded-full text-sm"
          >
            {topic.name}
          </div>
        ))}
      </div>
      <div className="flex space-x-2 items-center w-full mt-6 text-sm sm:text-base">
        <FaRegCalendarAlt />
        <span>{dayjs(conference.startDate).format("D MMMM, YYYY")}</span>
        <FaLocationDot className="ms-2" />
        <span>{conference.city + ", " + conference.country}</span>
      </div>
    </div>
  );
}

export default ConferenceListSection;
