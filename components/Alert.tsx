import { ReactNode, useState } from 'react';
import ErrorIcon from 'assets/images/icons/error.svg';
import WarningIcon from 'assets/images/icons/warning.svg';
import CheckIcon from 'assets/images/icons/check.svg';
import InfoIcon from 'assets/images/icons/info.svg';
import CloseIcon from 'assets/images/icons/close.svg';
import { classNames } from 'lib/helpers/ui';

export type AlertProps = {
  severity?: 'info' | 'warn' | 'success' | 'danger';
  title?: ReactNode;
  message?: ReactNode;
  onClose?: () => void;
  className?: string;
};

const STYLES = {
  info: {
    icon: InfoIcon,
    color: 'bg-blue-500',
  },
  warn: {
    icon: WarningIcon,
    color: 'bg-yellow-500',
  },
  danger: {
    icon: ErrorIcon,
    color: 'bg-pink-500',
  },
  success: {
    icon: CheckIcon,
    color: 'bg-green-500',
  },
};

const Alert: React.FC<AlertProps> = ({
  severity = 'info',
  title = '',
  message = '',
  onClose,
  className,
}) => {
  const [visible, setVisible] = useState<boolean>(true);
  const styles = STYLES[severity];
  const Icon = styles.icon;

  if (!visible) {
    return null;
  }

  return (
    <div
      className={classNames(
        'text-white px-3 py-4 border-0 rounded relative mb-4 flex flex-row',
        styles.color,
        className,
      )}
    >
      <div className="flex-initial">
        <Icon className="mr-2" width={18} height={18} fill="#FFF" />
      </div>
      <div className="flex flex-1 flex-col">
        {!!title && (
          <>
            {typeof title === 'string' ? (
              <strong className="text-sm">{title}</strong>
            ) : (
              title
            )}
          </>
        )}
        {!!message && (
          <>
            {typeof message === 'string' ? (
              <span className="text-sm mt-1">{message}</span>
            ) : (
              message
            )}
          </>
        )}
      </div>
      <div className="flex-initial">
        <button
          type="button"
          className="bg-transparent outline-none focus:outline-none"
          onClick={() => {
            if (typeof onClose === 'function') {
              return onClose();
            }

            return setVisible(false);
          }}
        >
          <CloseIcon width={14} height={14} fill="#FFF" />
        </button>
      </div>
    </div>
  );
};

export default Alert;
