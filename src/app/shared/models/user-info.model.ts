import {UserRoles} from '../../store/auth/auth.dto'

export interface UserInfo {
  id: number | null;
  firstName: string;
  lastName: string;
  userRoles: UserRoles[] | null;
  userAvatarId: number | null;
  email: string | null;
  isEmailConfirmed: boolean;
}
