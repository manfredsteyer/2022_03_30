// src/app/app.module.ts

import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { SharedModule } from './shared/shared.module';
import { BasketComponent } from './basket/basket.component';
import { DefaultFlightService, DummyFlightService } from './flight-booking/flight.service';
import { BASE_URL, FLIGHT_SERVICES } from './app.tokens';
import { OAuthModule } from 'angular-oauth2-oidc';
import { CustomPreloadingStrategy } from './shared/preload/custom-preloading.strategy';

const DEBUG = false;

@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES, {
      enableTracing: true,
      errorHandler: () => { console.error('routing error'); },
      // preloadingStrategy: CustomPreloadingStrategy
    }),
    HttpClientModule,
    BrowserModule,
    // FlightBookingModule, // Do not import lazy modules!!
    SharedModule.forRoot(),
    OAuthModule.forRoot({
      resourceServer: {
        sendAccessToken: true,
        allowedUrls: ['http://www.angular.at/api/']
      }
    })
  ],
  declarations: [AppComponent, SidebarComponent, NavbarComponent, HomeComponent, AboutComponent, NotFoundComponent, BasketComponent],
  providers: [
    // {
    // provide: FlightService,
    //useValue: new DummyFlightService()
    // useClass: DummyFlightService,
    // useFactory: {(http: HttpClient) => {
    //   if (DEBUG) {
    //     return new DummyFlightService();
    //   }
    //   else {
    //     return new DefaultFlightService(http);
    //   }
    // },
    // deps: [HttpClient]
    // }
    {
      provide: BASE_URL,
      useValue: 'http://www.angular.at/api'
    },
    {
      provide: FLIGHT_SERVICES,
      useClass: DefaultFlightService,
      multi: true
    },
    {
      provide: FLIGHT_SERVICES,
      useClass: DummyFlightService,
      multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
