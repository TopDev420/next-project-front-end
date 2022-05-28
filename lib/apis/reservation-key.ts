import { get, post, del } from 'lib/helpers/api';

const sync = (propertyId?: number | null) =>
  post('reservation-key/sync', { propertyId: propertyId || null });
const progress = (jobId: number) => get(`reservation-key/progress/${jobId}`);
const currentJob = (propertyId: number | null = null) =>
  get('reservation-key/current-job', { propertyId });
const deleteJob = (jobStatusId: number) =>
  del(`reservation-key/rk-job/${jobStatusId}`);

export const reservationKeyApi = {
  sync,
  progress,
  currentJob,
  deleteJob,
};
