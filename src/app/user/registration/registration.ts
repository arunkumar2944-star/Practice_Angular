import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../shared/services/userService';
import { UserDto } from '../../../shared/models/UserDto';
import { Router } from '@angular/router';
import { UserType } from '../../../shared/models/enum';
import { passwordStrengthValidator, passwordMatchValidator } from '../password.validator';
@Component({
  selector: 'app-registration',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './registration.html',
  styleUrl: './registration.css',
})
export class Registration {


  fb = inject(FormBuilder)
  userService = inject(UserService)
  router = inject(Router)
  showPassword = false;
  showConfirmPassword = false;

  userForm = this.fb.group({
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

    password: [
      '',
      [Validators.required, Validators.minLength(8), passwordStrengthValidator()]
    ],
    confirmPassword: ['', [Validators.required]]
  }, {
    // Note: Validators are passed inside an options object at the group level
    validators: passwordMatchValidator()
  });

  register() {
    // this.userService.createUser()
    const User:UserDto = {
      id: '',
      name: this.userForm.controls.name.value ?? '',
      age: this.userForm.controls.age.value ?? 0,
      gender: this.userForm.controls.gender.value ?? '',
      email: this.userForm.controls.email.value ?? '',
      type: UserType.User,
      password: this.userForm.controls.password.value ?? '',
      phoneNo: Number(this.userForm.controls.phoneNo.value ?? 0),
      confirmPassword:this.userForm.controls.confirmPassword.value ?? ''
    }
 

    this.userService.createUser(User).subscribe({
      next: (response) => {
        alert('Registration Successful');
        this.router.navigate(['/login']);

      },
      error: (error) => {
        console.error('Registration failed', error);
        alert('Registration Failed');
      }

    });
  }
}
