import { Component, inject ,output,OnInit} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { UserService } from '../../../shared/services/userService';
import { UserDto } from '../../../shared/models/UserDto';
import { Router } from '@angular/router';
import { email } from '@angular/forms/signals';
import { JsonPipe } from '@angular/common';
import { UserType } from '../../../shared/models/UserType.enum';


@Component({
  selector: 'app-login',
  imports: [RouterLink, ɵInternalFormsSharedModule,ReactiveFormsModule,JsonPipe],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit{

  fb = inject(FormBuilder)
  userService = inject(UserService)
  router=inject(Router)
  lsUser:any={}

  ngOnInit(): void {
  this.lsUser=this.userService.user() as UserDto;
  }

  userForm=this.fb.group({
    email:['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });
login(){
  const user={
    email:this.userForm.controls.email.value,
    password:this.userForm.controls.password.value
  }
 const userresponse = this.userService.loginUser(user).subscribe({
      next: (response) => {
        alert('Login Successful');

        this.lsUser=response.user;
        delete this.lsUser.password
        this.userService.update(this.lsUser)
        localStorage.setItem('token',response.token)
        if(this.lsUser.type===UserType.User)
        {
        this.router.navigate(['/home/notes']);
        }
        else{
          this.router.navigate(['/home'])
        }
      },  
      error: (error) => {
        console.log('Login failed', error);
        alert('Login Failed');
      }
    });
}


  showPassword = false;
  isRegistered=false;

}
