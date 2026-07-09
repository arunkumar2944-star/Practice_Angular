import { Component } from '@angular/core';
import { output } from '@angular/core';
import { RouterLink } from "@angular/router";



@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
registerClicked = output<void>();

createAccount() {
  this.registerClicked.emit();
}
  showPassword = false;
  isRegistered=false;

}
