/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useEffect } from 'react';
import Modal from 'components/Modal';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { BedroomInput, BedroomSchema } from 'lib/forms/bedroom';
import Beds from 'static/bed.json';
import _ from 'lodash';
import useIsMobile from 'lib/hooks/ui/useIsMobile';
import { BedInput } from 'lib/forms/bed';
import { ErrorProvider } from 'components/Error/Provider';
import InvalidFeedback from 'components/Error/InvalidFeedback';

type BedroomModalProps = {
  value?: BedroomInput;
  onChange?: (value?: BedroomInput) => void;
};

const getBedCountByBedId = (beds: BedInput[], bedId: number) =>
  beds?.find(({ id }) => String(id) === String(bedId))?.count || 0;

const changeBedCountByBedId = (
  beds: BedInput[],
  bedId: number,
  count: number,
) => {
  const newBeds = [...(beds || [])];
  const existingIdx = newBeds.findIndex(
    ({ id }) => String(id) === String(bedId),
  );
  if (existingIdx > -1) {
    newBeds[existingIdx] = { id: bedId, count };
  } else {
    newBeds.push({ id: bedId, count });
  }
  return newBeds.filter(({ count: bedsCount }) => !!bedsCount);
};

const BedroomModal: React.FC<BedroomModalProps> = ({
  value,
  onChange = () => {},
}) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BedroomInput>({
    defaultValues: value,
    resolver: yupResolver(BedroomSchema),
  });
  const isMobile = useIsMobile();

  const columnSize = isMobile ? 1 : 3;

  const onSubmit: SubmitHandler<BedroomInput> = useCallback(
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
          <h2 className="text-white">Add a Bedroom</h2>
        </div>
        <input
          type="hidden"
          defaultValue={value?.propertyId}
          {...register('propertyId')}
        />
        <input type="hidden" defaultValue={value?.id} {...register('id')} />
        <div className="p-6">
          <div className="mb-4">
            <div className="flex flex-col md:flex-row md:items-center ">
              <label
                className="flex-1 mb-2 md:mb-0 font-bold"
                htmlFor="inputName"
              >
                Name
              </label>
              <input
                id="inputName"
                className="flex-1 border p-2 rounded w-full"
                type="text"
                max={100}
                placeholder="Add a name"
                {...register('name')}
              />
            </div>
            <InvalidFeedback name="name" />
          </div>
          <div className="flex flex-col">
            <div className="mb-4 flex flex-col">
              <label className="font-bold">Beds</label>
              <InvalidFeedback name="beds" />
            </div>
            <Controller
              control={control}
              name="beds"
              render={({
                field: { onChange: onChangeField, value: bedsMap },
              }) => (
                <div className="">
                  {_.chunk(Beds, columnSize).map((beds, idx) => (
                    <div className="flex flex-row -mr-4" key={String(idx)}>
                      {beds.map((bed) => (
                        <div
                          key={bed.id}
                          className="flex flex-1 flex-row md:flex-col mb-3 mr-4"
                        >
                          <label className="flex-1 mb-2">{bed.name}</label>
                          <select
                            className="flex-1 text-right md:text-left border p-2"
                            value={getBedCountByBedId(bedsMap, bed.id)}
                            onChange={(e) =>
                              onChangeField(
                                changeBedCountByBedId(
                                  bedsMap,
                                  bed.id,
                                  Number(e.target.value),
                                ),
                              )
                            }
                          >
                            {_.times(10).map((_val, val) => (
                              <option key={String(val)} value={val}>
                                {val}
                              </option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
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

export default BedroomModal;
