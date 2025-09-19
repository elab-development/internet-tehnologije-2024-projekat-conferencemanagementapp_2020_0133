import { useConferences } from "../../../hooks/useConferences";
import React, { useRef, useState, useEffect, useCallback } from "react";

function UpcomingConferencesSection() {
  const { data, isLoading, isError } = useConferences(10);
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const animationRef = useRef(null);

  const startDrag= useCallback((e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    scrollContainerRef.current.style.cursor = "grabbing";
    scrollContainerRef.current.style.userSelect = "none";

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, []);

  const duringDrag = useCallback((e) => {
    if (!isDragging) return;
    e.preventDefault();

    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Ubrzaj skrolovanje

    // Koristi requestAnimationFrame za glatko skrolovanje
    const scroll = () => {
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    };
    animationRef.current = requestAnimationFrame(scroll);
  }, [isDragging, startX, scrollLeft]);

  const endDrag = useCallback(() => {
    setIsDragging(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = "grab";
      scrollContainerRef.current.style.removeProperty("user-select");
    }

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, []);

  // Dodaj event listenere za miš
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("mousedown", startDrag);
    container.addEventListener("mousemove", duringDrag);
    container.addEventListener("mouseup", endDrag);
    container.addEventListener("mouseleave", endDrag);

    return () => {
      container.removeEventListener("mousedown", startDrag);
      container.removeEventListener("mousemove", duringDrag);
      container.removeEventListener("mouseup", endDrag);
      container.removeEventListener("mouseleave", endDrag);

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDragging, startX, scrollLeft]);

  // Dodaj event listenere za touch uređaje
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const startDragTouch = (e) => {
      setIsDragging(true);
      setStartX(e.touches[0].pageX - container.offsetLeft);
      setScrollLeft(container.scrollLeft);
    };

    const duringDragTouch = (e) => {
      if (!isDragging) return;
      const x = e.touches[0].pageX - container.offsetLeft;
      const walk = (x - startX) * 2;

      const scroll = () => {
        container.scrollLeft = scrollLeft - walk;
      };
      animationRef.current = requestAnimationFrame(scroll);
    };

    container.addEventListener("touchstart", startDragTouch);
    container.addEventListener("touchmove", duringDragTouch);
    container.addEventListener("touchend", endDrag);

    return () => {
      container.removeEventListener("touchstart", startDragTouch);
      container.removeEventListener("touchmove", duringDragTouch);
      container.removeEventListener("touchend", endDrag);
    };
  }, [isDragging, startX, scrollLeft]);

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        Can't load upcoming conferences
      </div>
    );
  }

  console.log(data);
  return (
    <section>
      <h3 className="text-3xl font-bold text-start my-8 ">
        Upcoming Conferences
      </h3>
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto scrollbar-hide space-x-5 pb-5 cursor-grab"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {data.map((conference) => (
          <ConferenceCard key={conference.id} conference={conference} />
        ))}
      </div>
    </section>
  );
}

const ConferenceCard = React.memo(({ conference }) => {
  return (
    <div
      className="flex-shrink-0 w-[22vw] h-[30vh] bg-white rounded-lg m-4 
    transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
    >
      <h4 className="text-lg font-semibold p-4">{conference.title}</h4>
      <p className=" text-gray-600 p-4">
        Dates: {new Date(conference.startDate).toLocaleDateString()} -{" "}
        {new Date(conference.endDate).toLocaleDateString()}
      </p>
      <p className="inline-block text-gray-600 ps-4">
        Location: {conference.city}, {conference.country}
      </p>
    </div>
  );
});

export default UpcomingConferencesSection;
