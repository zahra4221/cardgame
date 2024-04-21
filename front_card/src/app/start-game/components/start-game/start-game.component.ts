import { Component, OnInit } from '@angular/core';
import { CardsService } from '../../services/cards.service';
import { Card } from '../../models/card.model';

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.scss'] 
})
export class StartGameComponent implements OnInit {
  cards: Card[] = [];
  newCard: Partial<Card> = {};  
  showModal: boolean = false; 

  constructor(private cardsService: CardsService) {}

  ngOnInit(): void {
    this.loadAllCards();
  }

  loadAllCards(): void {
    this.cardsService.getAllCards().subscribe({
      next: (data) => {
        this.cards = data;
      },
      error: (e) => console.error('Failed to fetch cards', e)
    });
  }

  addCard(): void {
    if (this.newCard.name && this.newCard.value) {
      this.cardsService.addCard(this.newCard).subscribe({
        next: (card) => {
          this.cards.push(card);
          this.newCard = {name: '', value: 0};
          this.showModal = false;
        },
        error: (e) => {
          console.error('Failed to add card', e);
          alert('Failed to add card: ' + e.message);
          this.showModal = false; 
        }
      });
    }
  }

  updateCard(card: Card): void {
    this.cardsService.updateCard(card).subscribe({
      next: (updatedCard) => {
        const index = this.cards.findIndex(c => c.id === updatedCard.id);
        if (index !== -1) {
          this.cards[index] = updatedCard;
        }
      },
      error: (e) => {
        console.error('Failed to update card', e);
        alert('Failed to update card: ' + e.message);
      }
    });
  }

  deleteCard(id: number): void {
    this.cardsService.deleteCard(id).subscribe({
      next: () => {
        this.cards = this.cards.filter(card => card.id !== id);
      },
      error: (e) => {
        console.error('Failed to delete card', e);
        alert('Failed to delete card: ' + e.message);
      }
    });
  }
}
