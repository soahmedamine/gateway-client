import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Refund {
  id?: number;
  amount: number;
  status: string;
  requestDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class RefundService {
  private baseUrl = 'http://localhost:8093/refund';

  constructor(private http: HttpClient) {}

  getRefunds(): Observable<Refund[]> {
    return this.http.get<Refund[]>(this.baseUrl);
  }

  addRefund(refund: Refund): Observable<Refund> {
    return this.http.post<Refund>(this.baseUrl, refund);
  }

  updateRefund(id: number, refund: Refund): Observable<Refund> {
    return this.http.put<Refund>(`${this.baseUrl}/${id}`, refund);
  }

  deleteRefund(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
