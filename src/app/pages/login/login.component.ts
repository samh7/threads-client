import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginUserDto, User } from '../../interfaces/user.interface';
import * as JwtDecode from "jwt-decode"
import { HttpHeaders } from '@angular/common/http';
import { StateService } from '../../services/state.service';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {
  formBuilder = inject(FormBuilder)
  authService = inject(AuthService)
  stateService = inject(StateService)
  userService = inject(UserService)
  router = inject(Router)

  loginForm = this.formBuilder.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(4)]],
  })

  formSubmitted() {
    const loginUserDto: LoginUserDto = {
      email: this.loginForm.value.email as string,
      password: this.loginForm.value.password as string
    }

    this.authService.login(loginUserDto).subscribe((response) => {

      const { loginUser } = response as { loginUser: User }
      if (!loginUser) {
        return
      }
      this.userService.saveUserToStorage(loginUser)
      this.router.navigate(["/home"])

    })
  }
}
