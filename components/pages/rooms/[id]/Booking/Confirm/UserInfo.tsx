import { useContext } from 'react';
import { FormContext } from 'components/pages/rooms/[id]/Booking/FormProvider';
import InvalidFeedback from 'components/Error/InvalidFeedback';
import { GuestReservationInput } from 'lib/forms/reservation';

const UserInfo = () => {
  const { register } = useContext(FormContext);

  const renderInput = (
    name: keyof GuestReservationInput,
    label: string,
    containerClass: string = '',
  ) => (
    <div className={`userInfo__group ${containerClass}`}>
      <label className="userInfo__label" htmlFor={`input_${name}`}>
        {label}
      </label>
      <input
        id={`input_${name}`}
        required
        className="userInfo__input"
        {...register(name)}
      />
      <InvalidFeedback name={name} />
    </div>
  );

  return (
    <div className="userInfo">
      <div className="userInfo__group">
        <div className="userInfo__row">
          {renderInput('firstName', 'First Name')}
          {renderInput('lastName', 'Last Name')}
        </div>
        <div className="userInfo__row">
          {renderInput('email', 'Email')}
          {renderInput('phone', 'Phone Number')}
        </div>
        <div className="userInfo__row">
          {renderInput('address', 'Address', 'col-span-2')}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
