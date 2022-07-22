import { useState, useCallback } from "react";

const useHover = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);
  const onMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);
  const onMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return [value, onMouseLeave, onMouseEnter, setValue];
};
export default useHover;
