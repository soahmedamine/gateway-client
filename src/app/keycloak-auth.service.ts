// ✅ keycloak-auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeycloakAuthService {
  private tokenUrl = 'http://localhost:8080/realms/refund-realm/protocol/openid-connect/token';

  private clientId = 'Apigatway4sae10';
  private clientSecret = '**********'; // ⚠️ à garder secret en prod

  constructor(private http: HttpClient) {}

  getAccessToken(): Observable<string> {
    const body = new HttpParams()
      .set('grant_type', 'client_credentials')
      .set('client_id', this.clientId)
      .set('client_secret', this.clientSecret);

    return this.http.post<any>(this.tokenUrl, body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).pipe(map(response => response.access_token));
  }
}
