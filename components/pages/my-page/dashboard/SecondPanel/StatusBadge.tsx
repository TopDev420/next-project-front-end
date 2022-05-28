import React from 'react';
import {
  getStatusDisplayColor,
  getStatusDisplayText,
} from 'lib/transformers/reservation';
import { classNames } from 'lib/helpers/ui';

const StatusBadge: React.FC<{ status?: number; className?: string }> = ({
  status,
  className,
}) => {
  if (!status) {
    return null;
  }

  const color = getStatusDisplayColor({ reservationStatusId: status });
  const text = getStatusDisplayText({ reservationStatusId: status });

  return (
    <span
      className={classNames('border px-2 py-0.5 text-xs', className)}
      style={{ borderColor: color, color }}
    >
      {text}
    </span>
  );
};

export default StatusBadge;
