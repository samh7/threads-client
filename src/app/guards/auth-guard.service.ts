import { inject, Injectable, signal } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StateService } from '../services/state.service';
import { User } from '../interfaces/user.interface';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  router = inject(Router)
  userService = inject(UserService)
  stateService = inject(StateService)

  user = signal<User | null>(null);
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    this.user.set(this.userService.getUserFromStorage())
    if (!this.user()) {
      this.router.navigate(["/"])
      return false
    }

    this.stateService.setUser(this.user()!)
    return true
  }
}
