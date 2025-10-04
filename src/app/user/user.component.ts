import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CartModel } from '../../models/cart.model';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-user',
  imports: [NgIf, NgFor, MatButtonModule, MatCardModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  cart: CartModel[] = []
  

  constructor(private router: Router){
    if (!UserService.getActiveUser()){
      //if not logged in redirect to home
      router.navigate(['/'])
      return
    }

    this.cart = UserService.getActiveUser()!.cart
  }

  public doChangePassword(){
    const newPassword = prompt('Unesite novu lozinku.')
    if(newPassword == '' || newPassword == null){
      alert('Polje lozinke ne može biti prazno!')
      return
    }
    alert(UserService.changePassword(newPassword)?'Uspešno promenjena lozinka':'Neuspešna promena lozinke')
  }
}
