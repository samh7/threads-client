import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SignUpDto, User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-signup',
  imports: [
    RouterLink,
    ReactiveFormsModule

  ],
  templateUrl: './signup.component.html',
  styles: ``
})
export class SignupComponent {
  router = inject(Router)
  formBuilder = inject(FormBuilder)
  authService = inject(AuthService)

  signupForm = this.formBuilder.group({
    name: ["", [Validators.required]],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(4)]],
    password_confirmation: ["", [Validators.required, Validators.minLength(4)]],
  })

  formSubmitted() {

    const signupUser: SignUpDto = {
      name: this.signupForm.value.name as string,
      email: this.signupForm.value.email as string,
      password: this.signupForm.value.password as string
    }
    if (this.signupForm.value.password !== this.signupForm.value.password_confirmation) {
      alert("Passwords don't match")
      return
    }
    this.authService.signup(signupUser).subscribe((_res) => {
      this.router.navigate(["/login"])
    })
  }
}
