import { useEffect } from 'react';

const usePersist = () => {
  let persist = false;
  let storageData: string | null = null;

  if (typeof window !== 'undefined') {
    storageData = localStorage.getItem('persist');

    if (storageData) {
      persist = !!JSON.parse(storageData);
    }
  }

  useEffect(() => {
    localStorage.setItem('persist', JSON.stringify(persist));
  }, [persist]);

  return persist;
};

export default usePersist;
