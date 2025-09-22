import { useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function NewsSection({data = [], isLoading, isError}) {
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
    const animationRef = useRef(null);
    const cardRef = useRef(null);

  const startDrag = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
      scrollContainerRef.current.style.userSelect = "none";

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

    const rightArrowClick = () => {
        if (!cardRef.current) return;
        const cardWidth = cardRef.current.offsetWidth + 20;
        scrollContainerRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });

    }
    const leftArrowClick = () => {
      if (!cardRef.current) return;
      const cardWidth = cardRef.current.offsetWidth + 20;
      scrollContainerRef.current.scrollBy({
        left: -cardWidth,
        behavior: "smooth",
      });
    };
  const duringDrag = (e) => {
    if (!isDragging) return;
    e.preventDefault();

    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Ubrzaj skrolovanje

    // Koristi requestAnimationFrame za glatko skrolovanje
    const scroll = () => {
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    };
    animationRef.current = requestAnimationFrame(scroll);
  };

  const endDrag = () => {
    setIsDragging(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = "grab";
    }

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

    data = data.concat(newsData);

  return (
    <section className="w-full my-16 relative">
      <h3 className="text-3xl font-bold text-start my-8 ms-8">Latest News</h3>
           {!isLoading && !isError && ( <> <div
        className="relative w-full overflow-x-auto scrollbar-hide cursor-grab space-x-5 pb-5 scrollbar-transparent"
        onMouseDown={startDrag}
        onMouseLeave={endDrag}
        onMouseUp={endDrag}
        onMouseMove={duringDrag}
        ref={scrollContainerRef}
      >
        <div className="flex w-full overflow-visible px-8 space-x-5">
          {data.map((article, index) =>
            index === 0 ? (
              <NewsCard article={article} ref={cardRef} />
            ) : (
              <NewsCard article={article} />
            )
          )}
        </div>
      </div>
      <button
        onClick={() => rightArrowClick()}
        className="absolute top-5/9 right-6 transform -translate-y-1/2 size-14 md:size-18 bg-gray-300 opacity-50 
      flex items-center justify-center text-white text-xs rounded-full hover:opacity-100 transition-opacity"
      >
        <IoIosArrowForward className="text-2xl text-black" />
      </button>
      <button
        onClick={() => leftArrowClick()}
        className="absolute top-5/9 left-6 transform -translate-y-1/2 size-14 sm:size-16 md:size-18 bg-gray-300 opacity-50 
      flex items-center justify-center text-white text-xs rounded-full hover:opacity-100 transition-opacity"
      >
        <IoIosArrowBack className="text-2xl text-black" />
      </button> </>)
          }
    </section>
  );
}

function NewsCard({ article, ref}) {
  return (
    <div
      className="flex-shrink-0 h-[25vh] w-[40vw] md:w-[35vw] xl:h-[30vh] xl:w-[27vw] 2xl:w-[22vw] lg:w-[30vw] flex flex-col 
      rounded-2xl overflow-hidden border-gray-300 border"
      ref={ref}
    >
      <img
        className="h-5/7 w-full object-fill pointer-events-none select-none"
        src={article.image_url}
        alt={article.title}
      />
      <h4
        onClick={() => window.open(article.link, "_blank")}
        className="mt-2 ps-4 text-sm md:text-baseline hover:text-blue-600"
      >
        {article.title.length > 180
          ? article.title.slice(0, 177) + "..."
          : article.title}
      </h4>
    </div>
  );
}



