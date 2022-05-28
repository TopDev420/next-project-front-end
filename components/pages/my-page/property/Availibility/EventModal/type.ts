import { BlockInput } from 'lib/forms/block';
import { ReservationInput } from 'lib/forms/reservation';
import { SeasonalPriceInput } from 'lib/forms/seasonal-price';

export type EventModelType = 'Reservation' | 'SeasonalPrice' | 'Block';

export type EventInputType<T extends EventModelType> = T extends 'Block'
  ? BlockInput
  : EventModelType extends 'SeasonalPrice'
  ? SeasonalPriceInput
  : ReservationInput;

export type ContainerProps<T extends EventModelType = EventModelType> = {
  value?: EventInputType<T>;
  onChange?: (input?: EventInputType<T>, modelType?: EventModelType) => void;
  onClose?: () => void;
};
