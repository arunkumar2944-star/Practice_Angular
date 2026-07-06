import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBar } from '../shared/components/side-bar/side-bar';
import { UserDto } from '../shared/models/UserDto';
import { UserType } from '../shared/models/UserType.enum';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,SideBar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  protected readonly title = signal('Notes_App');
  users:UserDto[]=[];
  showPassword = false;


ngOnInit(): void {
 console.log('Welcome to note app')
}

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
