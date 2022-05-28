import React, { useCallback, useEffect, useState } from 'react';
import { DiscountInput, DiscountSchema } from 'lib/forms/discount';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Modal from 'components/Modal';
import { ErrorProvider } from 'components/Error/Provider';
import InvalidFeedback from 'components/Error/InvalidFeedback';
import DiscountTypes from 'static/discount-type.json';
import Modifiers from 'static/modifier.json';

type DiscountModalProps = {
  value?: DiscountInput;
  onChange: (value?: DiscountInput) => void;
};

const DiscountModal: React.FC<DiscountModalProps> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useForm<DiscountInput>({
    resolver: yupResolver(DiscountSchema),
    defaultValues: value,
  });

  const onSubmit: SubmitHandler<DiscountInput> = useCallback(
    (input) => {
      setOpen(false);
      onChange(input);
    },
    [onChange],
  );

  useEffect(() => {
    if (value) {
      setOpen(true);
    }
  }, [value]);

  useEffect(() => {
    resetForm(value);
  }, [value, resetForm]);

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
        onChange();
      }}
    >
      <ErrorProvider client={errors}>
        <div className="p-6 bg-blue-900">
          <h2 className="text-white">Discount</h2>
        </div>
        <input type="hidden" {...register('id')} />
        <input type="hidden" {...register('propertyId')} />
        <div className="p-6">
          <div className="flex flex-col">
            <div className="flex flex-row flex-wrap">
              <div className="flex-1 flex flex-col mr-4 mb-4">
                <label className="mb-2" htmlFor="inputDiscountName">
                  Discount name
                </label>
                <input
                  className="border p-2 outline-none"
                  id="inputDiscountName"
                  placeholder="Enter discount name"
                  {...register('name')}
                />
                <InvalidFeedback name="name" />
              </div>
              <div className="flex-1 flex flex-col mb-4">
                <label htmlFor="selectDiscountTypeId" className="mb-2">
                  Discount type
                </label>
                <Controller
                  name="discountTypeId"
                  control={control}
                  render={({ field }) => (
                    <select
                      id="selectDiscountTypeId"
                      className="p-2 border"
                      value={field.value}
                      onChange={field.onChange}
                    >
                      {DiscountTypes.map((discountType) => (
                        <option key={discountType.id} value={discountType.id}>
                          {discountType.name}
                        </option>
                      ))}
                    </select>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-row flex-wrap -mr-4">
              <div className="flex flex-1 flex-col mr-4 mb-4">
                <label className="mb-2" htmlFor="inputDiscountAmount">
                  Enter charge amount
                </label>
                <div className="flex flex-row">
                  <select
                    className="border p-2 outline-none"
                    {...register('modifierId')}
                  >
                    {Modifiers.map((modifier) => (
                      <option key={modifier.id} value={modifier.id}>
                        {modifier.name}
                      </option>
                    ))}
                  </select>
                  <input
                    id="inputDiscountAmount"
                    className="border p-2 outline-none"
                    type="number"
                    {...register('amount')}
                  />
                </div>
                <InvalidFeedback name="amount" />
              </div>
              <div className="flex flex-1 flex-col mr-4 mb-4">
                <label className="mb-2" htmlFor="inputPeriod">
                  Days Before/After
                </label>
                <input
                  type="number"
                  id="inputPeriod"
                  className="p-2 border"
                  {...register('period')}
                />
              </div>
            </div>
          </div>
        </div>
      </ErrorProvider>
      <div className="text-right p-4">
        <button
          className="btn btn-dark mr-2"
          type="button"
          onClick={() => setOpen(false)}
        >
          Cancel
        </button>
        <button
          className="btn btn-primary"
          type="button"
          onClick={handleSubmit(onSubmit)}
        >
          Save
        </button>
      </div>
    </Modal>
  );
};

export default DiscountModal;
