import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from "@angular/forms";
import { UserService } from '../../../shared/services/userService';
import { UserType } from '../../../shared/models/UserType.enum';
import { CommonModule } from '@angular/common';
import { UserDto } from '../../../shared/models/UserDto';

@Component({
  selector: 'app-profile',
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {

  router = inject(Router)
  fb = inject(FormBuilder)
  userService = inject(UserService)

  isEdit = false;

  user: any = JSON.parse(localStorage.getItem('user') || '{}');

  isAdmin = this.user.type === UserType.Admin;
  lsUser: any = {}

  profileForm = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]
    ],

    age: [
      null,
      [
        Validators.required,
        Validators.min(18),
        Validators.max(100)
      ]
    ],

    gender: [
      '',
      [
        Validators.required
      ]
    ],

    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],

    phoneNo: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[6-9]\d{9}$/)
      ]
    ],


  })
  ngOnInit() {
    this.profileForm.patchValue({
      name: this.user.name,
      email: this.user.email,
      phoneNo: this.user.phoneNo,
      age: this.user.age,
      gender: this.user.gender
    });
  }
  updateProfile() {

    if (this.profileForm.controls.name.value === this.user.name && this.profileForm.controls.email.value === this.user.email
      && this.profileForm.controls.phoneNo?.value === this.user.phoneNo && this.profileForm.controls.age.value === this.user.age
      && this.profileForm.controls.gender.value === this.user.gender) {
      this.isEdit = false;

    }
    else {
      this.userService.updateUser(this.user._id, this.profileForm.value).subscribe({
        next: (response) => {
          this.userService.update(response.user)
          this.user = response.user;

          this.profileForm.patchValue(this.user);

          this.isEdit = false;
          // this.user = this.userService.user()
          // this.router.navigate(['/home/profile']);
          // this.isEdit = false

        },
        error: (error) => {
          console.log('Update failed', error);
        }
      })
    }


  }
  // redirect(){
  //   this.router.navigate(['/home']);
  // }
}
