function JoinUsSection() {
  return (
    <section className=" py-16 mx-8 text-center">
      <h2 className="text-center font-bold text-4xl">
        Join Our Conference Community
      </h2>
      <div className="w-24 h-1 bg-blue-600 mx-auto my-4 rounded-4xl"></div>
      <p className="text-center text-lg mt-4 max-w-5xl mx-auto">
        Confe brings together researchers, professionals, and enthusiasts from
        diverse fields, offering a platform to share knowledge, experiences, and
        ideas, fostering collective growth within their disciplines.
      </p>
      <div className="flex flex-col md:flex-row justify-center space-x-2 mt-8">
        <div
          className="w-full lg:w-1/4 text-center py-4 m-2 border border-gray-300 
        rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <h3 className="text-2xl font-semibold mb-2">For Attendees</h3>
          <p className="text-gray-600 mx-8">
            Explore a wide range of conferences, connect with experts, and stay
            updated with the latest trends in your field.
          </p>
          <button
            className="w-full max-w-64 mt-16 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700
           transition-colors duration-300"
          >
            Browse Conferences
          </button>
        </div>

        <div
          className="w-full lg:w-1/4 text-center py-4 m-2 border border-gray-300 
        rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <h3 className="text-2xl font-semibold mb-2">For Organizers</h3>
          <p className="text-gray-600 mx-4">
            Easily manage your conferences, track registrations, and engage with
            your audience through our intuitive platform. Get started today!
          </p>
          <button
            className="w-full max-w-64 mt-16 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700
           transition-colors duration-300"
          >
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}

export default JoinUsSection;
