import React, { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import _ from 'lodash';
import Layout from 'components/pages/my-page/property/Availibility/EventModal/layout';
import {
  ContainerProps,
  EventModelType,
} from 'components/pages/my-page/property/Availibility/EventModal/type';
import {
  ensureEventInputModelType,
  getEventInputModelType,
} from 'lib/apis/event';
import { useSelector } from 'react-redux';
import { myPagePropertyRoomIdSelector } from 'lib/store/selectors/my-page/room';
import { classNames } from 'lib/helpers/ui';

const getTabIndexFromModelType = (modelType: EventModelType) =>
  Layout.findIndex((layout) => layout.modelType === modelType);

const CreateContainer: React.FC<ContainerProps<EventModelType>> = ({
  value,
  onChange = () => {},
  onClose = () => {},
}) => {
  const [model, setModel] = useState(value);
  const roomId = useSelector(myPagePropertyRoomIdSelector);

  const [modelType, setModelType] = useState<EventModelType>(
    getEventInputModelType(model),
  );

  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(
    getTabIndexFromModelType(modelType),
  );

  const { component: PanelContent } = Layout[selectedTabIndex];

  useEffect(() => {
    setModelType(Layout[selectedTabIndex].modelType);
  }, [selectedTabIndex]);

  useEffect(() => {
    setModel((old) => {
      if (!old) {
        return old;
      }

      return ensureEventInputModelType(
        old,
        modelType,
        roomId ? [roomId] : undefined,
      );
    });
  }, [modelType, roomId]);

  return (
    <div className="w-full">
      <Tab.Group manual onChange={setSelectedTabIndex}>
        <Tab.List className="flex p-1 space-x-1 bg-blue-700 rounded-lg">
          {_.map(Layout, ({ title }, key) => (
            <Tab
              key={key}
              className={classNames(
                'w-full py-2.5 text-sm leading-5 font-medium text-blue-200 rounded-lg focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                key === selectedTabIndex
                  ? 'bg-white shadow text-blue-800'
                  : 'text-blue-100 hover:bg-blue-800 hover:text-white',
                !!roomId && title === 'Seasonal Price' ? 'hidden' : '',
              )}
            >
              {title}
            </Tab>
          ))}
        </Tab.List>
      </Tab.Group>
      <div className="p-4">
        <PanelContent
          value={model as any}
          /*
          // @ts-ignore */
          onChange={onChange}
          onClose={onClose}
        />
      </div>
    </div>
  );
};

export default CreateContainer;
