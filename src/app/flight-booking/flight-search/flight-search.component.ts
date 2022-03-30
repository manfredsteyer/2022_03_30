// src/app/flight-search/flight-search.component.ts

import { Component, Inject } from '@angular/core';
import { FLIGHT_SERVICES } from '../../app.tokens';
import { Flight } from '../flight';
import { DummyFlightService, FlightService } from '../flight.service';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.scss'],
  providers: [
    // {
    //   provide: FlightService,
    //   useClass: DummyFlightService
    // }
  ]
})
export class FlightSearchComponent {
  from = 'Hamburg';
  to = 'Graz';
  selectedFlight: Flight | null = null;
  delayFilter = false;

  flights$ = this.flightService.flights$;

  basket: { [key: number]: boolean } = {
    3: true,
    5: true
  };

  constructor(
    private flightService: FlightService) {

  }

  get flights() {
    // We will refactor this to an observable in a later exercise!
    return this.flightService.flights;
  }

  search(): void {

    if (!this.from || !this.to) {
      return;
    }

    this.flightService.load(this.from, this.to);
  }

  select(f: Flight): void {
    this.selectedFlight = f;
  }

  delay(): void {
    this.flightService.delay();
  }
}
