import { combineReducers } from '@reduxjs/toolkit';
import propertyReducer from 'lib/store/slices/my-page/property';
import roomReducer from 'lib/store/slices/my-page/room';

const reducer = combineReducers({
  property: propertyReducer,
  room: roomReducer,
});

export default reducer;
