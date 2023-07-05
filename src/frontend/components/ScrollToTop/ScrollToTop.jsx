import { useFeedContext } from "../../contexts";
import "./ScrollToTop.css";
export const ScrollToTop = () => {
  const { dispatch } = useFeedContext();
  const scrollToTopHandler = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      dispatch({ type: "RESET_INFINITE_POST" });
    }, 1000);
  };
  return (
    <div onClick={scrollToTopHandler} className="scroll-to-top">
      <span>
        <span className="arrow">{">"}</span>Scroll To Top
      </span>
    </div>
  );
};
