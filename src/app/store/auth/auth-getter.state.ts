import { Selector } from "@ngxs/store";
import { UserInfo } from "@shared/models/user-info.model";
import { AuthStateModel } from "./auth.actions";
import { AuthState } from "./auth.state";

export class AuthGetterState {
  @Selector([AuthState])
  static token(state: AuthStateModel): string | null {
    return state.token;
  }

  @Selector([AuthState])
  static isAuthenticated(state: AuthStateModel): boolean {
    return Boolean(state.token);
  }

  @Selector([AuthState])
  static userInfo(state: AuthStateModel): UserInfo {
    return {
      id: state.id,
      firstName: state.firstName,
      lastName: state.lastName,
      userRoles: state.userRoles,
      userAvatarId: state.userAvatarId,
      email: state.email,
      isEmailConfirmed: state.isEmailConfirmed
    };
  }

  @Selector([AuthState])
  static isEmailConfirmed(state: AuthStateModel): boolean {
    return state.isEmailConfirmed;
  }

  @Selector([AuthState])
  static isLoginLoading(state: AuthStateModel): boolean {
    return state.isLoginLoading;
  }

  @Selector([AuthState])
  static loginSuccess(state: AuthStateModel): boolean {
    return state.loginSuccess;
  }

  @Selector([AuthState])
  static loginError(state: AuthStateModel): any {
    return state.loginError;
  }

  @Selector([AuthState])
  static isRegisterLoading(state: AuthStateModel): boolean {
    return state.isRegisterLoading;
  }

  @Selector([AuthState])
  static registerSuccess(state: AuthStateModel): boolean {
    return state.registerSuccess;
  }

  @Selector([AuthState])
  static registerError(state: AuthStateModel): any {
    return state.registerError;
  }

  @Selector([AuthState])
  static isCheckingEmailUniquality(state: AuthStateModel): boolean {
    return state.isCheckingEmailUniquality;
  }

  @Selector([AuthState])
  static checkEmailUniqualitySuccess(state: AuthStateModel): boolean | { isUnique: boolean } {
    return state.checkEmailUniqualitySuccess;
  }

  @Selector([AuthState])
  static checkEmailUniqualityError(state: AuthStateModel): boolean {
    return state.checkEmailUniqualityError;
  }

  @Selector([AuthState])
  static isForgotLoading(state: AuthStateModel): boolean {
    return state.isForgotLoading;
  }

  @Selector([AuthState])
  static forgotPasswordError(state: AuthStateModel): any {
    return state.forgotPasswordError;
  }

  @Selector([AuthState])
  static forgotPasswordSuccess(state: AuthStateModel): boolean {
    return state.forgotPasswordSuccess;
  }

  @Selector([AuthState])
  static isRestoreLoading(state: AuthStateModel): boolean {
    return state.isRestoreLoading;
  }

  @Selector([AuthState])
  static restorePasswordSuccess(state: AuthStateModel): boolean {
    return state.restorePasswordSuccess;
  }

  @Selector([AuthState])
  static restorePasswordError(state: AuthStateModel): any {
    return state.restorePasswordError;
  }

  @Selector([AuthState])
  static isChangePasswordLoading(state: AuthStateModel): boolean {
    return state.isChangePasswordLoading;
  }

  @Selector([AuthState])
  static changePasswordError(state: AuthStateModel): any {
    return state.changePasswordError;
  }

  @Selector([AuthState])
  static changePasswordSuccess(state: AuthStateModel): boolean {
    return state.changePasswordSuccess;
  }

  @Selector([AuthState])
  static confirmEmailSuccess(state: AuthStateModel): any {
    return state.confirmEmailSuccess;
  }

  @Selector([AuthState])
  static confirmEmailError(state: AuthStateModel): any {
    return state.confirmEmailError;
  }

  @Selector([AuthState])
  static isAvatarLoading(state: AuthStateModel): boolean {
    return state.isAvatarLoading;
  }

  @Selector([AuthState])
  static avatarSetSuccess(state: AuthStateModel): boolean {
    return state.avatarSetSuccess;
  }

  @Selector([AuthState])
  static avatarSetError(state: AuthStateModel): any {
    return state.avatarSetError;
  }

  @Selector([AuthState])
  static isTokenExpired(state: AuthStateModel): boolean {
    return state.isTokenExpired;
  }

  @Selector([AuthState])
  static isUserInfoSaving(state: AuthStateModel): boolean {
    return state.isUserInfoSaving;
  }

  @Selector([AuthState])
  static userInfoSuccess(state: AuthStateModel): boolean {
    return state.userInfoSuccess;
  }

  @Selector([AuthState])
  static userInfoError(state: AuthStateModel): boolean {
    return state.userInfoError;
  }

  @Selector([AuthState])
  static isVerificationEmailSending(state: AuthStateModel): boolean {
    return state.isVerificationEmailSending;
  }

  @Selector([AuthState])
  static verificationEmailSentSuccess(state: AuthStateModel): boolean {
    return state.verificationEmailSentSuccess;
  }

  @Selector([AuthState])
  static verificationEmailSentError(state: AuthStateModel): any {
    return state.verificationEmailSentError;
  }

  @Selector([AuthState])
  static redirectAfterLoginUrl(state: AuthStateModel): string {
    return state.redirectAfterLoginUrl;
  }
}