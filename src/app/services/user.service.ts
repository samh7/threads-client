import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { api_url, user_url } from '../../config/environment';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  localStorageKey = "threads_user"

  saveUserToStorage(user: User) {
    // this.deleteUserFromStorage()
    localStorage.setItem(this.localStorageKey, JSON.stringify(user))
  }

  getUserFromStorage() {
    const user = localStorage.getItem(this.localStorageKey)
    return user ? JSON.parse(user) as User : null
  }

  deleteUserFromStorage() {
    localStorage.removeItem(this.localStorageKey)
  }
}
