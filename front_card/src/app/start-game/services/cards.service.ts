import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Card } from '../models/card.model';  

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  private apiUrl = 'http://localhost:3000/api/cards';
  private usedIds = new Set<number>();  

  constructor(private http: HttpClient) {}

  getAllCards(): Observable<Card[]> {
    return this.http.get<Card[]>(this.apiUrl).pipe(
      tap(cards => {
        this.usedIds.clear();
        cards.forEach(card => this.usedIds.add(card.id));
      })
    );
  }

  addCard(card: Partial<Card>): Observable<Card> {
    return this.http.put<Card>(this.apiUrl, card); 
  }

  updateCard(card: Card): Observable<Card> {
    return this.http.post<Card>(this.apiUrl, card);  
  }

  deleteCard(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
