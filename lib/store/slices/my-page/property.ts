import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { STEPS } from 'constants/steps';
import { Bathroom } from 'types/models/Bathroom';
import { Bedroom } from 'types/models/Bedroom';
import { Property } from 'types/models/Property';
import { Location } from 'types/models/Location';
import { PropertyDescription } from 'types/models/PropertyDescription';
import { StepType } from 'types/ui/Stepper';
import { Image } from 'types/models/Image';
import { Price } from 'types/models/Price';
import { Charge } from 'types/models/Charge';
import { GuestCharge } from 'types/models/GuestCharge';
import { Discount } from 'types/models/Discount';
import { Room } from 'types/models/Room';
import { PropertyTerm } from 'types/models/PropertyTerm';
import { Subscription } from 'types/models/Subscription';

export type PropertyState = {
  value: Property | null;
  step: StepType;
};

const initialState: PropertyState = {
  value: null,
  step: STEPS[0],
};

const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {
    setStep(state, action: PayloadAction<StepType>) {
      state.step = action.payload;
    },
    nextStep(state) {
      const index = STEPS.findIndex((step) => step === state.step);
      state.step = STEPS[index + 1] || STEPS[0];
    },
    prevStep(state) {
      const index = STEPS.findIndex((step) => step === state.step);
      state.step = STEPS[index - 1] || STEPS[0];
    },
    setValue(state, action: PayloadAction<Property>) {
      state.value = action.payload;
    },
    saveBedroom(state, action: PayloadAction<Bedroom>) {
      if (!state.value) {
        return;
      }
      if (!state.value.bedrooms) {
        state.value.bedrooms = [action.payload];
        return;
      }
      const existingIndex = state.value.bedrooms.findIndex(
        ({ id }) => String(id) === String(action.payload.id),
      );
      if (existingIndex > -1) {
        state.value.bedrooms[existingIndex] = action.payload;
        return;
      }
      state.value.bedrooms.push(action.payload);
    },
    deleteBedroom(state, action: PayloadAction<number>) {
      if (!state.value?.bedrooms?.length) {
        return;
      }
      const existingIndex = state.value.bedrooms.findIndex(
        ({ id }) => String(id) === String(action.payload),
      );
      state.value.bedrooms.splice(existingIndex, 1);
    },
    saveBathroom(state, action: PayloadAction<Bathroom>) {
      if (!state.value) {
        return;
      }
      if (!state.value.bathrooms) {
        state.value.bathrooms = [action.payload];
        return;
      }
      const existingIndex = state.value.bathrooms.findIndex(
        ({ id }) => id === action.payload.id,
      );
      if (existingIndex > -1) {
        state.value.bathrooms[existingIndex] = action.payload;
        return;
      }
      state.value.bathrooms.push(action.payload);
    },
    deleteBathroom(state, action: PayloadAction<number>) {
      if (!state.value?.bathrooms?.length) {
        return;
      }
      const existingIndex = state.value.bathrooms.findIndex(
        ({ id }) => String(id) === String(action.payload),
      );
      state.value.bathrooms.splice(existingIndex, 1);
    },
    saveDescription(state, action: PayloadAction<PropertyDescription>) {
      if (!state.value) {
        return;
      }
      state.value.propertyDescription = action.payload;
    },
    saveLocation(state, action: PayloadAction<Location>) {
      if (!state.value) {
        return;
      }
      state.value.location = action.payload;
    },
    saveAmenitiesIds(state, action: PayloadAction<number[]>) {
      if (!state.value) {
        return;
      }
      state.value.amenitiesIds = action.payload;
    },
    saveImages(state, action: PayloadAction<Image[]>) {
      if (!state.value) {
        return;
      }
      state.value.images = action.payload;
    },
    saveVideo(state, action: PayloadAction<string | null>) {
      if (!state.value) {
        return;
      }
      state.value.video = action.payload;
    },
    savePrice(state, action: PayloadAction<Price>) {
      if (!state.value) {
        return;
      }
      state.value.price = action.payload;
    },
    saveCharge(state, action: PayloadAction<Charge>) {
      if (!state.value) {
        return;
      }
      if (!state.value.charges) {
        state.value.charges = [action.payload];
        return;
      }
      const existingIndex = state.value.charges.findIndex(
        ({ id }) => id === action.payload.id,
      );
      if (existingIndex > -1) {
        state.value.charges[existingIndex] = action.payload;
        return;
      }
      state.value.charges.push(action.payload);
    },
    deleteCharge(state, action: PayloadAction<number>) {
      if (!state.value?.charges?.length) {
        return;
      }
      const exisitingIndex = state.value.charges.findIndex(
        ({ id }) => id === action.payload,
      );
      state.value.charges.splice(exisitingIndex, 1);
    },
    setBpg(state, action: PayloadAction<boolean>) {
      if (!state.value) {
        return;
      }
      state.value.bpg = action.payload;
    },
    saveGuestCharge(state, action: PayloadAction<GuestCharge>) {
      if (!state.value) {
        return;
      }
      state.value.guestCharge = action.payload;
    },
    saveDiscount(state, action: PayloadAction<Discount>) {
      if (!state.value) {
        return;
      }
      if (!state.value.discounts?.length) {
        state.value.discounts = [action.payload];
        return;
      }
      const existingIndex = state.value.discounts.findIndex(
        ({ id }) => id === action.payload.id,
      );
      if (existingIndex > -1) {
        state.value.discounts[existingIndex] = action.payload;
        return;
      }
      state.value.discounts.push(action.payload);
    },
    saveTerms(state, action: PayloadAction<PropertyTerm>) {
      if (!state.value) {
        return;
      }
      state.value.propertyTerm = action.payload;
    },
    deleteDiscount(state, action: PayloadAction<number>) {
      if (!state.value?.discounts?.length) {
        return;
      }
      const existingIndex = state.value.discounts.findIndex(
        ({ id }) => id === action.payload,
      );
      state.value.discounts.splice(existingIndex, 1);
    },
    updateRoom(state, action: PayloadAction<Room>) {
      if (!state.value) {
        return;
      }
      state.value.room = action.payload;
    },
    updateSubscription(state, action: PayloadAction<Subscription | null>) {
      state.value.subscription = action.payload;
    },
    reset() {
      return initialState;
    },
  },
});

export default propertySlice.reducer;
export const {
  nextStep,
  prevStep,
  setStep,
  setValue,
  reset,
  saveBedroom,
  deleteBedroom,
  saveBathroom,
  deleteBathroom,
  saveDescription,
  saveLocation,
  saveAmenitiesIds,
  saveImages,
  saveVideo,
  savePrice,
  saveCharge,
  deleteCharge,
  setBpg,
  saveGuestCharge,
  saveDiscount,
  deleteDiscount,
  saveTerms,
  updateRoom,
  updateSubscription,
} = propertySlice.actions;
