import { InjectionToken } from '@angular/core';
import { DummyFlightService, FlightService } from './flight-booking/flight.service';


export const BASE_URL = new InjectionToken<string>('BASE_URL');

export const BASE_URL2 = new InjectionToken<string>(
    'BASE_URL2',
    {
        providedIn: 'root',
        factory: () => 'http://www.angular.at/api'
    }
);

export const DUMMY_FLIGHT_SERVICE = new InjectionToken<FlightService>(
    'BASE_URL2',
    {
        providedIn: 'root',
        factory: () => new DummyFlightService()
    }
);


export const FLIGHT_SERVICES = new InjectionToken<FlightService>('FLIGHT_SERVICES');
