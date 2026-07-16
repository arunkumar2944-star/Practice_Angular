import { Component, inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';

import { UserService } from '../../../shared/services/userService';
import { passwordStrengthValidator, passwordMatchValidator } from '../password.validator';
import { disabled } from '@angular/forms/signals';
import { UserDto } from '../../../shared/models/UserDto';
import { CommonMethods } from '../../../shared/services/common.methods';
@Component({
  selector: 'app-updatepassword',
  imports: [ReactiveFormsModule],
  templateUrl: './updatepassword.html',
  styleUrl: './updatepassword.css',
})
export class Updatepassword implements OnInit {

  showNPassword = false;
  showCurPassword = false;
  showCnfPassword = false;
  isSamePassword = false;
  isComparePwd = true;
  isSamecnfPassword = false;
  common =new CommonMethods();

  @ViewChild('currentPasswordInput')
  currentPasswordInput!: ElementRef<HTMLInputElement>;

  @ViewChild('newPwdInput')
  newPwdInput!: ElementRef<HTMLInputElement>;

  @ViewChild('cnfPwdInput')
  cnfPwdInput!: ElementRef<HTMLInputElement>;


  router = inject(Router)
  fb = inject(FormBuilder)
  userService = inject(UserService)
  user:any={}
  changePasswordForm = this.fb.group({
    curPassword: [
      '',
      [Validators.required, Validators.minLength(8), passwordStrengthValidator()]
    ],

    password: [
      { value: '', disabled: true },

      [Validators.required, Validators.minLength(8), passwordStrengthValidator()]
    ],
    confirmPassword: [{ value: '', disabled: true }, [Validators.required]]
  }, {
    // Note: Validators are passed inside an options object at the group level
    validators: passwordMatchValidator()
  })
  ngOnInit(): void {
    this.changePasswordForm.controls.password.disable()
    this.changePasswordForm.controls.confirmPassword.disable()
    queueMicrotask(() => {
      this.currentPasswordInput.nativeElement.focus();
    });
  }

  checkPassword() {
    this.user = this.common.getfromLS('user');

    const cmpPassword = {
      email: this.user.email,
      password: this.changePasswordForm.controls.curPassword.value
    };

    const result = this.userService.comparePassword(cmpPassword).subscribe({
      next: (response) => {
        if (response.isMatched) {
          this.changePasswordForm
            .get('curPassword')
            ?.setErrors(null);
          this.changePasswordForm.controls.curPassword.markAsUntouched();
          this.isComparePwd = true;

          this.changePasswordForm
            .get('password')
            ?.enable();

          this.changePasswordForm
            .get('confirmPassword')
            ?.enable();

          setTimeout(() => {
            this.newPwdInput.nativeElement.focus();
          });


        }
        else {
          // alert('Function called else');
          // alert('Password Miss match please enter correct password');
          this.isComparePwd = false;

          this.changePasswordForm
            .get('curPassword')
            ?.setErrors({
              passwordMismatch: true
            });

          this.changePasswordForm
            .get('password')
            ?.disable();

          this.changePasswordForm
            .get('confirmPassword')
            ?.disable();

          queueMicrotask(() => {
            this.currentPasswordInput.nativeElement.focus();
          });
        }


      },
      error: (error) => {
        console.log('Password Incorect', error);
        // alert('password Incorect');
      }
    });

  }

  comparenewPwd() {

    const currentPassword =
      this.changePasswordForm.controls.curPassword.value;

    const newPassword =
      this.changePasswordForm.controls.password.value;

    if (currentPassword === newPassword) {

      this.isSamePassword = true;

      this.changePasswordForm.controls.password.setErrors({
        samePassword: true
      });

      queueMicrotask(() => {
        this.newPwdInput.nativeElement.focus();
      });

    } else {

      this.isSamePassword = false;

      this.changePasswordForm.controls.password.setErrors(null);
    }
  }


  cmpcnfpwd() {
    const newpwd = this.changePasswordForm.controls.password.value;
    const cnfpwd = this.changePasswordForm.controls.confirmPassword.value;

    if (newpwd === cnfpwd) {

      this.isSamecnfPassword = true;

      this.changePasswordForm.controls.confirmPassword.setErrors(null);



    } else {

      this.isSamecnfPassword = false;

      this.changePasswordForm.controls.confirmPassword.setErrors({

        samepwd: true
      });
       queueMicrotask(() => {
        this.cnfPwdInput.nativeElement.focus();
      });
    }

  }

  updatePassword() {

    const data={
      email:this.user.email,
      password:this.changePasswordForm.controls.password.value
    }

     const result = this.userService.updatePassword(data).subscribe({
      next: (response) => {
        if(response.isUpdated){
          this.router.navigate(['/login'])
        }

      },error: (error) => {
        console.log('Password Incorect', error);
        // alert('password Incorect');
      }
    });

    this.reset()
  }

  reset() {
    this.changePasswordForm.reset();

    this.changePasswordForm.controls.password.disable();

    this.changePasswordForm.controls.confirmPassword.disable();

    this.isSamePassword = false;

    queueMicrotask(() => {
      this.currentPasswordInput.nativeElement.focus();
    });
  }

}
