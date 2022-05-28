/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import {
  useElements,
  useStripe,
  CardElement,
  Elements,
} from '@stripe/react-stripe-js';
import { loadStripe, PaymentMethodResult } from '@stripe/stripe-js';
import config from 'config';
import useOptions from 'components/pages/my-page/property/Publish/CardForm/useOptions';

type CardFormProps = {
  id: string;
  onChange?: (payload: PaymentMethodResult) => void;
};

const stripePromise = loadStripe(config.STRIPE_PUBLISHABLE_KEY);

const CardForm: React.FC<CardFormProps> = ({ id, onChange = () => {} }) => {
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const payload = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    onChange(payload);
  };

  return (
    <form className="flex flex-col" id={id} onSubmit={handleSubmit}>
      <h3 className=" mb-4">Card details</h3>
      <div className="border border-black p-3">
        <CardElement options={options} />
      </div>
    </form>
  );
};

const Container: React.FC<CardFormProps> = (props) => (
  <Elements stripe={stripePromise}>
    <CardForm {...props} />
  </Elements>
);

export default Container;
