import { Component } from '@angular/core';
import { AboutComponent } from '../about/about.component';
import { Flight } from '../flight-booking/flight';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  flights: Flight[] =
    [
      { id: 1, from: 'Frankfurt', to: 'Flagranti', date: '2022-03-28T19:00+01:00' },
      { id: 2, from: 'Frankfurt', to: 'Kognito', date: '2022-03-28T19:10+01:00' },
      { id: 3, from: 'Frankfurt', to: 'Mallorca', date: '2022-03-28T19:20+01:00' },
    ];

  constructor(private authService: AuthService) {
  }

  get userName() {
    return this.authService.userName;
  }

  login(): void {
    this.authService.login('Max', '123456');
  }

  logout(): void {
    this.authService.logout();
  }

  delete(): void {
    console.warn('Would delete now if this was not a shareware version');
  }

}

