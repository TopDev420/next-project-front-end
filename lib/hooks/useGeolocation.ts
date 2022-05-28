import { useCallback, useEffect, useState } from 'react';

const useGeolocation = (enabled?: boolean) => {
  const [state, setState] = useState<{
    loading: boolean;
    position: GeolocationPosition | undefined;
    error: GeolocationPositionError | undefined;
  }>({
    loading: true,
    position: undefined,
    error: undefined,
  });

  const getCurrentPosition = useCallback(() => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setState((old) => ({ ...old, loading: false }));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState((old) => ({ ...old, loading: false, position }));
      },
      (error) => {
        setState((old) => ({ ...old, loading: false, error }));
      },
    );
  }, []);

  useEffect(() => {
    if (enabled) {
      getCurrentPosition();
    }
  }, [getCurrentPosition, enabled]);

  return state;
};

export default useGeolocation;
