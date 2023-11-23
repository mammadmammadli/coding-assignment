import { useEffect } from "react";
import useScrollDirection from "./useScrollDirection";

const useFetchMoviesOnScroll = (handler, condition) => {
  const scrollDirection = useScrollDirection();

  const scrollHandler = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (
      scrollTop + clientHeight >= scrollHeight &&
      scrollDirection === "down"
      && condition
    ) {
      handler();
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [scrollDirection, condition]);
}

export default useFetchMoviesOnScroll;