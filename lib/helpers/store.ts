import { SerializedError } from '@reduxjs/toolkit';
import { AsyncState } from 'types/store/AsyncState';

export const initial = <T>(
  value: T | null = null,
): AsyncState<T, 'initial'> => ({
  initial: true,
  loading: false,
  value,
  error: null,
});

export const pending = <T>(
  value: T | null = null,
): AsyncState<T, 'pending'> => ({
  initial: false,
  loading: true,
  value,
  error: null,
});

export const fulfilled = <T>(value: T): AsyncState<T, 'fulfilled'> => ({
  initial: false,
  loading: false,
  value,
  error: null,
});

export const rejected = <T>(
  error: SerializedError,
): AsyncState<T, 'rejected'> => ({
  initial: false,
  loading: false,
  value: null,
  error,
});
