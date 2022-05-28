import { RoomInput } from 'lib/forms/room';
import { Room } from 'types/models/Room';

export const convertModelToInput = (
  model?: Room | null,
  propertyId?: number,
): RoomInput => ({
  id: model?.id || null,
  title: model?.title || '',
  icalFeedUrl: model?.icalFeedUrl || '',
  propertyId: (model?.propertyId || propertyId)!,
});

export const convertModelToOption = (model: Room) => ({
  label: model.title,
  value: model.id,
});
