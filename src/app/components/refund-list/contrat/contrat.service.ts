

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap, map } from 'rxjs';
import { KeycloakAuthService } from '../../../keycloak-auth.service';

// src/app/contrat/contract.model.ts
export interface Contract {
  idContrat?: number;
  number: string;
  startDate: string;
  endDate: string;
  status: string;
  clientEmail: string;
}


@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private baseUrl = 'http://localhost:8093/api/contrats';

  constructor(private http: HttpClient, private keycloakAuth: KeycloakAuthService) {}

  private authHeaders(): Observable<HttpHeaders> {
    return this.keycloakAuth.getAccessToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return new Observable<HttpHeaders>(observer => {
          observer.next(headers);
          observer.complete();
        });
      })
    );
  }

  getAll(): Observable<Contract[]> {
    return this.authHeaders().pipe(
      switchMap(headers => this.http.get<Contract[]>(`${this.baseUrl}/all`, { headers }))
    );
  }

  add(contract: Contract): Observable<Contract> {
    return this.authHeaders().pipe(
      switchMap(headers => this.http.post<Contract>(`${this.baseUrl}/add`, contract, { headers }))
    );
  }

  update(id: number, contract: Contract): Observable<Contract> {
    return this.authHeaders().pipe(
      switchMap(headers => this.http.put<Contract>(`${this.baseUrl}/update/${id}`, contract, { headers }))
    );
  }

  delete(id: number): Observable<void> {
    return this.authHeaders().pipe(
      switchMap(headers => this.http.delete<void>(`${this.baseUrl}/${id}`, { headers }))
    );
  }

  findByNumber(number: string): Observable<Contract> {
    return this.authHeaders().pipe(
      switchMap(headers => this.http.get<Contract>(`${this.baseUrl}/search-by-number/${number}`, { headers }))
    );
  }
}