import { useState, useCallback } from "react";

const useValue = (initialValue = "false") => {
  const [value, setValue] = useState(initialValue);
  const handler = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  return [value, setValue, handler];
};
export default useValue;
