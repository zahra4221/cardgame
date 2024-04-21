import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, delay, mapTo, Observable, of } from "rxjs";
import { InscriptionFormValue } from "../models/inscription-form-value.model";

@Injectable()
export class InscriptionFormService {
  private apiUrl = 'http://localhost:3010/api/profiles';  

  constructor(private http: HttpClient) {}

  saveUserInfo(formValue: InscriptionFormValue): Observable<boolean> {
    return this.http.put(this.apiUrl, formValue) 
      .pipe(
        mapTo(true),
        delay(1000),
        catchError(() => of(false).pipe(
          delay(1000)
        ))
      );
  }
}
