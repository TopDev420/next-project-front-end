import { formatNumber } from 'lib/helpers/number';

type CapacitySummaryProps = {
  bathroomsCount: number | null;
  bedroomsCount: number | null;
  roomsCount: number | null;
};

const CapacitySummary = ({
  bathroomsCount,
  bedroomsCount,
  roomsCount,
}: CapacitySummaryProps) => {
  if (!bathroomsCount && !bedroomsCount && (!roomsCount || roomsCount < 2)) {
    return null;
  }
  return (
    <div className="flex flex-col">
      {roomsCount > 1 ? (
        <span className="text-sm">{formatNumber(roomsCount)} rooms</span>
      ) : (
        <>
          {true && (
            <span className="text-sm">
              {formatNumber(bedroomsCount)} bedroom(s)
            </span>
          )}
        </>
      )}
    </div>
  );
};

export default CapacitySummary;
