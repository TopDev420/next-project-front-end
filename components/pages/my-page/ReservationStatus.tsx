import {
  getStatusDisplayColor,
  getStatusDisplayText,
} from 'lib/transformers/reservation';

const ReservationStatus: React.FC<{ status: number }> = ({ status }) => {
  const color = getStatusDisplayColor({ reservationStatusId: status });
  const text = getStatusDisplayText({ reservationStatusId: status });

  return (
    <div className="mb-3">
      <span
        className="px-2 py-0.5 text-sm border"
        style={{ borderColor: color, color }}
      >
        {text}
      </span>
    </div>
  );
};

export default ReservationStatus;
