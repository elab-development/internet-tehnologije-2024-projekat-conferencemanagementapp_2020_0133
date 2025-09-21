import { GoPeople } from "react-icons/go";
import {  IoVideocamOutline } from "react-icons/io5";

function EventTypeSection() {
  return (
    <section className="w-full px-12 mt-32">
      <div className="flex flex-col xl:px-48 xl:flex-row justify-between mx-auto items-end ">
        <h2 className="text-center mx-auto mb-16 font-inter  xl:text-start text-2xl xl:text-4xl text-black w-2/5 font-semibold">
          In-Person, Virtual, or Hybrid Events? We Got You.
        </h2>
        <img
          src="/assets/images/lecturer.webp"
          alt="Lecturer"
          className="w-full xl:max-w-1/2 object-cover"
        />
      </div>

      <div
        className="flex flex-col xl:flex-row space-y-8 xl:space-y-0 xl:space-x-8 w-full p-8 m-auto 
          border border-gray-300 rounded-2xl xl:w-3/4 justify-between"
      >
        <EventTypeCard
          icon={<GoPeople className="text-2xl text-blue-600" />}
          title={"In-Person"}
          description={`Create unforgettable on-site experiences by simplifying every
                    detail—from seamless registrations to real-time program updates—so
            your attendees can focus on meaningful, face-to-face connections.`}
        />

        <div className="w-3/4 h-0.5 mx-auto bg-gray-300 xl:mx-0 xl:my-auto xl:h-36  xl:w-0.5"></div>
        <EventTypeCard
          icon={<IoVideocamOutline className="text-2xl text-blue-600" />}
          title={"Virtual"}
          description={`Deliver dynamic online experiences with interactive tools, 
            live streaming, and virtual networking to keep your participants connected.`}
        />
        <div className="w-3/4 h-0.5 mx-auto bg-gray-300 xl:mx-0 xl:my-auto xl:h-36  xl:w-0.5"></div>
        <EventTypeCard
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
                          className="text-blue-600"
                          viewBox="0 0 48 48"
                          width="36px"
                height="36px"
                          fill="currentColor"
              id="video-conference"
            >
              <path d="M44 25.5h-5.5V25c0-1.99-1.07-3.73-2.65-4.7.71-.72 1.15-1.71 1.15-2.8 0-2.21-1.79-4-4-4s-4 1.79-4 4c0 1.09.44 2.08 1.15 2.8-1.59.97-2.65 2.71-2.65 4.7v.5H22c-.55 0-1 .45-1 1s.45 1 1 1h1v7c0 .55.45 1 1 1s1-.45 1-1h16c0 .55.45 1 1 1s1-.45 1-1v-7h1c.55 0 1-.45 1-1S44.55 25.5 44 25.5zM33 15.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2S31.9 15.5 33 15.5zM29.5 25c0-1.93 1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5v.5h-7V25zM41 32.5H25v-5h3.5 9H41V32.5zM4 22.5h12c.55 0 1-.45 1-1v-.61l4.68 1.56c.1.04.21.05.32.05.21 0 .41-.06.58-.19C22.85 22.12 23 21.82 23 21.5v-8c0-.32-.15-.62-.42-.81-.26-.19-.6-.24-.9-.14L17 14.11V13.5c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v8C3 22.05 3.45 22.5 4 22.5zM17 16.22l4-1.33v5.22l-4-1.33V16.22zM5 14.5h10v6H5V14.5z"></path>
            </svg>
          }
          title={"Hybrid"}
          description={`Seamlessly blend in-person and virtual components to 
            maximize accessibility and engagement for all participants.`}
        />
      </div>
    </section>
  );
}

function EventTypeCard({ icon, title, description }) {
  return (
    <div className="flex flex-col space-y-4 w-full xl:w-1/4">
      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-2xl ">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}



export default EventTypeSection;
