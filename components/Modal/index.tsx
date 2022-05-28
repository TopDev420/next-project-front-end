import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';

export type ModalProps = {
  open?: boolean;
  onClose?: () => void;
  onAnimationEnd?: () => void;
  containerClass?: string;
};

const Modal: React.FC<ModalProps> = ({
  open = false,
  onClose = () => {},
  onAnimationEnd = () => {},
  containerClass = '',
  children,
}) => (
  <Transition.Root show={open} as={Fragment}>
    <Dialog
      as="div"
      className="fixed z-50 inset-0 overflow-y-auto text-center"
      onClose={onClose}
      onAnimationEnd={onAnimationEnd}
    >
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </Transition.Child>

      {/* This element is to trick the browser into centering the modal contents. */}
      <span
        className="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
      >
        &#8203;
      </span>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enterTo="opacity-100 translate-y-0 sm:scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      >
        <div
          className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl w-full ${containerClass}`}
        >
          {children}
        </div>
      </Transition.Child>
    </Dialog>
  </Transition.Root>
);

export default Modal;
