import { useState, useLayoutEffect } from "react";

// https://tailwindcss.com/docs/responsive-design
const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export const useMediaQuery = () => {
  const [screenSize, setScreenSize] = useState<keyof typeof breakpoints>("xs");

  useLayoutEffect(() => {
    const handleResize = () => {
      Object.entries(breakpoints).forEach(([key, value]) => {
        window.innerWidth >= value &&
          setScreenSize(key as keyof typeof breakpoints);
      });
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { screenSize, isMobile: ["xs", "sm"].includes(screenSize) };
};
