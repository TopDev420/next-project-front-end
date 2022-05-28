import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorProvider } from 'components/Error/Provider';
import Modal from 'components/Modal';
import { BathroomInput, BathroomSchema } from 'lib/forms/bathroom';
import React, { useEffect, useCallback } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import BathroomTypes from 'static/bathroom-type.json';
import BathroomFeatures from 'static/bathroom-feature.json';
import _ from 'lodash';
import InvalidFeedback from 'components/Error/InvalidFeedback';

type BathroomModalProps = {
  value?: BathroomInput;
  onChange?: (value?: BathroomInput) => void;
};

const BathroomModal: React.FC<BathroomModalProps> = ({
  value,
  onChange = () => {},
}) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BathroomInput>({
    defaultValues: value,
    resolver: yupResolver(BathroomSchema),
  });

  const onSubmit: SubmitHandler<BathroomInput> = useCallback(
    (data) => {
      onChange(data);
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
          <h2 className="text-white">
            {value?.id ? 'Edit bathroom' : 'Add a bathroom'}
          </h2>
        </div>
        <input
          type="hidden"
          defaultValue={value?.propertyId}
          {...register('propertyId')}
        />
        <input type="hidden" defaultValue={value?.id} {...register('id')} />
        <div className="p-6">
          <div className="flex flex-col md:flex-row">
            <div className="mb-4 flex-1 mr-2">
              <div className="flex flex-col">
                <label className="mb-2 font-bold" htmlFor="inputBathroomName">
                  Bathroom Name
                </label>
                <input
                  id="inputBathroomName"
                  placeholder="Add a name"
                  className="flex-1 border p-2 rounded w-full"
                  max={100}
                  {...register('name')}
                />
              </div>
              <InvalidFeedback name="name" />
            </div>
            <div className="mb-4 flex-1">
              <div className="flex flex-col">
                <label className="mb-2 font-bold" htmlFor="inputBathroomType">
                  Bathroom Type
                </label>
                <select
                  id="inputBathroomType"
                  placeholder="Select a bathroom type"
                  className="flex-1 border p-2 rounded w-full"
                  {...register('bathroomTypeId')}
                >
                  <option value={0}>Select a bathroom type</option>
                  {BathroomTypes.map((bathroomType) => (
                    <option key={bathroomType.id} value={bathroomType.id}>
                      {bathroomType.name}
                    </option>
                  ))}
                </select>
              </div>
              <InvalidFeedback name="bathroomTypeId" />
            </div>
          </div>
          <div className="flex flex-col">
            <legend className="mb-2 font-bold">Bathroom Features</legend>
            <InvalidFeedback name="bathroomFeaturesIds" />
            <Controller
              control={control}
              name="bathroomFeaturesIds"
              render={({ field }) => (
                <>
                  {_.chunk(BathroomFeatures, 2).map(
                    (bathroomFeatures, index) => (
                      <div
                        key={String(index)}
                        className="flex w-full flex-wrap"
                      >
                        {bathroomFeatures.map((bathroomFeature) => (
                          <label key={bathroomFeature.id} className="flex-1">
                            <input
                              {...field}
                              className="mr-1"
                              type="checkbox"
                              value={bathroomFeature.id}
                              checked={field.value?.includes(
                                bathroomFeature.id,
                              )}
                              onChange={() =>
                                field.onChange(
                                  _.xor(field.value || [], [
                                    bathroomFeature.id,
                                  ]),
                                )
                              }
                            />
                            {bathroomFeature.name}
                          </label>
                        ))}
                      </div>
                    ),
                  )}
                </>
              )}
            />
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

export default BathroomModal;
