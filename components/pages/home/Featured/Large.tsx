import React from 'react';
import Slider from 'react-slick';
import Item from 'components/pages/home/Featured/Item';
import { splitAt } from 'lib/helpers/array';
import { HomePagePropertyResource } from 'types/resources/Property';

const Large: React.FC<{ properties: HomePagePropertyResource[] }> = ({
  properties,
}) => {
  const [propsTop, propsBottom] = splitAt(
    properties,
    properties.length > 4 ? 2 : 0,
  );

  const [firstTop, secondTop] = propsTop;

  return (
    <div className="listing">
      {propsTop.length > 1 && (
        <div className="listing__top">
          <Item data={firstTop} />
          <div className="flex flex-col justify-end col-span-2">
            <div className="h-80">
              <Item data={secondTop} />
            </div>
          </div>
        </div>
      )}
      {propsBottom.length > 0 && (
        <div className="listing--bottom">
          <Slider arrows autoplay={false} slidesToScroll={1} slidesToShow={4}>
            {propsBottom.map((property) => (
              <Item key={property.id} data={property} />
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default Large;
