import { AuthDto, UserRoles } from './auth.dto';
export interface AuthStateModel {
  token: string | null;
  isTokenExpired: boolean;
  email: string | null;
  isRemeberUser: boolean;
  isEmailConfirmed: boolean;

  isLoginLoading: boolean;
  loginSuccess: boolean;
  loginError: any;

  isRegisterLoading: boolean;
  registerSuccess: boolean;
  registerError: any;

  isCheckingEmailUniquality: boolean;
  checkEmailUniqualitySuccess: boolean | { isUnique: boolean };
  checkEmailUniqualityError: any;

  isForgotLoading: boolean;
  forgotPasswordSuccess: boolean;
  forgotPasswordError: any;

  isRestoreLoading: boolean;
  restorePasswordSuccess: boolean;
  restorePasswordError: any;

  isChangePasswordLoading: boolean;
  changePasswordSuccess: boolean;
  changePasswordError: any;

  isConfirmEmailLoading: boolean;
  confirmEmailSuccess: boolean;
  confirmEmailError: any;

  id: number | null;
  firstName: string;
  lastName: string;
  userRoles: UserRoles[] | null;
  userAvatarId: number | null;

  isAvatarLoading: boolean;
  avatarSetSuccess: boolean;
  avatarSetError: any;

  isUserInfoSaving: boolean;
  userInfoSuccess: boolean;
  userInfoError: any;

  isVerificationEmailSending: boolean;
  verificationEmailSentSuccess: boolean;
  verificationEmailSentError: any;

  redirectAfterLoginUrl: string;
}

export class Login {
  static readonly type = '[Auth] Login';
  constructor(public payload: { email: string; password: string }) { }
}

export class ExternalLogin {
  static readonly type = '[Auth] ExternalLogin';
  constructor(public payload: string) { }
}

export class ClearLogin {
  static readonly type = '[Auth] ClearLogin';
}

export class ConfirmEmail {
  static readonly type = '[Auth] ConfirmEmail';
  constructor(public payload: { email: string; code: string; }) { }
}

export class ClearConfirmEmailState {
  static readonly type = '[Auth] ClearConfirmEmailState';
}

export class Register {
  static readonly type = '[Auth] Register';
  constructor(public payload: { email: string; password: string; first_name: string, last_name: string }) { }
}

export class ClearRegister {
  static readonly type = '[Auth] ClearRegister';
}

export class CheckEmailUniquality {
  static readonly type = '[Auth] CheckEmailUniquality';
  constructor(public payload: { email: string; }) { }
}

export class RestorePassword {
  static readonly type = '[Auth] RestorePassword';
  constructor(public payload: { password: string; code: string; }) { }
}

export class RestorePasswordClear {
  static readonly type = '[Auth] RestorePasswordClear';
}

export class ForgotPassword {
  static readonly type = '[Auth] ForgotPassword';
  constructor(public payload: { email: string; }) { }
}

export class ClearForgotPassword {
  static readonly type = '[Auth] ClearForgotPassword';
}

export class ChangePassword {
  static readonly type = '[Auth] ChangePassword';
  constructor(public payload: { oldPassword: string; newPassword: string }) { }
}

export class ClearChangePassword {
  static readonly type = '[Auth] ClearChangePassword';
}

export class Logout {
  static readonly type = '[Auth] Logout';
}

export class SetAvatar {
  static readonly type = '[Auth] SetAvatar';
  constructor(public payload: { formData: FormData }) { }
}
export class DeleteAvatar {
  static readonly type = '[Auth] DeleteAvatar';
}

export class ClearAvatarState {
  static readonly type = '[Auth] ClearAvatarState';
}

export class SaveUserInfo {
  static readonly type = '[Auth] SaveUserInfo';
  constructor(public payload: { email: string; first_name: string, last_name: string }) { }
}

export class ClearSaveUserInfo {
  static readonly type = '[Auth] ClearSaveUserInfo';
}

export class TokenExpired {
  static readonly type = '[Auth] TokenExpired';
}

export class ResendVerificationEmail {
  static readonly type = '[Auth] ResendVerificationEmail';
}

export class SaveRedirectAfterLoginUrl {
  static readonly type = '[Auth] SaveRedirectAfterLoginUrl';
  constructor(public payload: { redirectAfterLoginUrl: string; }) { }
}
