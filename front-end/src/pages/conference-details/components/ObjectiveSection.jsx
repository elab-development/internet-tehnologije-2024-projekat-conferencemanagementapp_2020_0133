function ObjectiveSection({ description, topics = [] }) {
  return (
    <section className="w-full max-w-5xl mx-auto mt-6">
      <div className="bg-white rounded-xl shadow p-6 md:p-8">
        <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900">
          Objective of the Conference
        </h2>
        <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
          {description}
        </p>
        {topics.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              Conference Topics
            </h3>
            <ul className="flex flex-wrap gap-2">
              {topics.map((topic, idx) => (
                <li
                  key={idx}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {topic.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

export default ObjectiveSection;
