import { useState, useMemo, useEffect } from "react";

function useMediaQuery(query: string) {
  if(typeof window !== 'undefined') {
    const mediaQuery = useMemo(() => window.matchMedia(query), [query]);
    const [match, setMatch] = useState(mediaQuery.matches);
  
    useEffect(() => {
      const onChange = () => setMatch(mediaQuery.matches);
      mediaQuery.addEventListener("change", onChange);
  
      return () => mediaQuery.removeEventListener("change", onChange);
    }, [mediaQuery]);
  
    return match;
  }
}

export default useMediaQuery;