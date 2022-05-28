import React, { useContext } from 'react';
import Amenities from 'components/pages/rooms/[id]/Info/About/Accordion/Amenities';
import Description from 'components/pages/rooms/[id]/Info/About/Accordion/Description';
import { PropertyContext } from 'components/pages/rooms/[id]/PropertyProvider';
import { getDescriptionTree } from 'lib/transformers/property';
import AccordionItem from 'components/pages/rooms/[id]/Info/About/Accordion/AccordionItem';

const Accordion = () => {
  const property = useContext(PropertyContext);
  const descriptionTree = getDescriptionTree(property);
  return (
    <div className="p-4 bg-white shadow-lg border mt-6">
      <AccordionItem title="Amenities">
        <Amenities />
      </AccordionItem>
      {descriptionTree.map(({ title, html }) => (
        <AccordionItem key={title} title={title}>
          <Description html={html} />
        </AccordionItem>
      ))}
    </div>
  );
};

export default Accordion;
