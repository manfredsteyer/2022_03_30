import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Hello World!';
  loading = false;
  constructor(private router: Router, private oauthService: OAuthService) {
  }

  ngOnInit(): void {

    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();

    this.router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        this.loading = true;

      }
      else if (e instanceof NavigationEnd
        || e instanceof NavigationCancel
        || e instanceof NavigationError
      ) {

        this.loading = false;

      }
    });
  }

}
