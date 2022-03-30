import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Flight } from '../flight';
import { FlightBookingApiModule } from '../flight-booking.api.module';
import { FlightBookingModule } from '../flight-booking.module';
import { FlightService } from '../flight.service';

@Injectable({ providedIn: FlightBookingApiModule })
export class FlightResolver implements Resolve<Flight> {

    constructor(private flightService: FlightService) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<Flight> {
        return this.flightService.findById(route.params.id).pipe(
            // delay(7000)
        );
    }
}

