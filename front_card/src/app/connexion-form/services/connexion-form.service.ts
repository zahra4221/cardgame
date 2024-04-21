import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConnexionFormService {
  private apiUrl = 'http://localhost:3010/api/auth/login'; 

  constructor(private http: HttpClient) {}

  login(login: string, password: string): Observable<any> {  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl, { login, password }, { headers })
      .pipe(
        catchError(this.handleError)  
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error.message);
    throw new Error('Error in HTTP operation');
  }
}
