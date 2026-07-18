import { useMemo } from "react";
import { calculateReadingTime } from "../utils/calculateReadingTime";

const useReadingTime = (content) => {
  return useMemo(() => calculateReadingTime(content), [content]);
};

export default useReadingTime;