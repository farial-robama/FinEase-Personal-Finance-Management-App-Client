import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `FinEase | ${title}`;
  }, [title]);
};

export default useTitle;