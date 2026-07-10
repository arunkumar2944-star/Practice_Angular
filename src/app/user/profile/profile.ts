import { Component,inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {

  router=inject(Router)

   isEdit = false;

  user = JSON.parse(localStorage.getItem('user') || '{}');

  isAdmin = this.user.type === 0;

  updateProfile() {

    console.log(this.user);

    // Call API here

    alert('Profile updated successfully');

    this.isEdit = false;
  }
  // redirect(){
  //   this.router.navigate(['/home']);
  // }
}
