import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AuthGuardService } from './guards/auth-guard.service';

export const routes: Routes = [
  {
    path: "",
    component: LandingComponent,
  },

  {
    path: "home",
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "signup",
    component: SignupComponent,
  },
  {
    path: "*",
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },

  {
    path: "**",
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
];
