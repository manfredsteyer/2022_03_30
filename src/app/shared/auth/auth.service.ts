import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({ providedIn: 'root' })
export class AuthService {

    userName = '';


    login(userName: string, password: string): void {
        this.userName = userName;
    }

    logout(): void {
        this.userName = '';
    }

}


@Injectable()
export class OAuthAuthService {
    constructor(private oauthService: OAuthService) { }

    // userName = '';

    get userName() {
        const claims = this.oauthService.getIdentityClaims() as any;
        return claims?.given_name;
    }

    login(userName: string, password: string): void {
        // Auth for honest users TM!

        // this.oauthService.hasValidAccessToken
        // this.oauthService.hasValidIdToken

        this.oauthService.initCodeFlow();
    }

    logout(): void {
        this.oauthService.logOut();
    }

}
