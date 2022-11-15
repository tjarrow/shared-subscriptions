import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import jwt_decode from "jwt-decode";
import { userDto } from "@store/auth/auth.dto";

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private httpClient: HttpClient) {

  }

  public login(payload: { email: string; password: string }) {
    return this.httpClient.post(`${environment.apiUrl}/auth/login`, payload);
  }

  public confirmEmail(payload: { email: string, code: string }) {
    return this.httpClient.post(`${environment.apiUrl}/auth/confirm`, payload);
  }

  public register(payload: { email: string, password: string, first_name: string, last_name: string }) {
    return this.httpClient.post(`${environment.apiUrl}/auth/register`, payload);
  }

  public checkEmailUniquality(payload: { email: string }) {
    return this.httpClient.post(`${environment.apiUrl}/auth/check-email`, payload);
  }

  public forgotPassword(payload: { email: string }) {
    return this.httpClient.post(`${environment.apiUrl}/auth/forgot`, payload);
  }

  public restorePassword(payload: { password: string, code: string }) {
    return this.httpClient.post(`${environment.apiUrl}/auth/restore/`, payload);
  }

  public changePassword(payload: { newPassword: string, oldPassword: string }) {
    return this.httpClient.post(`${environment.apiUrl}/auth/change-password`, payload);
  }

  public setAvatar(payload: {formData: FormData}) {
    return this.httpClient.post(`${environment.apiUrl}/users/logo`, payload.formData)
  }

  public deleteAvatar() {
    return this.httpClient.delete(`${environment.apiUrl}/users/logo`)
  }

  public editUserInfo(id: number, payload: { email: string; first_name: string, last_name: string }) {
    return this.httpClient.patch(`${environment.apiUrl}/users/${id}`, payload)
  }

  public resendVerificationEmail(payload: {email: string}) {
    return this.httpClient.post(`${environment.apiUrl}/auth/resend`, payload);
  }

  public decode(token: string): { email: string, userId: string, isEmailConfirmed: boolean } {
    const data = jwt_decode(token);

    return {
      email: data['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
      userId: data["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
      isEmailConfirmed: data['IsEmailConfirmed'] === 'true'
    };
  }

  public decodeFull(token: string) : userDto {
    const data = jwt_decode<userDto>(token);

    return data;
  }

  public isTokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).expires;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }
}
