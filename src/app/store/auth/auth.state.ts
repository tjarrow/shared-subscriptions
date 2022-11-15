import { Injectable } from "@angular/core";
import {  AuthStateModel,
          ChangePassword,
          ClearChangePassword,
          ConfirmEmail,
          ClearConfirmEmailState,
          Login,
          ClearLogin,
          Logout,
          Register,
          ClearRegister,
          CheckEmailUniquality,
          ForgotPassword,
          ClearForgotPassword,
          RestorePassword,
          RestorePasswordClear,
          SetAvatar,
          DeleteAvatar,
          ClearAvatarState,
          SaveUserInfo,
          ClearSaveUserInfo,
          TokenExpired,
          ExternalLogin,
          ResendVerificationEmail,
          SaveRedirectAfterLoginUrl } from "./auth.actions";
import { State, Action, StateContext, NgxsOnInit } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { of } from "rxjs";
import { Navigate } from '@ngxs/router-plugin';
import { AuthService } from "@shared/services/auth/auth.service";
import { AuthDto, userDto, EmailUniquality } from "./auth.dto";
import { NotifyUser, HideAllNotifications, ClearSubscriptions, CheckSavedOffer } from "../app/app.actions";

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: null,
    isTokenExpired: false,
    email: null,
    isEmailConfirmed: true,
    isRemeberUser: false,

    isLoginLoading: false,
    loginSuccess: false,
    loginError: null,

    isRegisterLoading: false,
    registerSuccess: false,
    registerError: null,

    isCheckingEmailUniquality: false,
    checkEmailUniqualitySuccess: false,
    checkEmailUniqualityError: null,

    isForgotLoading: false,
    forgotPasswordSuccess: false,
    forgotPasswordError: null,

    isRestoreLoading: false,
    restorePasswordSuccess: false,
    restorePasswordError: null,

    isChangePasswordLoading: false,
    changePasswordSuccess: false,
    changePasswordError: null,

    isConfirmEmailLoading: false,
    confirmEmailSuccess: false,
    confirmEmailError: null,

    id: null,
    firstName: '',
    lastName: '',
    userRoles: null,
    userAvatarId: null,

    isAvatarLoading: false,
    avatarSetSuccess: false,
    avatarSetError: null,

    isUserInfoSaving: false,
    userInfoSuccess: false,
    userInfoError: null,

    isVerificationEmailSending: false,
    verificationEmailSentSuccess: false,
    verificationEmailSentError: null,

    redirectAfterLoginUrl: '',
  }
})
@Injectable()
export class AuthState {
  constructor(private authService: AuthService) { }

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    ctx.patchState({
      isLoginLoading: true,
      loginSuccess: false,
      loginError: null,
      isTokenExpired: false,
    });
    return this.authService.login(action.payload).pipe(
      tap((result: AuthDto) => {
        ctx.patchState({
          token: result.token,
          id: result.user.id,
          email: result.user.email,
          firstName: result.user.first_name,
          lastName: result.user.last_name,
          isEmailConfirmed: Boolean(result.user.is_confirmed),
          userRoles: result.user.roles,
          userAvatarId: result.user.logo ? result.user.logo.id : null,
          isLoginLoading: false,
          loginSuccess: true,
          registerSuccess: false,
        });

        if (!result.user.is_confirmed) {
          ctx.dispatch(new NotifyUser({
            message: 'Your email is not verified! Verify your email address, please.',
            icon: 'attention',
            action: 'resend'
          }))
        }

        ctx.dispatch(new CheckSavedOffer());
        const redirectAfterLoginUrl = ctx.getState().redirectAfterLoginUrl;
        if (redirectAfterLoginUrl) {
          setTimeout(() => {
            ctx.dispatch([
              new Navigate([redirectAfterLoginUrl])
            ]);
          }, 500);
        }
      }, (err) => {
        ctx.patchState({
          loginError: err,
          isLoginLoading: false,
          loginSuccess: false
        });
      })
    );
  }

  @Action(ExternalLogin)
  externalLogin(ctx: StateContext<AuthStateModel>, action: ExternalLogin) {
    const token = action.payload;

    const user = this.authService.decodeFull(token);

    ctx.patchState({
      token,
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      isEmailConfirmed: Boolean(user.is_confirmed),
      userRoles: user.roles,
      userAvatarId: user.logo ? user.logo.id : null,
      isLoginLoading: false,
      loginSuccess: true,
      registerSuccess: false,
    });

    const redirectAfterLoginUrl = ctx.getState().redirectAfterLoginUrl;
    if (redirectAfterLoginUrl) {
      setTimeout(() => {
        ctx.dispatch([
          new Navigate([redirectAfterLoginUrl])
        ]);
      }, 500);
    } else {
      ctx.dispatch(new Navigate(['/my-subscriptions']));
    }
  }

  @Action(ClearLogin)
  clearLogin(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({
      isLoginLoading: false,
      loginSuccess: false,
      loginError: null,
      registerSuccess: false,
    });
    return of(null);
  }

  @Action(ConfirmEmail)
  confirmEmail(ctx: StateContext<AuthStateModel>, action: ConfirmEmail) {
    ctx.patchState({
      isConfirmEmailLoading: true,
      confirmEmailSuccess: false,
      confirmEmailError: null
    });

    return this.authService.confirmEmail(action.payload).pipe(
      tap(() => {
        ctx.patchState({
          isEmailConfirmed: true,
          confirmEmailSuccess: true,
          isConfirmEmailLoading: false,
        });
      }, (err) => {
        ctx.patchState({
          confirmEmailError: err,
          isConfirmEmailLoading: false,
        });
      })
    );
  }

  @Action(ClearConfirmEmailState)
  clearConfirmEmailState(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({
      isConfirmEmailLoading: true,
      confirmEmailSuccess: false,
      confirmEmailError: null
    });
    return of(null);
  }

  @Action(Register)
  register(ctx: StateContext<AuthStateModel>, action: Register) {
    ctx.patchState({
      isRegisterLoading: true,
      registerSuccess: false,
      registerError: null
    });
    
    return this.authService.register(action.payload).pipe(
      tap(() => {
        ctx.patchState({
          isRegisterLoading: false,
          registerSuccess: true,
        });
      }, (err) => {
        ctx.patchState({
          isRegisterLoading: false,
          registerError: err
        });
      })
    );
  }

  @Action(ClearRegister)
  clearRegister(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({
      isRegisterLoading: false,
      registerError: null,
      isCheckingEmailUniquality: false,
      checkEmailUniqualitySuccess: false,
      checkEmailUniqualityError: null
    });
    return of(null);
  }

  @Action(CheckEmailUniquality)
  checkEmailUniquality(ctx: StateContext<AuthStateModel>, action: ForgotPassword) {
    ctx.patchState({
      isCheckingEmailUniquality: true,
      checkEmailUniqualitySuccess: false,
      checkEmailUniqualityError: null,
    });
    return this.authService.checkEmailUniquality(action.payload).pipe(
      tap((result: EmailUniquality) => {
        ctx.patchState({
          isCheckingEmailUniquality: false,
          checkEmailUniqualitySuccess: {isUnique: !result.exists},
        });
      }, (err) => {
        ctx.patchState({
          isCheckingEmailUniquality: false,
          checkEmailUniqualityError: err
        });
      })
    );
  }

  @Action(ForgotPassword)
  forgotPassword(ctx: StateContext<AuthStateModel>, action: ForgotPassword) {
    ctx.patchState({
      isForgotLoading: true,
      forgotPasswordSuccess: false,
      forgotPasswordError: null
    });
    return this.authService.forgotPassword(action.payload).pipe(
      tap(() => {
        ctx.patchState({
          isForgotLoading: false,
          forgotPasswordSuccess: true
        });
      }, (err) => {
        ctx.patchState({
          isForgotLoading: false,
          forgotPasswordError: err
        });
      })
    );
  }

  @Action(ClearForgotPassword)
  clearForgotPassword(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({
      isForgotLoading: false,
      forgotPasswordSuccess: false,
      forgotPasswordError: null
    });
    return of(null);
  }

  @Action(RestorePassword)
  restorePassword(ctx: StateContext<AuthStateModel>, action: RestorePassword) {
    ctx.patchState({
      isRestoreLoading: true,
      restorePasswordSuccess: false,
      restorePasswordError: null
    });
    return this.authService.restorePassword(action.payload).pipe(
      tap(() => {
        ctx.patchState({
          isRestoreLoading: false,
          restorePasswordSuccess: true
        });
      }, (err) => {
        ctx.patchState({
          isRestoreLoading: false,
          restorePasswordError: err
        });
      })
    );
  }

  @Action(RestorePasswordClear)
  restorePasswordClear(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({
      isRestoreLoading: false,
      restorePasswordSuccess: false,
      restorePasswordError: null,
    });
    return of(null);
  }

  @Action(ChangePassword)
  changePassword(ctx: StateContext<AuthStateModel>, action: ChangePassword) {
    ctx.patchState({
      isChangePasswordLoading: true,
      changePasswordSuccess: false,
      changePasswordError: null
    });
    return this.authService.changePassword(action.payload).pipe(
      tap(() => {
        ctx.patchState({
          isChangePasswordLoading: false,
          changePasswordSuccess: true,
        });
      }, (err) => {
        ctx.patchState({
          isChangePasswordLoading: false,
          changePasswordError: err,
          isTokenExpired: (err && err.error && err.error.statusCode == 401),
        });
      })
    );
  }

  @Action(ClearChangePassword)
  clearChangePassword(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({
      isChangePasswordLoading: false,
      changePasswordSuccess: false,
      changePasswordError: null
    });
    return of(null);
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    return of(null).pipe(
      tap(() => {
        ctx.patchState({
          token: null,
          email: null,
          isEmailConfirmed: false,
          isLoginLoading: false,
          id: null,
          firstName: '',
          lastName: '',
          userRoles: null,
          userAvatarId: null,
          loginSuccess: false,
          redirectAfterLoginUrl: '',
        });

        ctx.dispatch([
          new ClearSubscriptions(),
          new HideAllNotifications(),
          new Navigate(['/']),
        ]);
      })
    );
  }

  @Action(SetAvatar)
  setAvatar(ctx: StateContext<AuthStateModel>, action: SetAvatar) {
    ctx.patchState({
      isAvatarLoading: true,
      avatarSetSuccess: false,
      avatarSetError: null,
    });
    return this.authService.setAvatar(action.payload).pipe(
      tap((result: {id: number}) => {
        ctx.patchState({
          isAvatarLoading: false,
          avatarSetSuccess: true,
          userAvatarId: result.id
        });
      }, (err) => {
        ctx.patchState({
          avatarSetError: err,
          isAvatarLoading: false,
          avatarSetSuccess: false,
          isTokenExpired: (err && err.error && err.error.statusCode == 401),
        });
      })
    );
  }

  @Action(DeleteAvatar)
  deleteAvatar(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({
      isAvatarLoading: true,
      avatarSetSuccess: false,
      avatarSetError: null,
    });
    return this.authService.deleteAvatar().pipe(
      tap(() => {
        ctx.patchState({
          isAvatarLoading: false,
          avatarSetSuccess: true,
          userAvatarId: null
        });
      }, (err) => {
        ctx.patchState({
          avatarSetError: err,
          isAvatarLoading: false,
          avatarSetSuccess: false,
          isTokenExpired: (err && err.error && err.error.statusCode == 401),
        });
      })
    );
  }

  @Action(ClearAvatarState)
  clearAvatarState(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({
      isAvatarLoading: false,
      avatarSetSuccess: false,
      avatarSetError: null,
    });
    return of(null);
  }

  @Action(SaveUserInfo)
  saveUserInfo(ctx: StateContext<AuthStateModel>, action: SaveUserInfo) {
    ctx.patchState({
      isUserInfoSaving: true,
      userInfoSuccess: false,
      userInfoError: null,
    });
    return this.authService.editUserInfo(ctx.getState().id, action.payload).pipe(
      tap((result: userDto) => {
        ctx.patchState({
          isUserInfoSaving: false,
          userInfoSuccess: true,
          email: result.email,
          firstName: result.first_name,
          lastName: result.last_name
        });
      }, (err) => {
        ctx.patchState({
          userInfoError: err,
          isUserInfoSaving: false,
          userInfoSuccess: false,
          isTokenExpired: (err && err.error && err.error.statusCode == 401),
        });
      })
    );
  }

  @Action(ClearSaveUserInfo)
  clearSaveUserInfo(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({
      isUserInfoSaving: false,
      userInfoSuccess: false,
      userInfoError: null,
    });
    return of(null);
  }

  @Action(TokenExpired)
  tokenExpired(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({
      isTokenExpired: true,
    });
    return of(null);
  }

  @Action(ResendVerificationEmail)
  resendVerificationEmail(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({
      isVerificationEmailSending: true,
      verificationEmailSentSuccess: false,
      verificationEmailSentError: null,
    });
    return this.authService.resendVerificationEmail({ email: ctx.getState().email }).pipe(
      tap((result) => {
        ctx.patchState({
          isVerificationEmailSending: false,
          verificationEmailSentSuccess: true,
        });
      }, (err) => {
        ctx.patchState({
          verificationEmailSentError: err,
          isVerificationEmailSending: false,
          isTokenExpired: (err && err.error && err.error.statusCode == 401),
        });
      })
    );
  }

  @Action(SaveRedirectAfterLoginUrl)
  saveRedirectAfterLoginUrl(ctx: StateContext<AuthStateModel>, action: SaveRedirectAfterLoginUrl) {
    ctx.patchState({
      redirectAfterLoginUrl: action.payload.redirectAfterLoginUrl
    });
    return of(null);
  }

}
