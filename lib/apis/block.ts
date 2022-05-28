import dayjs from 'dayjs';
import { BlockInput } from 'lib/forms/block';
import { del, get, post, put } from 'lib/helpers/api';
import _ from 'lodash';
import { Block } from 'types/models/Block';

const normalizeInput = (input: BlockInput): BlockInput => ({
  ..._.omit(input, 'id'),
  name:
    input.name ||
    `[Block] ${dayjs(input.startedAt).format('MM/DD/YYYY')} - ${dayjs(
      input.endedAt,
    ).format('MM/DD/YYYY')}`,
  startedAt: dayjs(input.startedAt).startOf('date').toDate(),
  endedAt: dayjs(input.endedAt).endOf('date').toDate(),
});

export const showBlock = (id: number) => get<Block>(`block/${id}`);

export const saveBlock = (input: BlockInput) => {
  if (input.id) {
    return put<Block>(`block/${input.id}`, normalizeInput(input));
  }

  return post<Block>('block', normalizeInput(input));
};

export const deleteBlock = async (id: number) => {
  await del(`block/${id}`);
  return id;
};
