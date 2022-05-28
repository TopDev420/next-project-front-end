/* eslint-disable no-param-reassign */
import { normalizeHash } from 'lib/helpers/url';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const useHash = () => {
  const [hash, setHash] = useState(() => {
    if (typeof window === 'undefined') {
      return '';
    }
    return normalizeHash(window.location.hash);
  });
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const oldHash = normalizeHash(window.location.hash);
    if (oldHash !== hash) {
      window.location.hash = hash;
    }
  }, [hash]);

  useEffect(() => {
    const handleHashChange = (newHash: string) => {
      newHash = normalizeHash(newHash);
      setHash((oldHash) => {
        if (oldHash === newHash) {
          return oldHash;
        }

        return newHash;
      });
    };
    router.events.on('hashChangeStart', handleHashChange);

    return () => {
      router.events.off('hashChangeStart', handleHashChange);
    };
  }, [router]);

  return [hash, setHash] as const;
};

export default useHash;
