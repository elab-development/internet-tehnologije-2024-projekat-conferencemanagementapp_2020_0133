import { FaRegCalendarAlt } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import dayjs from "dayjs";
import { useRef } from "react";

function HeroSection({ title, start_date, end_date, city, country }) {
  const handleAttendClick = () => {
    const attendSection = document.getElementById("attend-now-section");
    if (attendSection) {
      attendSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative w-full h-[40vh] flex items-center justify-center mt-15"
      style={{
        backgroundImage:
          "url('/assets/images/diversity-teenager-team-seminar-training-education-concept.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-10" />
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white w-full h-full">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
          {title}
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 text-lg font-medium mb-6">
          <span className="flex items-center gap-2">
            <FaRegCalendarAlt className="text-xl" />
            {dayjs(start_date).format("D MMM YYYY")}
            {end_date && end_date !== start_date
              ? ` - ${dayjs(end_date).format("D MMM YYYY")}`
              : ""}
          </span>
          <span className="hidden md:inline-block mx-2">|</span>
          <span className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-xl" />
            {city}, {country}
          </span>
        </div>
        <div className="flex gap-4 mt-2">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition"
            onClick={handleAttendClick}
          >
            Attend
          </button>
          <button
            className="bg-white bg-opacity-80 hover:bg-opacity-100 text-blue-700 font-semibold py-2 px-6 rounded transition"
          >
            Take a part
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
