import React, { useState, useEffect } from 'react';
import Modal from 'components/Modal';
import _ from 'lodash';
import EditContainer from 'components/pages/my-page/property/Availibility/EventModal/EditContainer';
import CreateContainer from 'components/pages/my-page/property/Availibility/EventModal/CreateContainer';
import {
  EventInputType,
  EventModelType,
} from 'components/pages/my-page/property/Availibility/EventModal/type';

type EventModalProps<T extends EventModelType = EventModelType> = {
  value?: EventInputType<T>;
  onChange?: (input?: EventInputType<T>) => void;
};

const EventModal: React.FC<EventModalProps> = ({
  value,
  onChange = () => {},
}) => {
  const [open, setOpen] = useState(false);
  const Container = value?.id ? EditContainer : CreateContainer;

  useEffect(() => {
    if (!!value) {
      setOpen(true);
    }
  }, [value]);

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
        onChange();
      }}
      containerClass="sm:max-w-3xl"
    >
      <Container
        onClose={() => setOpen(false)}
        value={value}
        onChange={onChange}
      />
    </Modal>
  );
};

export default EventModal;
