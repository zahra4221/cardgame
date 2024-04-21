import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InscriptionFormService } from '../../services/inscription-form.service';

@Component({
  selector: 'app-inscription-form',
  templateUrl: './inscription-form.component.html',
  styleUrls: ['./inscription-form.component.scss']
})
export class InscriptionFormComponent implements OnInit {
  mainForm!: FormGroup;
  isSubmitted = false; 

  constructor(
    private formBuilder: FormBuilder,
    private inscriptionService: InscriptionFormService,
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.initMainForm();
  }

  private initMainForm(): void {
    this.mainForm = this.formBuilder.group({
      name: ['', Validators.required],
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmitForm(): void {
    if (this.mainForm.valid) {
      this.inscriptionService.saveUserInfo(this.mainForm.value).subscribe({
        next: (success) => {
          this.isSubmitted = true; 
        },
        error: (error) => {
          console.error('Erreur lors de l\'inscription', error);
        }
      });
    }
  }
}
