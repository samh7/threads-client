import { Component, inject, OnInit, resource, signal } from '@angular/core';
import { NavigationStart, Router, RouterOutlet, Event as NavigationEvent, NavigationEnd } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { single, Subscription } from 'rxjs';
import { routes } from './app.routes';
// import { authGuard } from './guards/auth.guard';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  headerFooterClasses = signal("")
  router = inject(Router)
  showComponents = signal("")

  constructor() {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {

        if (val.url.includes("/login")
          || val.url.includes("/signup")
        ) {
          this.showComponents.set("hidden")
        }
        else {
          this.showComponents.set("")

        }
      }
    })
  }

}
