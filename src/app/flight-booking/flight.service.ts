// src/app/default-flight.service.ts

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { OAuthService, OAuthStorage } from 'angular-oauth2-oidc';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { BASE_URL, BASE_URL2 } from '../app.tokens';
import { Flight } from './flight';
import { FlightBookingApiModule } from './flight-booking.api.module';
import { FlightBookingModule } from './flight-booking.module';

@Injectable()
export class DummyFlightService implements FlightService {
  flights: Flight[] = [];
  flights$ = new BehaviorSubject<Flight[]>([]);

  find(from: string, to: string): Observable<Flight[]> {
    return this.flights$;
  }

  load(from: string, to: string): void {

    this.flights = [
      { id: 1, from: 'Frankfurt', to: 'Flagranti', date: '2022-03-28T19:00+01:00' },
      { id: 2, from: 'Frankfurt', to: 'Kognito', date: '2022-03-28T19:10+01:00' },
      { id: 3, from: 'Frankfurt', to: 'Mallorca', date: '2022-03-28T19:20+01:00' },
    ];

    this.flights$.next(this.flights);

  }

  findById(id: string): Observable<Flight> {
    return of({ id: 1, from: 'Frankfurt', to: 'Flagranti', date: '2022-03-28T19:00+01:00' });
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  delay(): void { }
}

@Injectable()
export class DefaultFlightService implements FlightService {
  // We will refactor this to an observable in a later exercise!
  flights: Flight[] = [];

  flights$ = new BehaviorSubject<Flight[]>([]);

  constructor(
    private http: HttpClient,
    @Inject(BASE_URL2) private baseUrl: string,
    private oauthStorage: OAuthStorage,
  ) { }

  load(from: string, to: string): void {

    // this.baseUrl = 'asdfsd';

    this.find(from, to).subscribe({
      next: (flights) => {
        this.flights = flights;
        this.flights$.next(flights);
      },
      error: (err) => {
        console.error('error', err);
      }
    });
  }


  find(from: string, to: string): Observable<Flight[]> {
    const url = this.baseUrl + '/flight';

    const headers = new HttpHeaders()
      .set('Accept', 'application/json');
    //.set('Authorization', this.oauthStorage.getItem('access_token') || '');

    const params = new HttpParams().set('from', from).set('to', to);

    return this.http.get<Flight[]>(url, { headers, params });
  }

  findById(id: string): Observable<Flight> {
    const url = this.baseUrl + '/flight';

    const headers = new HttpHeaders().set('Accept', 'application/json');

    const params = new HttpParams().set('id', id);

    return this.http.get<Flight>(url, { headers, params });
  }

  delay(): void {
    const oldFlights = this.flights;
    const oldFlight = this.flights[0];
    const date = new Date(this.flights[0].date);
    // date.setTime(date.getTime() + 1000 * 60 * 15);
    // this.flights[0].date = date.toISOString();
    const oldDate = new Date(oldFlight.date);
    const newDate = new Date(oldDate.getTime() + 1000 * 60 * 15);
    const newFlight = { ...oldFlight, date: newDate.toISOString() };
    const newFlighs = [newFlight, ...oldFlights.slice(1)];
    this.flights = newFlighs;

    this.flights$.next(newFlighs);

  }
}

@Injectable({
  providedIn: FlightBookingApiModule, //'root',
  useClass: DefaultFlightService
})
export abstract class FlightService {
  abstract flights: Flight[];
  abstract flights$: Observable<Flight[]>;
  abstract load(from: string, to: string): void;
  abstract delay(): void;
  abstract findById(id: string): Observable<Flight>;
  abstract find(from: string, to: string): Observable<Flight[]>;

}
