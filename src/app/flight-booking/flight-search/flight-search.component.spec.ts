import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { RouterModule } from '@angular/router';
import { OAuthModule } from 'angular-oauth2-oidc';
import { OAuthAuthService } from 'src/app/shared/auth/auth.service';
import { FlightBookingModule } from '../flight-booking.module';

import { FlightSearchComponent } from './flight-search.component';
import { DummyFlightService, FlightService } from '../flight.service';

describe('FlightSearchComponent', () => {
  let component: FlightSearchComponent;
  let fixture: ComponentFixture<FlightSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule, OAuthModule.forRoot(), FlightBookingModule],
      providers: [{ provide: FlightService, useClass: DummyFlightService }]
      // declarations: [FlightSearchComponent]
    }).compileComponents();

    await TestBed.overrideComponent(FlightSearchComponent, {
      set: {
        providers: [{ provide: FlightService, useClass: DummyFlightService }]
      }
    }).compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should search when from and to are given', () => {
    component.from = 'Graz';
    component.to = 'Hamburg';
    component.search();
    expect(component.flights.length).toBe(3); // 3?
  });

  it('should not search when from and to are missing', () => {
    component.from = '';
    component.to = '';
    component.search();
    expect(component.flights.length).toBe(0);
  });

});
