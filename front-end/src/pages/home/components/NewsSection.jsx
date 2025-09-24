import React, { useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function NewsSection({ data = [], isLoading, isError }) {
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
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
  };

  const rightArrowClick = () => {
    if (!cardRef.current) return;
    const cardWidth = cardRef.current.offsetWidth + 20;
    scrollContainerRef.current.scrollBy({
      left: cardWidth,
      behavior: "smooth",
    });
  };
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
    const walk = (x - startX) * 2;
    const scroll = () => {
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    };
    animationRef.current = requestAnimationFrame(scroll);
  };

  const endDrag = () => {
    setIsDragging(false);
    if (scrollContainerRef.current)
      scrollContainerRef.current.style.cursor = "grab";
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
  };

  return (
    <section className="w-full my-16 relative">
      <h3 className="text-2xl sm:text-3xl font-bold text-start my-8 ms-2 sm:ms-8">
        Latest News
      </h3>
      {!isLoading && !isError && (
        <>
          <div
            className="relative w-full overflow-x-auto scrollbar-hide cursor-grab space-x-5 pb-5"
            onMouseDown={startDrag}
            onMouseLeave={endDrag}
            onMouseUp={endDrag}
            onMouseMove={duringDrag}
            ref={scrollContainerRef}
          >
            <div className="flex w-full overflow-visible px-2 sm:px-8 space-x-5">
              {data.map((article, index) =>
                index === 0 ? (
                  <NewsCard article={article} ref={cardRef} key={index} />
                ) : (
                  <NewsCard article={article} key={index} />
                )
              )}
            </div>
          </div>
          <button
            onClick={rightArrowClick}
            className="hidden sm:flex absolute top-1/2 right-6 transform -translate-y-1/2 size-12 md:size-14 bg-gray-300 opacity-50 
            items-center justify-center text-white text-xs rounded-full hover:opacity-100 transition-opacity"
          >
            <IoIosArrowForward className="text-2xl text-black" />
          </button>
          <button
            onClick={leftArrowClick}
            className="hidden sm:flex absolute top-1/2 left-6 transform -translate-y-1/2 size-12 md:size-14 bg-gray-300 opacity-50 
            items-center justify-center text-white text-xs rounded-full hover:opacity-100 transition-opacity"
          >
            <IoIosArrowBack className="text-2xl text-black" />
          </button>
        </>
      )}
    </section>
  );
}

const NewsCard = React.forwardRef(({ article }, ref) => (
  <div
    ref={ref}
    className="flex-shrink-0 h-[28vh] w-[90vw] sm:w-[60vw] md:w-[35vw] lg:w-[25vw] xl:w-[20vw] flex flex-col 
      rounded-2xl overflow-hidden border-gray-200 border bg-white"
  >
    {article.image_url && (
      <img
        className="h-[50%] w-full object-cover pointer-events-none select-none"
        src={article.image_url}
        alt={article.title}
      />
    )}
    <div className="flex-1 flex flex-col p-3">
      <h4
        onClick={() => window.open(article.link, "_blank")}
        className="mt-2 text-sm md:text-base font-semibold hover:text-blue-600 cursor-pointer 
          line-clamp-1 sm:line-clamp-2"
      >
        {article.title.length > 120
          ? article.title.slice(0, 117) + "..."
          : article.title}
      </h4>
      <div className="text-xs text-gray-600 mt-1 line-clamp-3">
        {article.description}
      </div>
    </div>
  </div>
));

export default NewsSection;
