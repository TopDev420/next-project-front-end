import React from 'react';
import useIsMobile from 'lib/hooks/ui/useIsMobile';
import Small from 'components/pages/home/Featured/Small';
import Large from 'components/pages/home/Featured/Large';
import { HomePagePropertyResource } from 'types/resources/Property';

const Featured: React.FC<{ properties: HomePagePropertyResource[] }> = ({
  properties,
}) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <Small properties={properties} />;
  }

  return <Large properties={properties} />;
};

export default Featured;
