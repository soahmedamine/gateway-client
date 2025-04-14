import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KeycloakServiceService {
 /* private keycloakInstance: Keycloak;

  constructor() {
    this.keycloakInstance = new Keycloak({
      url: 'http://localhost:8080', // Remplace par 'http://keycloak:8080' si Angular est en Docker
      realm: 'refund-realm',
      clientId: 'Apigatway4sae10'
    });
  }

  init(): Promise<void> {
    return this.keycloakInstance.init({
      onLoad: 'login-required',
      checkLoginIframe: false
    }).then(() => {
      console.log('[Keycloak] Authenticated');
    }).catch(err => {
      console.error('[Keycloak] Failed to initialize', err);
    });
  }

  getToken(): string | undefined {
    return this.keycloakInstance.token;
  }

  logout(): void {
    this.keycloakInstance.logout();
  }

  isAuthenticated(): boolean {
    return !!this.keycloakInstance.token;
  }

  getUsername(): string {
    return this.keycloakInstance.tokenParsed?.preferred_username || '';
  }*/
}
