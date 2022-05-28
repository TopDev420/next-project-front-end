import useWindowSize from 'lib/hooks/ui/useWindowSize';
import theme from 'constants/theme';

const useIsMobile = () => {
  const { width } = useWindowSize();

  const isMobile = width && width < parseInt(theme.screens?.md || '768', 10);

  return isMobile;
};

export default useIsMobile;
