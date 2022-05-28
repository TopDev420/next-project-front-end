import { Model } from 'types/models/Model';

export type Room = {
  propertyId: number;
  title: string;
  icalFeedUrl: string | null;
} & Model;

export type RkRoom = {
  id: number | null;
  roomId: number;
  title: string;
  rkId: string | null;
};
