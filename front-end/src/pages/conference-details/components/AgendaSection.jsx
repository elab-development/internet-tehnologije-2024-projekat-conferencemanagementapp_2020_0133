import { useState } from "react";
import dayjs from "dayjs";


function groupAgendaByDay(agendaItems, startDate) {
  if (!agendaItems || agendaItems.length === 0) return {};


  const sorted = [...agendaItems].sort(
    (a, b) => new Date(a.start_time) - new Date(b.start_time)
  );


  const grouped = {};
  sorted.forEach((item) => {
    const date = dayjs(item.start_time).format("YYYY-MM-DD");
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(item);
  });


  if (startDate && !grouped[startDate]) {
    grouped[startDate] = [];
  }

  return grouped;
}

function AgendaSection({ agendaItems = [], startDate, endDate }) {

  const days = [];
  let current = dayjs(startDate);
  const last = dayjs(endDate);
  while (current.isBefore(last) || current.isSame(last, "day")) {
    days.push(current.format("YYYY-MM-DD"));
    current = current.add(1, "day");
  }


  const groupedAgenda = groupAgendaByDay(agendaItems, days[0]);
  const [activeDay, setActiveDay] = useState(days[0]);

  return (
    <section className="w-full max-w-5xl mx-auto mt-8">
      <div className="bg-white rounded-xl shadow p-4 md:p-6">
        <h2 className="text-xl md:text-2xl font-semibold mb-6 text-gray-900">
          Agenda
        </h2>
        <div className="flex gap-2 mb-6">
          {days.map((date, idx) => (
            <button
              key={date}
              onClick={() => setActiveDay(date)}
              className={`px-5 py-2 rounded-t-lg font-semibold border-b-2 ${
                activeDay === date
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-blue-50 text-blue-700 border-transparent"
              }`}
            >
              Day {idx + 1}
              <span className="text-xs font-normal ml-2 hidden sm:inline">
                {dayjs(date).format("D MMM YYYY")}
              </span>
            </button>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-blue-200 rounded-lg">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="py-3 px-4 text-left rounded-tl-lg border-r border-blue-200">
                  Timing
                </th>
                <th className="py-3 px-4 text-left rounded-tr-lg">Sessions</th>
              </tr>
            </thead>
            <tbody>
              {(groupedAgenda[activeDay] || []).length === 0 && (
                <tr>
                  <td
                    colSpan={2}
                    className="py-4 px-4 text-center text-gray-500"
                  >
                    No sessions for this day.
                  </td>
                </tr>
              )}
              {(groupedAgenda[activeDay] || []).map((item) => (
                <tr key={item.id} className="border-b last:border-b-0">
                  <td className="py-2 px-4 whitespace-nowrap border-r border-gray-500">
                    {dayjs(item.start_time).format("HH:mm")} –{" "}
                    {dayjs(item.end_time).format("HH:mm")}
                  </td>
                  <td className="py-2 px-4">{item.title}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default AgendaSection;
