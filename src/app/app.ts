import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { SideBar } from '../shared/components/side-bar/side-bar';
import { UserDto } from '../shared/models/UserDto';
import { UserType } from '../shared/models/enum';
import { Login } from "./user/login/login";
import { Registration } from './user/registration/registration';
import { Landing } from "./user/landing/landing";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SideBar, Landing, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  protected readonly title = signal('Notes_App');
  users:UserDto[]=[];
  showPassword = false;
  isRegistered=false;


ngOnInit(): void {
 console.log('Welcome to note app')
}
user={}
// users:UserDto[]=[
//   {
//     id:1,
//     name:'Admin',
//     age:36,
//     gender:'Male',
//     userID:'Admin',
//     password:'Admin',
//     usertype:UserType.Admin
//   },
//   {
//     id:2,
//     name:'Arunkumar',
//     age:36,
//     gender:'Male',
//     userID:'s.arunkumar2944@gmail.com',
//     password:'Arun@19',
//     usertype:UserType.User
//   }

// ]




}
