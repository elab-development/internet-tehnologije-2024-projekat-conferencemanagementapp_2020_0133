function HeroSection() {
    return (
      <section className="mt-8 md:mt-16 xl:mt-32">
        <div
          className="px-2 py-1 border border-gray-300 border-0.5 rounded-full w-fit mx-auto opacity-0
    animate-[fadeInBounce_0.5s_ease-out_0.2s_forwards]"
        >
          <h4 className="text-gray-500 text-sm">Company</h4>
        </div>
        <h1
          className="text-2xl md:text-4xl mt-8 font-semibold mx-auto w-fit text-gray-800 opacity-0
    animate-[fadeInBounce_0.5s_ease-out_0.5s_forwards]"
        >
          About Confe
        </h1>
        <h3
          className="text-lg md:text-xl mx-auto mt-8 text-center text-gray-600 w-fit opacity-0
    animate-[fadeInBounce_0.5s_ease-out_0.8s_forwards]"
        >
          Meet the team and learn about our mission and vision
        </h3>
      </section>
    );
}

export default HeroSection;