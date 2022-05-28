import { combineReducers, configureStore } from '@reduxjs/toolkit';
import Config from 'config';
import sanctumReducer from 'lib/store/slices/sanctum';
import userReducer from 'lib/store/slices/user';
import uiReducer from 'lib/store/slices/ui';
import socialAuthReducer from 'lib/store/slices/socialAuth';
import myPageReducer from 'lib/store/slices/my-page';
import authMiddleware from 'lib/store/middlewares/authMiddleware';
import reservationImportReducer from './slices/reservation-import';

const combinedReducers = combineReducers({
  sanctum: sanctumReducer,
  user: userReducer,
  ui: uiReducer,
  socialAuth: socialAuthReducer,
  myPage: myPageReducer,
  reservationImport: reservationImportReducer,
});

const rootReducer = (
  state: Parameters<typeof combinedReducers>[0],
  action: Parameters<typeof combinedReducers>[1],
) => {
  if (action.type === 'RESET') {
    // eslint-disable-next-line no-param-reassign
    state = undefined;
  }

  return combinedReducers(state, action);
};

const store = configureStore({
  reducer: rootReducer,
  devTools: Config.REDUX_DEVTOOLS,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware),
});

export const reset = () => ({
  type: 'RESET',
});

export default store;
