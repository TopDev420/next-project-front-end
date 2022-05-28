import { useContext } from 'react';
import { PropertyContext } from 'components/pages/rooms/[id]/PropertyProvider';
import * as propertyTransformer from 'lib/transformers/property';

const Amenities = () => {
  const property = useContext(PropertyContext);
  const tree = propertyTransformer.getAmenityCategoryTree(
    property?.amenitiesIds,
  );

  return (
    <div className="p-6 flex flex-col">
      {tree.map(({ category, amenities }) => (
        <div className="mb-4" key={category.id}>
          <h4 className="mb-2 font-bold underline text-blue-900">
            {category.name}
          </h4>
          <ul className="grid grid-cols-2 lg:grid-cols-3 gap-2">
            {amenities.map((amenity) => (
              <li className="text-sm" key={amenity.id}>
                {amenity.name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Amenities;
