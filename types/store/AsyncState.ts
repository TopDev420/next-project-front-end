import { SerializedError } from '@reduxjs/toolkit';

export type AsyncStatus = 'initial' | 'pending' | 'fulfilled' | 'rejected';

export type AsyncState<
  Data,
  Status extends AsyncStatus = AsyncStatus,
> = Status extends 'initial'
  ? {
      initial: true;
      loading: false;
      value: null | Data;
      error: null;
    }
  : Status extends 'pending'
  ? {
      initial: false;
      loading: true;
      value: null | Data;
      error: null;
    }
  : Status extends 'fulfilled'
  ? {
      initial: false;
      loading: false;
      value: Data;
      error: null;
    }
  : {
      initial: false;
      loading: false;
      value: null | Data;
      error: SerializedError;
    };
