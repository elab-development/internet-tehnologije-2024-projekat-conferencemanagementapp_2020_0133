function StatsSection() {
  return (
    <section
      className="px-8 md:px-16 lg:px-32 xl:px-48 m-8 py-8 md:py-16 bg-gradient-to-b
     from-gray-900 to-gray-800 rounded-3xl "
    >
      <div className="flex flex-col xl:flex-row justify-between items-center space-x-8">
        <h3 className="text-3xl text-white font-bold my-8 ms-8 w-full text-center">
          Powering Events Across the Globe
        </h3>
        <p className="text-gray-400 w-full text-center lg:text-start ">
          Confe is the go-to platform, with a proven track record in
          streamlining the management of seamless, high-impact events. Our
          commitment to excellence and global reach ensures every event runs
          smoothly and efficiently, no mater where it's held or how complex the
          scale.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-9 w-full gap-4 mt-10">
        <StatBlock
          rowSpan={3}
          title={"4,000+"}
          text={"Events powered globally"}
        />
        <ImageBlock
          rowSpan={6}
          image={"/assets/images/stats-image-2.jpg"}
          alt={"Stats Image"}
        />

        <StatBlock rowSpan={4} title={"+180"} text={"Countries"} />

        <ImageBlock
          rowSpan={6}
          image={"/assets/images/stats-image-1.jpg"}
          alt={"Stats Image"}
        />
        <ImageBlock
          rowSpan={5}
          image={"/assets/images/stats-image-3.jpg"}
          alt={"Stats Image"}
        />

        <StatBlock rowSpan={3} title={"+625,000"} text={"Participants"} />
      </div>
    </section>
  );
}

function StatBlock({ rowSpan, title, text }) {
  return (
    <div
      className={`flex flex-col justify-center bg-gradient-to-b
     from-gray-900 to-gray-800  rounded-3xl row-span-${rowSpan} p-5 items-center space-y-2 border-gray-700 border`}
    >
      <h2 className="text-center text-5xl text-white">{title}</h2>
      <p className="text-center text-gray-400 text-2xl">{text}</p>
    </div>
  );
}
function ImageBlock({ rowSpan, image, alt }) {
  return (
    <div
      className={`bg-gray-400 rounded-3xl row-span-${rowSpan} overflow-hidden border-gray-700 border`}
    >
      <img
        src={image}
        alt={alt}
        className="w-full h-full object-cover rounded-3xl"
      />
    </div>
  );
}

export default StatsSection;
