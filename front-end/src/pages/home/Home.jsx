import HeroSection from "./components/HeroSection";
import UpcomingConferencesSection from "./components/UpcomingConferencesSection";

function Home() {
    return (
        <div className="w-full h-full">
            <HeroSection />
            <div className="h-full p-16">
                <UpcomingConferencesSection />
            </div>
            
    
        </div>
    );
}

export default Home;