import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/userService';
import { UserType } from '../../shared/models/UserType.enum';
import{ Router, RouterOutlet } from '@angular/router'
import { NoteList } from "../notes/note-list/note-list";

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, NoteList],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  userService = inject(UserService)
  isAdmin = false;
  userdata = this.userService.user()
  constructor(private router: Router) { }

  ngOnInit(): void {
    // console.log('this is from dashboard :' + this.userdata.type, UserType.Admin)
    if (this.userdata.type === UserType.Admin) {
      this.isAdmin = true;
    }
//this.router.navigate(['/home/notes/']);
  }
  noteAdd(){
    this.router.navigate(['/home/notes/']);
  }

}
