import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,   // ✅ obavezno za standalone aplikaciju
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    RouterLink,        // ✅ routerLink će sad raditi
    RouterLinkActive   // (opciono, ako koristiš routerLinkActive)
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  // ✅ mora u množini
})
export class LoginComponent {
  public email: string = '';
  public password: string = '';

  constructor(private router: Router) {
    if (UserService.getActiveUser()) {
      router.navigate(['/user']);
      return;
    }
  }

  public doLogin() {
    if (UserService.login(this.email, this.password)) {
      // Redirect to user component
      this.router.navigate(['/user']);   // ✅ bolje na /user nego /home
      return;
    }

    alert('Pogrešan mail ili lozinka!');
  }
}
