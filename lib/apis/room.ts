import _ from 'lodash';
import { RoomInput } from 'lib/forms/room';
import {
  del,
  getServerSidePropsRequestHeader,
  post,
  put,
  get,
} from 'lib/helpers/api';
import { Room } from 'types/models/Room';
import { GetServerSidePropsContext } from 'next';

export const showRoom = async (
  id: number,
  req?: GetServerSidePropsContext['req'],
) => {
  const url = `room/${id}`;
  if (req) {
    return get<Room>(url, undefined, getServerSidePropsRequestHeader(req));
  }

  return get<Room>(url);
};

export const saveRoom = (input: RoomInput) => {
  if (input.id) {
    return put<Room>(`room/${input.id}`, _.omit(input, 'id'));
  }
  return post<Room>('room', input);
};

export const deleteRoom = async (id: number) => {
  await del<Room>(`room/${id}`);

  return id;
};