export default NewsSection;
const newsData = [
  {
    article_id: "fed7f0d2490987ecd4f57df83039e45c",
    title:
      "Stealth BioTherapeutics Announces FDA Accelerated Approval of FORZINITYTM (elamipretide HCl), the First Therapy for Progressive and Life-limiting Ultra-rare Genetic Disease Barth Syndrome",
    link: "https://www.keenesentinel.com/online_features/press_releases/stealth-biotherapeutics-announces-fda-accelerated-approval-of-forzinity-elamipretide-hcl-the-first-therapy-for-progressive/article_269bf530-1473-5d43-ae83-56f992307a2b.html",
    keywords: null,
    creator: ["By STEALTH BIOTHERAPEUTICS INC."],
    description:
      'NEEDHAM, Mass., Sept. 19, 2025 /PRNewswire/ -- Stealth BioTherapeutics Inc. (the "Company" or "Stealth"), a commercial-stage biotechnology company focused on the discovery, development and commercialization of novel therapies for diseases involving mitochondrial dysfunction, today announced that the U.S. Food and...',
    content: "ONLY AVAILABLE IN PAID PLANS",
    pubDate: "2025-09-20 00:07:00",
    pubDateTZ: "UTC",
    image_url:
      "https://bloximages.chicago2.vip.townnews.com/keenesentinel.com/content/tncms/assets/v3/editorial/9/86/9861956c-dc44-5e41-bc52-70821aabcbeb/68ce4b663b587.image.jpg?resize=300%2C118",
    video_url: null,
    source_id: "sentinelsource",
    source_name: "Sentinelsource",
    source_priority: 48282,
    source_url: "https://www.sentinelsource.com",
    source_icon: "https://n.bytvi.com/sentinelsource.jpg",
    language: "english",
    country: ["united states of america"],
    category: ["top", "science"],
    sentiment: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
    sentiment_stats: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
    ai_tag: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
    ai_region: "ONLY AVAILABLE IN CORPORATE PLANS",
    ai_org: "ONLY AVAILABLE IN CORPORATE PLANS",
    ai_summary: "ONLY AVAILABLE IN PAID PLANS",
    ai_content: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
    duplicate: true,
  },
  {
    article_id: "67a85177d112a3ea1b88d4be57e72b49",
    title:
      "Stealth BioTherapeutics Announces FDA Accelerated Approval of FORZINITYTM (elamipretide HCl), the First Therapy for Progressive and Life-limiting Ultra-rare Genetic Disease Barth Syndrome",
    link: "https://www.thewesterlysun.com/online_features/press_releases/stealth-biotherapeutics-announces-fda-accelerated-approval-of-forzinity-elamipretide-hcl-the-first-therapy-for-progressive/article_546ed875-97c2-5c1d-b4b2-52a5e357653c.html",
    keywords: null,
    creator: ["By STEALTH BIOTHERAPEUTICS INC."],
    description:
      'NEEDHAM, Mass., Sept. 19, 2025 /PRNewswire/ -- Stealth BioTherapeutics Inc. (the "Company" or "Stealth"), a commercial-stage biotechnology company focused on the discovery, development and commercialization of novel therapies for diseases involving mitochondrial dysfunction, today announced that the U.S. Food and...',
    content: "ONLY AVAILABLE IN PAID PLANS",
    pubDate: "2025-09-20 00:07:00",
    pubDateTZ: "UTC",
    image_url:
      "https://bloximages.newyork1.vip.townnews.com/thewesterlysun.com/content/tncms/assets/v3/editorial/8/49/84936021-82ee-59d0-bf9d-70178c2f46d9/68ce4a804eed4.image.jpg?resize=300%2C118",
    video_url: null,
    source_id: "thewesterlysun",
    source_name: "The Westerly Sun",
    source_priority: 37744,
    source_url: "https://www.thewesterlysun.com",
    source_icon: "https://n.bytvi.com/thewesterlysun.jpg",
    language: "english",
    country: ["united states of america"],
    category: ["top", "science"],
    sentiment: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
    sentiment_stats: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
    ai_tag: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
    ai_region: "ONLY AVAILABLE IN CORPORATE PLANS",
    ai_org: "ONLY AVAILABLE IN CORPORATE PLANS",
    ai_summary: "ONLY AVAILABLE IN PAID PLANS",
    ai_content: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
    duplicate: true,
  },
  {
    article_id: "10c00f57c8b82393e251ec2b21125a62",
    title:
      "Stealth BioTherapeutics Announces FDA Accelerated Approval of FORZINITYTM (elamipretide HCl), the First Therapy for Progressive and Life-limiting Ultra-rare Genetic Disease Barth Syndrome",
    link: "https://www.thepilotnews.com/online_features/press_releases/stealth-biotherapeutics-announces-fda-accelerated-approval-of-forzinity-elamipretide-hcl-the-first-therapy-for-progressive/article_79f2838a-d9c3-5fca-8f6b-864d24fa41b2.html",
    keywords: null,
    creator: ["By STEALTH BIOTHERAPEUTICS INC."],
    description:
      'NEEDHAM, Mass., Sept. 19, 2025 /PRNewswire/ -- Stealth BioTherapeutics Inc. (the "Company" or "Stealth"), a commercial-stage biotechnology company focused on the discovery, development and commercialization of novel therapies for diseases involving mitochondrial dysfunction, today announced that the U.S. Food and...',
    content: "ONLY AVAILABLE IN PAID PLANS",
    pubDate: "2025-09-20 00:07:00",
    pubDateTZ: "UTC",
    image_url:
      "https://bloximages.newyork1.vip.townnews.com/thepilotnews.com/content/tncms/assets/v3/editorial/a/5d/a5d4a0b4-c36d-5f3b-b069-8493baeac813/68ce4bb8c63d1.image.jpg?resize=300%2C118",
    video_url: null,
    source_id: "thepilotnews",
    source_name: "The Pilot News",
    source_priority: 252882,
    source_url: "https://www.thepilotnews.com",
    source_icon: "https://n.bytvi.com/thepilotnews.jpg",
    language: "english",
    country: ["united states of america"],
    category: ["top", "science"],
    sentiment: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
    sentiment_stats: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
    ai_tag: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
    ai_region: "ONLY AVAILABLE IN CORPORATE PLANS",
    ai_org: "ONLY AVAILABLE IN CORPORATE PLANS",
    ai_summary: "ONLY AVAILABLE IN PAID PLANS",
    ai_content: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
    duplicate: true,
  },
  {
    article_id: "4e84224608966c259c491a2312f43a35",
    title:
      "Stealth BioTherapeutics Announces FDA Accelerated Approval of FORZINITYTM (elamipretide HCl), the First Therapy for Progressive and Life-limiting Ultra-rare Genetic Disease Barth Syndrome",
    link: "https://www.prnewswire.com/news-releases/stealth-biotherapeutics-announces-fda-accelerated-approval-of-forzinity-elamipretide-hcl-the-first-therapy-for-progressive-and-life-limiting-ultra-rare-genetic-disease-barth-syndrome-302562058.html",
    keywords: [
      "pharmaceuticals",
      "pha",
      "bio",
      "health care & hospitals",
      "hea",
      "medical pharmaceuticals",
      "biotechnology",
      "mtc",
    ],
    creator: ["Cision PR Newswire"],
    description:
      'NEEDHAM, Mass., Sept. 19, 2025 /PRNewswire/ -- Stealth BioTherapeutics Inc. (the "Company" or "Stealth"), a commercial-stage biotechnology company focused on the discovery, development and commercialization of novel therapies for diseases involving mitochondrial dysfunction, today...',
    content: "ONLY AVAILABLE IN PAID PLANS",
    pubDate: "2025-09-20 00:07:00",
    pubDateTZ: "UTC",
    image_url:
      "https://mma.prnewswire.com/media/2777780/Stealth_BioTherapeutics_Logo.jpg?p=original",
    video_url: null,
    source_id: "cision",
    source_name: "Pr Newswire",
    source_priority: 90496,
    source_url: "https://www.prnewswire.com",
    source_icon: "https://n.bytvi.com/cision.jpg",
    language: "english",
    country: ["united states of america"],
    category: ["top", "science"],
    sentiment: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
    sentiment_stats: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
    ai_tag: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
    ai_region: "ONLY AVAILABLE IN CORPORATE PLANS",
    ai_org: "ONLY AVAILABLE IN CORPORATE PLANS",
    ai_summary: "ONLY AVAILABLE IN PAID PLANS",
    ai_content: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
    duplicate: false,
  },
  {
    article_id: "f9b596393847f8a9361d70884ddadb2a",
    title:
      "Stealth BioTherapeutics Announces FDA Accelerated Approval of FORZINITYTM (elamipretide HCl), the First Therapy for Progressive and Life-limiting Ultra-rare Genetic Disease Barth Syndrome",
    link: "https://www.jdnews.com/online_features/press_releases/stealth-biotherapeutics-announces-fda-accelerated-approval-of-forzinity-elamipretide-hcl-the-first-therapy-for-progressive/article_1b1a1db3-83ea-56fd-816e-d5a7a75126e7.html",
    keywords: null,
    creator: ["By STEALTH BIOTHERAPEUTICS INC."],
    description:
      'NEEDHAM, Mass., Sept. 19, 2025 /PRNewswire/ -- Stealth BioTherapeutics Inc. (the "Company" or "Stealth"), a commercial-stage biotechnology company focused on the discovery, development and commercialization of novel therapies for diseases involving mitochondrial dysfunction, today announced that the U.S. Food and...',
    content: "ONLY AVAILABLE IN PAID PLANS",
    pubDate: "2025-09-20 00:07:00",
    pubDateTZ: "UTC",
    image_url:
      "https://bloximages.chicago2.vip.townnews.com/jdnews.com/content/tncms/assets/v3/editorial/3/97/39770823-dcef-52a0-93ae-eb21d55db3c9/68ce4ce8b0d34.image.jpg?resize=300%2C118",
    video_url: null,
    source_id: "jdnews",
    source_name: "Daily News",
    source_priority: 61763,
    source_url: "https://www.jdnews.com",
    source_icon: "https://n.bytvi.com/jdnews.jpg",
    language: "english",
    country: ["united states of america"],
    category: ["top", "science"],
    sentiment: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
    sentiment_stats: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
    ai_tag: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
    ai_region: "ONLY AVAILABLE IN CORPORATE PLANS",
    ai_org: "ONLY AVAILABLE IN CORPORATE PLANS",
    ai_summary: "ONLY AVAILABLE IN PAID PLANS",
    ai_content: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
    duplicate: true,
  },
  {
    article_id: "a713d94186bbe7f86ed45d809dfdc2c6",
    title:
      "Stealth BioTherapeutics Announces FDA Accelerated Approval of FORZINITYTM (elamipretide HCl), the First Therapy for Progressive and Life-limiting Ultra-rare Genetic Disease Barth Syndrome",
    link: "https://www.wvnews.com/news/around_the_web/partners/pr_newswire/subject/fda_approval/stealth-biotherapeutics-announces-fda-accelerated-approval-of-forzinity-elamipretide-hcl-the-first-therapy-for-progressive/article_60c365d7-31d6-5d1a-8d0b-cf99f7e6eee6.html",
    keywords: [
      "health sciences",
      "expanded access",
      "medical specialties",
      "indication (medicine)",
      "priority review",
      "food and drug administration",
      "pharmacology",
      "health",
      "barth syndrome",
      "health care",
      "clinical medicine",
      "diseases and disorders",
      "medicine",
      "drugs",
    ],
    creator: ["By STEALTH BIOTHERAPEUTICS INC."],
    description:
      'NEEDHAM, Mass., Sept. 19, 2025 /PRNewswire/ -- Stealth BioTherapeutics Inc. (the "Company" or "Stealth"), a commercial-stage biotechnology company focused on the discovery, development and commercialization of novel therapies for diseases involving mitochondrial dysfunction, today announced that the U.S. Food and...',
    content: "ONLY AVAILABLE IN PAID PLANS",
    pubDate: "2025-09-20 00:07:00",
    pubDateTZ: "UTC",
    image_url:
      "https://bloximages.chicago2.vip.townnews.com/wvnews.com/content/tncms/assets/v3/editorial/c/7f/c7f294e6-5d46-57da-bc8b-df5ec0d84068/68cdf2ca235f2.image.jpg?resize=300%2C118",
    video_url: null,
    source_id: "wvnews",
    source_name: "Wv News",
    source_priority: 827114,
    source_url: "https://www.wvnews.com",
    source_icon: "https://n.bytvi.com/wvnews.jpg",
    language: "english",
    country: ["united states of america"],
    category: ["top", "science"],
    sentiment: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
    sentiment_stats: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
    ai_tag: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
    ai_region: "ONLY AVAILABLE IN CORPORATE PLANS",
    ai_org: "ONLY AVAILABLE IN CORPORATE PLANS",
    ai_summary: "ONLY AVAILABLE IN PAID PLANS",
    ai_content: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
    duplicate: true,
  },
];