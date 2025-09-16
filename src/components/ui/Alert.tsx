import React from 'react';
import { X, CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';
import type { Notification } from '../../store/useAppStore';

interface AlertProps {
  notification: Notification;
  onClose: (id: string) => void;
}

export const Alert: React.FC<AlertProps> = ({ notification, onClose }) => {
  const { id, type, title, message } = notification;

  const typeConfig = {
    success: {
      icon: CheckCircle,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      iconColor: 'text-green-400',
      titleColor: 'text-green-800',
      messageColor: 'text-green-700',
    },
    error: {
      icon: XCircle,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      iconColor: 'text-red-400',
      titleColor: 'text-red-800',
      messageColor: 'text-red-700',
    },
    warning: {
      icon: AlertTriangle,
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      iconColor: 'text-yellow-400',
      titleColor: 'text-yellow-800',
      messageColor: 'text-yellow-700',
    },
    info: {
      icon: Info,
      bgColor: 'bg-primary-50',
      borderColor: 'border-primary-200',
      iconColor: 'text-primary-400',
      titleColor: 'text-primary-800',
      messageColor: 'text-primary-700',
    },
  };

  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={`rounded-md border p-4 ${config.bgColor} ${config.borderColor}`}
    >
      <div className='flex'>
        <div className='flex-shrink-0'>
          <Icon className={`h-5 w-5 ${config.iconColor}`} />
        </div>
        <div className='ml-3 flex-1'>
          <h3 className={`text-sm font-medium ${config.titleColor}`}>
            {title}
          </h3>
          {message && (
            <div className={`mt-1 text-sm ${config.messageColor}`}>
              {message}
            </div>
          )}
        </div>
        <div className='ml-auto pl-3'>
          <div className='-mx-1.5 -my-1.5'>
            <button
              type='button'
              className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 ${config.bgColor} ${config.iconColor} hover:${config.bgColor}`}
              onClick={() => onClose(id)}
            >
              <span className='sr-only'>Dismiss</span>
              <X className='h-5 w-5' />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface NotificationContainerProps {
  notifications: Notification[];
  onClose: (id: string) => void;
}

export const NotificationContainer: React.FC<NotificationContainerProps> = ({
  notifications,
  onClose,
}) => {
  if (notifications.length === 0) return null;

  return (
    <div className='fixed top-4 right-4 z-50 space-y-2 max-w-md'>
      {notifications.map(notification => (
        <Alert
          key={notification.id}
          notification={notification}
          onClose={onClose}
        />
      ))}
    </div>
  );
};
