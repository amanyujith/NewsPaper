import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const toTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div>
      {isVisible && (
        <button
          onClick={toTop}
          className="fixed bottom-4 right-4 p-3 rounded-full bg-slate-100 text-black shadow-md font-extrabold text-2xl hover:bg-slate-200   transition duration-300 "
        >
          <ChevronUp />
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;
