import React, { useCallback, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { ChargeInput, ChargeSchema } from 'lib/forms/charge';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Modal from 'components/Modal';
import { ErrorProvider } from 'components/Error/Provider';
import Modifiers from 'static/modifier.json';
import Multipliers from 'static/multiplier.json';
import InvalidFeedback from 'components/Error/InvalidFeedback';

type ChargeModalProps = {
  value?: ChargeInput;
  onChange: (value?: ChargeInput) => void;
};

const ChargeModal: React.FC<ChargeModalProps> = ({
  value,
  onChange = () => {},
}) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChargeInput>({
    resolver: yupResolver(ChargeSchema),
    defaultValues: value,
  });

  const onSubmit: SubmitHandler<ChargeInput> = useCallback(
    (input) => {
      onChange(input);
    },
    [onChange],
  );

  useEffect(() => {
    reset(value);
  }, [value, reset]);

  return (
    <Modal
      open={!!value}
      onClose={() => onChange()}
      containerClass="sm:max-w-3xl"
    >
      <ErrorProvider client={errors}>
        <div className="p-6 bg-blue-900">
          <h2 className="text-white">Additional Charge</h2>
        </div>
        <input type="hidden" {...register('propertyId')} />
        <input type="hidden" {...register('id')} />
        <div className="p-6">
          <div className="flex flex-col">
            <div className="flex flex-row flex-wrap -mr-4">
              <div className="flex-auto flex flex-col mr-4 mb-4">
                <label className="mb-2" htmlFor="inputChargeName">
                  Charge name
                </label>
                <input
                  className="border p-2 outline-none"
                  id="inputChargeName"
                  placeholder="Enter charge name"
                  {...register('name')}
                />
                <InvalidFeedback name="name" />
              </div>
              <div className="flex-auto flex-col mb-4">
                <label htmlFor="inputTaxable" className="mb-2">
                  Taxable?
                </label>
                <Controller
                  /*
                  // @ts-ignore */
                  id="inputTaxable"
                  control={control}
                  name="taxable"
                  render={({ field }) => (
                    <div className="flex flex-row">
                      <label className="mr-2">
                        <input
                          className="mr-1"
                          type="radio"
                          name="taxable"
                          value="true"
                          checked={field.value === true}
                          onClick={() => field.onChange(true)}
                        />
                        Yes
                      </label>
                      <label>
                        <input
                          className="mr-1"
                          type="radio"
                          name="taxable"
                          value="false"
                          checked={field.value === false}
                          onClick={() => field.onChange(false)}
                        />
                        No
                      </label>
                    </div>
                  )}
                />
                <InvalidFeedback name="taxable" />
              </div>
            </div>
            <div className="flex flex-row flex-wrap -mr-8">
              <div className="flex flex-col mr-4 mb-4">
                <label className="mb-2" htmlFor="inputChargeAmount">
                  Enter charge amount
                </label>
                <div className="flex flex-row">
                  <Controller
                    name="modifierId"
                    control={control}
                    render={({ field }) => (
                      <select
                        className="border p-2 outline-none"
                        value={field.value}
                        onChange={field.onChange}
                      >
                        {Modifiers.map((modifier) => (
                          <option key={modifier.id} value={modifier.id}>
                            {modifier.name}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                  <input
                    id="inputChargeAmount"
                    className="border p-2 outline-none"
                    type="number"
                    {...register('amount')}
                  />
                </div>
                <InvalidFeedback name="amount" />
              </div>
              <div className="flex flex-col mr-4 mb-4">
                <label className="mb-2" htmlFor="inputChargeMultiplierId">
                  Fee calculation
                </label>
                <Controller
                  control={control}
                  name="multiplierId"
                  render={({ field }) => (
                    <select
                      id="inputChargeMultiplierId"
                      className="border p-2 outline-none"
                      value={field.value}
                      onChange={field.onChange}
                    >
                      {Multipliers.map((multiplier) => (
                        <option key={multiplier.id} value={multiplier.id}>
                          {multiplier.name}
                        </option>
                      ))}
                    </select>
                  )}
                />
                <InvalidFeedback name="multiplerId" />
              </div>
              <div className="flex flex-col">
                <label className="mb-2" htmlFor="inputOptional">
                  Optional?
                </label>
                <Controller
                  control={control}
                  name="optional"
                  render={({ field }) => (
                    <div className="flex flex-row">
                      <label className="mr-2">
                        <input
                          className="mr-1"
                          type="radio"
                          value="true"
                          checked={field.value === true}
                          onClick={() => field.onChange(true)}
                        />
                        Yes
                      </label>
                      <label>
                        <input
                          className="mr-1"
                          type="radio"
                          value="false"
                          checked={field.value === false}
                          onClick={() => field.onChange(false)}
                        />
                        No
                      </label>
                    </div>
                  )}
                />
                <InvalidFeedback name="optional" />
              </div>
            </div>
          </div>
        </div>
      </ErrorProvider>
      <div className="text-right p-4">
        <button
          className="btn btn-dark mr-2"
          type="button"
          onClick={() => onChange()}
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

export default ChargeModal;
