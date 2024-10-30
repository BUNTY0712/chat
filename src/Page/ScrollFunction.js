// Define the function and export it
export const ScrollFunction = (containerRef) => {
  if (containerRef.current) {
    containerRef.current.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }
};
