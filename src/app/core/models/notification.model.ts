import { NotificationType } from '@shared/models/notification-type.model';

export interface Notification {
  message: string;
  type?: NotificationType | null;
  icon?: string;
  action?: string;
  willCloseAfter?: number;
  id?: number;
}
