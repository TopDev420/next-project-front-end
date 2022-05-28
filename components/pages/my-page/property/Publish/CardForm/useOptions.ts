import { useMemo } from 'react';
import useResponsiveFontSize from 'components/pages/my-page/property/Publish/CardForm/useResponsiveFont';
import theme from 'constants/theme';

const useOptions = () => {
  const fontSize = useResponsiveFontSize();
  const options = useMemo(
    () => ({
      hidePostalCode: true,
      style: {
        base: {
          fontSize,
          color: theme.colors?.gray[600],
          letterSpacing: '0.025em',
          fontFamily: theme.fontFamily?.sans?.[0],
          '::placeholder': {
            color: theme.colors?.gray[400],
          },
        },
        invalid: {
          color: theme.colors?.red[600],
        },
      },
    }),
    [fontSize],
  );

  return options;
};

export default useOptions;
