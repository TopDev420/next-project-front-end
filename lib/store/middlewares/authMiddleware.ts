import { Middleware } from '@reduxjs/toolkit';

const authMiddleware: Middleware = (storeApi) => (next) => (action) => {
  if (action.type === 'user/logout/fulfilled') {
    storeApi.dispatch({ type: 'RESET' });
  }
  next(action);
};

export default authMiddleware;
