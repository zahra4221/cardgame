import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConnexionFormService } from '../../services/connexion-form.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-connexion-form',
  templateUrl: './connexion-form.component.html',
  styleUrls: ['./connexion-form.component.scss']
})
export class ConnexionFormComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private connexionService: ConnexionFormService, 
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],  
      password: ['', [Validators.required]]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.connexionService.login(username, password).subscribe({
        next: (response) => {
          this.authService.login();
          this.snackBar.open('Connexion réussie', 'Fermer', { 
            duration: 3000,
           }); 
          console.log('Connexion réussie', response);
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/game-page';
          this.router.navigate(['/game-page']);
        },
        error: (error) => {
          this.snackBar.open('Échec de la connexion: Identifiants incorrects', 'Fermer', { duration: 3000, panelClass: ['custom-snackbar']  });  
          console.error('Échec de la connexion', error);
        }
      });
    } else {
      this.snackBar.open('Veuillez remplir tous les champs', 'Fermer', { duration: 3000 });  
    }
  }
}
