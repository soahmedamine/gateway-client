import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { KeycloakAuthService } from '../keycloak-auth.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

private baseUrl = 'http://localhost:8093/feedback';

 /* constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIwR0xUX3YyUTU3QW5uNHpJaWt1UWZCb3FST');
    return new HttpHeaders({
      'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIxRzVEekd4Ym1qT2FweHQ0UlluM3Exc0R0NFd5NTRzUnlfQThaX0lyVFFVIn0.eyJleHAiOjIxNzY1MDIyOTIsImlhdCI6MTc0NDUwMjI5MiwianRpIjoidHJydGNjOmNiNzg4NmMxLTc2OGYtNDY4Mi1iMDIyLTUyYzdjMmY3YzA5YiIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9yZWFsbXMvcmVmdW5kLXJlYWxtIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjAzNTZiMmJkLTRlNmYtNDI2NC1hOWRmLWVlNTEyNTlmYzU3MiIsInR5cCI6IkJlYXJlciIsImF6cCI6IkFwaWdhdHdheTRzYWUxMCIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIiwiZGVmYXVsdC1yb2xlcy1yZWZ1bmQtcmVhbG0iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBvZmZsaW5lX2FjY2VzcyBwcm9maWxlIGVtYWlsIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJjbGllbnRIb3N0IjoiMTcyLjE4LjAuMSIsInByZWZlcnJlZF91c2VybmFtZSI6InNlcnZpY2UtYWNjb3VudC1hcGlnYXR3YXk0c2FlMTAiLCJjbGllbnRBZGRyZXNzIjoiMTcyLjE4LjAuMSIsImNsaWVudF9pZCI6IkFwaWdhdHdheTRzYWUxMCJ9.MARyWRSAn4QNiJooqbnznEyLIna2Ne2kWnzp5auUeIfMfRtKdmDHgJr9SB4iHtPaBh5ijAN0hP9eAjvNPtwWwp46UaZpHTylmNUrvV9XiItWPU9SF6L9jgsAw6mymwHUQEvLJnjjcgwmKUoMCJQcEgItsIX6RMf3XG7cGZwLPwfD429As6a4vcw1URhlOPqOjUiy1xmhIOjfmI4T3HKACBsrjkNKV7WAP66gdecthYvL38Amk9xlhNhMYFAVRBkmW0oyg6OlAsHsy7sGn0FlzgKdjA1fHUbXHG1Wv0gBvOhfJmRHZ54HVDNI5-6ZVHNoFQTESSrohllQG5S_dOoBLw`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Connection': 'keep-alive',
      'Accept-Encoding': 'gzip, deflate, br',
    });
  }*/
  constructor(private http: HttpClient, private keycloakAuth: KeycloakAuthService) {}

  getAllFeedbacks(): Observable<any[]> {
    return this.keycloakAuth.getAccessToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.http.get<any[]>(this.baseUrl, { headers });
      })
    );
  }

  addFeedback(feedback: any): Observable<any> {
    return this.keycloakAuth.getAccessToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.http.post<any>(this.baseUrl, feedback, { headers });
      })
    );
  }

  updateFeedback(id: number, feedback: any): Observable<any> {
    return this.keycloakAuth.getAccessToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.http.put<any>(`${this.baseUrl}/${id}`, feedback, { headers });
      })
    );
  }

  deleteFeedback(id: number): Observable<any> {
    return this.keycloakAuth.getAccessToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.http.delete(`${this.baseUrl}/${id}`, { headers });
      })
    );
  }

  downloadFeedbackPdf(): Observable<Blob> {
    return this.keycloakAuth.getAccessToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.http.get('http://localhost:8093/feedback/export/pdf', {
          headers,
          responseType: 'blob'
        });
      })
    );
  }

  downloadFeedbackPdfFiltered(status?: string): Observable<Blob> {
    return this.keycloakAuth.getAccessToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        let url = 'http://localhost:8093/feedback/export/pdf/tri';
        if (status) {
          url += `?status=${status}`;
        }
        return this.http.get(url, { headers, responseType: 'blob' });
      })
    );
  }
}
