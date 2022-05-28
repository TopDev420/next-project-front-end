import React from 'react';
import {
  ContainerProps,
  EventModelType,
} from 'components/pages/my-page/property/Availibility/EventModal/type';
import Layout from 'components/pages/my-page/property/Availibility/EventModal/layout';
import { getEventInputModelType } from 'lib/apis/event';

const getLayoutFromModelType = (modelType: EventModelType) =>
  Layout.find((layout) => layout.modelType === modelType);

const EditContainer: React.FC<ContainerProps<EventModelType>> = ({
  value,
  onClose = () => {},
}) => {
  const modelType = getEventInputModelType(value);
  const layout = getLayoutFromModelType(modelType);
  const Component = layout?.component;
  if (!Component) {
    return null;
  }

  return (
    <div>
      <div className="flex flex-row justify-between text-white mb-4 p-4 bg-blue-700">
        <h2>{layout.title}</h2>
        <button
          className="text-3xl outline-none"
          type="button"
          onClick={onClose}
        >
          &times;
        </button>
      </div>

      <div className="p-4">
        <Component value={value as any} onClose={onClose} />
      </div>
    </div>
  );
};

export default EditContainer;
