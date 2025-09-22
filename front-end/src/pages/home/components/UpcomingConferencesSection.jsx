
import React, { useRef, useState, useEffect } from "react";

function UpcomingConferencesSection({ data, isLoading, isError }) {

  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const animationRef = useRef(null);

  const startDrag = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    scrollContainerRef.current.style.userSelect = "none";

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const duringDrag = 
    (e) => {
      if (!isDragging) return;
      e.preventDefault();

      const x = e.pageX - scrollContainerRef.current.offsetLeft;
      const walk = (x - startX) * 2; // Ubrzaj skrolovanje

      // Koristi requestAnimationFrame za glatko skrolovanje
      const scroll = () => {
        scrollContainerRef.current.scrollLeft = scrollLeft - walk;
      };
      animationRef.current = requestAnimationFrame(scroll);
    };

  const endDrag = () => {
    setIsDragging(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = "grab";
    }

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };


  return (
    <section className="py-16 mx-8 border-b border-gray-400">
      <h3 className="text-3xl font-bold text-start my-8 ms-8">
        Upcoming Conferences
      </h3>
      {isLoading && (
        <div className="flex justify-center h-[30vh]">
          <p className="my-auto">Loading...</p>
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
          className="flex overflow-x-auto scrollbar-hide cursor-grab 
          space-x-5 pb-5  scrollbar-transparent"
        >
          {data &&
            data.data.map((conference) => (
              <ConferenceCard key={conference.id} conference={conference} />
            ))}
        </div>
      )}
    </section>
  );
}

const ConferenceCard = React.memo(({ conference }) => {
  return (
    <div
      onClick={() => console.log("Clicked conference:", conference.id)}
      className="flex-shrink-0 w-[22vw] h-[30vh] border border-gray-300 bg-white rounded-lg m-4 
    transform transition-all duration-300 hover:scale-105 hover:shadow-lg overflow-hidden"
    >
      <h4 className="text-lg font-semibold p-4">{conference.title}</h4>
      <p className=" text-gray-600 p-4">
        Dates: {new Date(conference.startDate).toLocaleDateString()} - {new Date(conference.endDate).toLocaleDateString()}
      </p>
      <p className="inline-block text-gray-600 ps-4">
        Location: {conference.city}, {conference.country}
      </p>
    </div>
  );
});

export default UpcomingConferencesSection;
