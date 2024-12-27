import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { StateService } from '../../services/state.service';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent implements OnInit {

  classes = input("")
  stateService = inject(StateService)
  userService = inject(UserService)
  user = signal<User | null>(null)
  router = inject(Router)

  ngOnInit(): void {
    this.stateService.user$.subscribe((user) => {
      this.user.set(user)
    })
  }

  logout() {

    this.stateService.clearUser()
    this.userService.deleteUserFromStorage()
    this.router.navigate(["/login"])
  }


}
