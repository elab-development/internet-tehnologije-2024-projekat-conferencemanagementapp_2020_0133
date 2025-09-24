import JoinUsSection from "./components/JoinUsSection";
import HeroSection from "./components/HeroSection";
import UpcomingConferencesSection from "./components/UpcomingConferencesSection";
import { useConferences } from "../../hooks/useConferences";
import StatsSection from "./components/StatsSection";
import EventTypeSection from "./components/EventTypesSection";
import NewsSection from "./components/NewsSection";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function Home() {
  const { data, isLoading, isError, error } = useConferences({limit: 10});
  const {
    data: newsData,
    isLoading: isNewsLoading,
    isError: isNewsError,
  } = useQuery({
    queryKey: ["news"],
    queryFn: () =>
      axios
        .get(
          "https://newsdata.io/api/1/latest?apikey=pub_9de0fb7b0b7545caad1063a4859e1ebc&language=en&qInTitle=conference&image=1&category=science,technology,education"
        )
        .then((res) => res.data.results),
  });
  console.log(isLoading);
  return (
    <div className="w-full h-full">
      <HeroSection />
      <UpcomingConferencesSection
        data={data}
        isLoading={isLoading}
        isError={isError}
      /> <JoinUsSection />
      <StatsSection />
      <EventTypeSection />
      <NewsSection data={newsData} isLoading={isNewsLoading} isError={isNewsError}/>
    </div>
  );
}

export default Home;
