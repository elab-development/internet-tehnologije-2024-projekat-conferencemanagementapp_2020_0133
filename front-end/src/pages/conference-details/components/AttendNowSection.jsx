function AttendNowSection({ ticketTypes = [] }) {
  if (!ticketTypes.length) return null;

  return (
    <section id="attend-now-section" className="w-full max-w-5xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 text-center">
        Attend Now
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        {ticketTypes.map((ticket) => (
          <div
            key={ticket.id}
            className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center border border-blue-100 w-full max-w-xs"
          >
            <h3 className="text-lg font-bold mb-2 text-blue-800">
              {ticket.name}
            </h3>
            <p className="text-gray-700 mb-4">{ticket.description}</p>
            <div className="text-2xl font-semibold text-blue-600 mb-4">
              {parseFloat(ticket.price) === 0 ? "Free" : `${ticket.price} €`}
            </div>
            <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition">
              Go {ticket.name}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AttendNowSection;
