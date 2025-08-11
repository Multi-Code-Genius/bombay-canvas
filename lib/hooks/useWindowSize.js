import { useEffect, useState } from "react";

function useWindowSize() {
  const isClient = typeof window === "object";

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }
    function handleResize() {
      setWindowSize(getSize());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}

export const withWindowSize = (Component) => {
  function Wrapper(props) {
    const data = useWindowSize();
    return <Component {...props} {...data} />;
  }
  Wrapper.getInitialProps = async (ctx) => {
    const pageProps =
      Component.getInitialProps && (await Component.getInitialProps(ctx));
    return { ...pageProps };
  };
  return Wrapper;
};
export default useWindowSize;
