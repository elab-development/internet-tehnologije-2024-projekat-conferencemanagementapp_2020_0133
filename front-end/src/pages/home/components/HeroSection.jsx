function HeroSection() {
    return ( 
        <section className="relative w-full h-[70vh] min-h-[500px] max-h-[800px] overflow-hidden">
            {/* Slika koja će se lepo skalirati */}
            <img 
                src="/assets/images/hero.webp" 
                alt="Hero Section" 
                className="w-full h-full object-cover object-center brightness-50"
            />
            
            {/* Tekst preko slike */}
            <div className="absolute inset-0 bg-opacity-40 flex items-center justify-left w-3/7">
                <div className="text-start p-16  text-white w-full">
                    <h1 className="font-inter text-4xl md:text-6xl font-bold mb-4">Experience the Future of Conferences</h1>
                    <p className="text-xl md:text-2xl mb-8">Connect with industry leaders, explore groundbreaking ideas, and be part of a global community.</p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg ">
                        View Schedule 
                    </button>
                </div>
            </div>
        </section>   );
}

export default HeroSection;