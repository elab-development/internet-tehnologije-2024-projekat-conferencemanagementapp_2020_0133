import JoinUsSection from "./components/JoinUsSection";
import HeroSection from "./components/HeroSection";
import UpcomingConferencesSection from "./components/UpcomingConferencesSection";
import { useConferences } from "../../hooks/useConferences";
import StatsSection from "./components/StatsSection";

function Home() {
  const { data, isLoading, isError } = useConferences(10);

  console.log(data);
  return (
    <div className="w-full h-full">
      <HeroSection />
      <UpcomingConferencesSection
        data={data}
        isLoading={isLoading}
        isError={isError}
      />
      <JoinUsSection />
      <StatsSection />
    </div>
  );
}

export default Home;
