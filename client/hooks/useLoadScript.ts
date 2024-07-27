import { useEffect, useState } from 'react';

const useLoadScript = (src:string, prefix:string) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if(document.querySelector(`script[src*="${prefix}"]`)) return
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      setScriptLoaded(true);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [src]);

  return scriptLoaded;
};

export default useLoadScript;
