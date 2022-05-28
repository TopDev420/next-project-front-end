import { useMemo } from 'react';
import theme from 'constants/theme';
import useWindowSize from 'lib/hooks/ui/useWindowSize';

export default function useResponsiveFontSize() {
  const { width } = useWindowSize();
  const fontSize = useMemo(() => {
    if (width > 450) {
      return theme.fontSize.base[0];
    }

    return theme.fontSize.sm[0];
  }, [width]);

  return fontSize;
}
