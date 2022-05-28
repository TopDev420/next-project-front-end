import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  GuestReservationInput,
  GuestReservationSchema,
} from 'lib/forms/reservation';
import * as reservationApi from 'lib/apis/reservation';
import { currentUserSelector } from 'lib/store/selectors/user';
import { ErrorProvider } from 'components/Error/Provider';
import Actions from 'components/pages/rooms/[id]/Booking/Actions';
import DateRangePicker from 'components/pages/rooms/[id]/Booking/DateRangePicker';
import { FormProvider } from 'components/pages/rooms/[id]/Booking/FormProvider';
import Guests from 'components/pages/rooms/[id]/Booking/Guests';
import Rooms from 'components/pages/rooms/[id]/Booking/Rooms';
import { PropertyContext } from 'components/pages/rooms/[id]/PropertyProvider';
import Confirm from 'components/pages/rooms/[id]/Booking/Confirm';

const Booking = () => {
  const user = useSelector(currentUserSelector);
  const property = useContext(PropertyContext);

  const [serverError, setServerError] = useState<any>();
  const [showConfirm, setShowConfirm] = useState(false);

  const defaultValues: Partial<GuestReservationInput> = useMemo(
    () => ({
      propertyId: property?.id!,
      checkedInAt: undefined,
      checkedOutAt: undefined,
      guests: 1,
      roomsRequested: 1,
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      address: user?.address || '',
      phone: user?.phone || '',
    }),
    [property, user],
  );

  const form = useForm<GuestReservationInput>({
    resolver: yupResolver(GuestReservationSchema),
    defaultValues,
  });

  const [loading, setLoading] = useState(false);

  const {
    mutate: calculate,
    error: calcError,
    data: calculation,
    reset: resetCalc,
  } = useMutation(reservationApi.calculate);

  const checkOutMutation = useMutation(reservationApi.guestReservation);

  const { reset: resetCheckOut } = checkOutMutation;

  const { reset: resetForm } = form;

  const onSubmitCalc: SubmitHandler<GuestReservationInput> = useCallback(
    (input) => {
      setLoading(true);
      calculate(input);
    },
    [calculate],
  );

  const onSubmitCheckOut: SubmitHandler<GuestReservationInput> = useCallback(
    (input) => checkOutMutation.mutate(input),
    [checkOutMutation],
  );

  const handleCalculate = useCallback(() => {
    form.handleSubmit(onSubmitCalc)();
  }, [form, onSubmitCalc]);

  const handleCheckOut = useCallback(() => {
    form.handleSubmit(onSubmitCheckOut)();
  }, [form, onSubmitCheckOut]);

  useEffect(() => {
    setServerError(calcError);
  }, [calcError]);

  useEffect(() => {
    setServerError(checkOutMutation.error);
  }, [checkOutMutation.error]);

  useEffect(() => {
    if (calculation) {
      setShowConfirm(true);
    }
    setLoading(false);
  }, [calculation]);

  useEffect(() => {
    if (!showConfirm) {
      resetCalc();
      resetCheckOut();
    }
  }, [resetCheckOut, resetCalc, showConfirm]);

  useEffect(
    () => () => {
      resetCalc();
    },
    [resetCalc],
  );

  useEffect(() => {
    resetForm(defaultValues);
  }, [resetForm, defaultValues]);

  return (
    <FormProvider form={form}>
      <ErrorProvider client={form.formState.errors} server={serverError}>
        <input type="hidden" {...form.register('propertyId')} />
        <div className="lg:ml-4 bg-white border shadow-lg">
          <div className="p-6">
            <DateRangePicker />
            <Guests />
            <Rooms />
            <Actions isLoading={loading} onCalculate={handleCalculate} />
          </div>
        </div>
        <Confirm
          open={showConfirm}
          onClose={() => setShowConfirm(false)}
          data={calculation}
          input={form.getValues()}
          onCheckOut={handleCheckOut}
          mutation={checkOutMutation}
        />
      </ErrorProvider>
    </FormProvider>
  );
};

export default Booking;
