import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import Spinner from "../../../components/Spinner";

function UpcomingConferencesSection({ data, isLoading, isError }) {
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const animationRef = useRef(null);
  const navigate = useNavigate();

  const startDrag = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    scrollContainerRef.current.style.userSelect = "none";
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
  };

  const duringDrag = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    const scroll = () => {
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    };
    animationRef.current = requestAnimationFrame(scroll);
  };

  const endDrag = () => {
    setIsDragging(false);
    if (scrollContainerRef.current)
      scrollContainerRef.current.style.cursor = "grab";
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
  };

  return (
    <section className="py-12 px-2 sm:px-4 border-b border-gray-200 bg-white">
      <h3 className="text-2xl sm:text-3xl font-bold text-start my-8 ms-2 sm:ms-8">
        Upcoming Conferences
      </h3>
      {isLoading && (
        <div className="flex justify-center items-center h-[30vh]">
          <Spinner size="w-6 h-6" />
        </div>
      )}
      {isError && (
        <div className="flex justify-center h-[30vh] text-red-500">
          <p className="my-auto">Can't load upcoming conferences</p>
        </div>
      )}
      {!isError && !isLoading && (
        <div
          onMouseDown={startDrag}
          onMouseLeave={endDrag}
          onMouseUp={endDrag}
          onMouseMove={duringDrag}
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide cursor-grab space-x-5 pb-5"
        >
          {data &&
            data.data.map((conference) => (
              <ConferenceCard
                key={conference.id}
                conference={conference}
                onClick={() => navigate(`/conference/${conference.id}`)}
              />
            ))}
        </div>
      )}
    </section>
  );
}

const ConferenceCard = React.memo(({ conference, onClick }) => {
  return (
    <div
      className="flex-shrink-0 w-[92vw] sm:w-[60vw] md:w-[35vw] lg:w-[25vw] xl:w-[20vw] h-auto min-h-[270px] border border-gray-200  rounded-2xl m-2 
      transform transition-all duration-300 hover:shadow-xl overflow-hidden flex flex-col shadow-sm"
    >
      <div className="flex-1 p-5 flex flex-col">
        <h4 className="text-lg md:text-xl font-bold mb-2 text-blue-800 line-clamp-2">
          {conference.title}
        </h4>
        <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
          <svg
            className="w-4 h-4 text-blue-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span>
            {conference.city}, {conference.country}
          </span>
        </div>
        <div className="flex items-center gap-2 text-gray-500 text-xs mb-3">
          <svg
            className="w-4 h-4 text-blue-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>
            {new Date(conference.startDate).toLocaleDateString()} -{" "}
            {new Date(conference.endDate).toLocaleDateString()}
          </span>
        </div>
        <div className="flex-1" />
        <button
          className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          View Details
        </button>
      </div>
    </div>
  );
});

export default UpcomingConferencesSection;
