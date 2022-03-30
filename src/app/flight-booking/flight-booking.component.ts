import { Component } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'app-flight-booking',
  templateUrl: './flight-booking.component.html',
  styleUrls: ['./flight-booking.component.scss']
})
export class FlightBookingComponent {

  constructor(private authService: AuthService) {
    console.debug('userName', authService.userName || '<unknown>');
  }

}
