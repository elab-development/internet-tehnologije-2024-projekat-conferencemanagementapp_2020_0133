function AboutUsContent() {
    return (
      <section className="my-24 mx-8 opacity-0 animate-[fadeInBounce_1s_ease-out_0.1s_forwards]">
        <div className="flex flex-col lg:flex-row justify-between space-y-8 lg:space-y-0 lg:space-x-16 lg:px-72">
          <div className="lg:w-1/2 rounded-4xl overflow-hidden border-gray-300 border shadow-2xl px-auto lg:px-0">
            <img
              src="/assets/images/about-us-image-1.jpg"
              alt="About Us Image"
              className="w-full h-full content-center"
            />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col justify-around text-gray-700 mx-auto lg:mx-0 space-y-4">
            <h2 className="text-3xl font-semibold text-center mx-auto lg:mx-0 lg:text-start">
              Our mission
            </h2>
            <p className="text-lg text">
              Academic research allows humanity to better understand the world
              we live in and find novel ways to tackle climate change, develop
              new medicine, fight pandemics and find evidence-based solutions to
              social problems.
            </p>
            <p className="text-lg text">
              Conferences and events, whether they happen in-person, virtually
              or otherwise are the best way to connect like-minded individuals
              so they can exchange ideas, network, spark collaborations and push
              the boundaries of their field.
            </p>
            <p className="text-lg text">
              Our mission is to support those research communities by providing
              the most modern platform to allow their members to meet, network
              and communicate.
            </p>
          </div>
        </div>

        <div
          className="flex flex-col-reverse lg:flex-row mt-16 lg:mt-32 justify-between
         space-y-8 lg:space-y-0 lg:space-x-16 lg:px-72"
        >
          <div className="w-full lg:w-1/2 flex flex-col justify-around text-gray-700 mx-auto lg:mx-0 space-y-4 my-8 lg:me-8">
            <h2 className="text-3xl font-semibold text-center mx-auto lg:mx-0 lg:text-start">
              Our Story
            </h2>
            <p className="text-lg text">
              In 2012, in Serbia, two PhD students in bioinformatics created a
              website to simplify the logistics of a symposium. Other
              researchers, having heard about the platform, asked if it could be
              reused to simplify the organization of their own event.
            </p>
            <p className="text-lg text">
              This is how the idea of building a technology that can be used
              autonomously by any research group was born.
            </p>
            <p className="text-lg text">
              Over the years, Confe has been rebuilt by our team of passionate
              internal engineers, with the constant objective of creating a
              modern, easy-to-use, and affordable platform specialized in
              academic events.
            </p>
          </div>
          <div className="lg:w-1/2 rounded-4xl overflow-hidden border-gray-300 border shadow-2xl px-auto lg:px-0 lg:ms-8">
            <img
              src="/assets/images/about-us-image-2.jpeg"
              alt="About Us Image"
              className="w-full h-full content-center"
            />
          </div>
        </div>
      </section>
    );
}

export default AboutUsContent;
