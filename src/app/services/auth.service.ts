import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginUserDto, SignUpDto, User } from '../interfaces/user.interface';
import { api_url, user_url } from '../../config/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient)
  withCredentials = {
    withCredentials: true
  }
  login(loginUserDto: LoginUserDto) {
    const url = api_url + user_url.LOGIN_USER
    const headers = new HttpHeaders();
    return this.http.post(url, loginUserDto,
      this.withCredentials
    )
  }

  signup(user: SignUpDto) {
    const url = api_url + user_url.CREATE_USER
    return this.http.post(url, user)
  }

  status() {
    const url = api_url + user_url.CHECK_JWT_TOKEN_STATUS
    return this.http.get<User>(url,
      this.withCredentials
    )
  }



}
