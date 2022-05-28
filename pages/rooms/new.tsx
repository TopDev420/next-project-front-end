import AccommodateSelect from 'components/pages/rooms/new/AccommodateSelect';
import LocationSelect from 'components/LocationSelect';
import PropertyTypeSelect from 'components/pages/rooms/new/PropertyTypeSelect';
import React, { useState, useEffect, useCallback } from 'react';
import { LocationSelectValue } from 'types/models/Location';
import { useDispatch, useSelector } from 'react-redux';
import { currentUserSelector } from 'lib/store/selectors/user';
import { presentModal } from 'lib/store/slices/ui';
import Alert from 'components/Alert';
import propertyTypes from 'static/property-type.json';
import { useMutation } from 'react-query';
import { createProperty } from 'lib/apis/property';
import LoadingIndicator from 'components/LoadingIndicator';
import { useRouter } from 'next/router';
import Panels from 'components/pages/rooms/new/Panels';
import RoomsInput from 'components/pages/rooms/new/RoomsInput';

const ListYourHome: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(currentUserSelector);
  const [propertyTypeId, setPropertyTypeId] = useState<number>();
  const [guests, setGuests] = useState<number>(1);
  const [rooms, setRooms] = useState<number>();
  const [address, setAddress] = useState<LocationSelectValue>();
  const [invalidFeedback, setInvalidFeedback] = useState<string>();

  const { reset, mutate, data, isError, error, isLoading } =
    useMutation(createProperty);

  const onSubmit = useCallback(() => {
    if (!propertyTypeId) {
      setInvalidFeedback('Please select home type');
      return;
    }
    if (!guests) {
      setInvalidFeedback('Please select maximum number of guests');
      return;
    }
    if (!address) {
      setInvalidFeedback('Please select a location');
      return;
    }
    const roomsNumber = parseInt(String(rooms || '1'), 10);
    if (Number.isNaN(roomsNumber) || roomsNumber < 1) {
      setInvalidFeedback('Invalid number of rooms');
      return;
    }

    setInvalidFeedback('');

    mutate({
      propertyTypeId,
      guests,
      rooms: roomsNumber,
      ...address,
    });
  }, [address, guests, mutate, rooms, propertyTypeId]);

  useEffect(() => {
    if (!user) {
      dispatch(
        presentModal({
          type: 'signup',
          exclusive: true,
          props: {
            severity: 'warn',
            title: 'Please create an account to list your home',
          },
        }),
      );
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (data) {
      router.push(`/my-page/property/${data.id}`);
    }
  }, [data, router]);

  useEffect(() => () => reset(), [reset]);

  return (
    <div className="container mx-auto px-6">
      <form method="POST">
        <div className="text-center border-b border-gray-200 mb-12">
          <h1 className="mt-12 text-3xl">List your Home</h1>
          <p className="my-6">
            Vacation.Rentals lets you make money renting out your place.
          </p>
        </div>
        <div className="shadow mb-6 p-6 md:p-8 max-w-3xl mx-auto">
          {!user && (
            <Alert
              severity="warn"
              title="Create an account and list your home"
            />
          )}
          {isError && (
            <Alert
              severity="danger"
              title="There was an error"
              message={(error as any)?.message}
            />
          )}
          <h2 className="text-2xl text-blue-900">Home Type</h2>
          <PropertyTypeSelect
            propertyTypes={propertyTypes}
            value={propertyTypeId}
            onChange={setPropertyTypeId}
          />
          <h2 className="text-2xl text-blue-900">
            Are you listing multiple rooms of the same type?
          </h2>
          <RoomsInput value={rooms} onChange={setRooms} />
          <h2 className="text-2xl text-blue-900 pt-4">
            Maxium Number of Guests Allowed in Each Room
          </h2>
          <AccommodateSelect
            value={guests}
            /*
            // @ts-ignore */
            onChange={setGuests}
          />
          <h2 className="text-2xl text-blue-900 pt-4">Location</h2>
          <LocationSelect value={address} onChange={setAddress} />
          {!!invalidFeedback && (
            <div className="mt-3 text-red-600">{invalidFeedback}</div>
          )}
          {!!user && (
            <div className="flex justify-center md:justify-end mt-6">
              <button
                type="button"
                disabled={isLoading}
                className="bg-blue-900 text-white w-full md:w-auto hover:bg-blue-800 focus:bg-blue-500 rounded px-8 py-4"
                onClick={onSubmit}
              >
                {isLoading && <LoadingIndicator left light />}
                Continue
              </button>
            </div>
          )}
        </div>
      </form>
      <div className="max-w-5xl mx-auto">
        <Panels />
      </div>
    </div>
  );
};

export default ListYourHome;
