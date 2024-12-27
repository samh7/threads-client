import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { api_url, user_url } from '../../config/environment';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private user = new BehaviorSubject<User | null>(null);
  user$ = this.user.asObservable();
  localStorageKey = "threads_user"


  setUser(user: User) {
    this.user.next(user)
  }

  clearUser() {
    this.user.next(null)
  }


  // saveUserToStorage(user: User) {
  //   localStorage.setItem(this.localStorageKey, JSON.stringify(user))
  // }

  // getUserFromStorage() {
  //   const user = localStorage.getItem(this.localStorageKey)
  //   return user ? JSON.parse(user) as User : null
  // }
}
