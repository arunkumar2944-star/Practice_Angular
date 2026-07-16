import { Component,inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { NoteList } from './note-list/note-list';
import { UserService } from '../../shared/services/userService';
import { CommonMethods } from '../../shared/services/common.methods';

@Component({
  selector: 'app-notes',
  imports: [RouterOutlet,NoteList],
  templateUrl: './notes.html',
  styleUrl: './notes.css',
})
export class Notes {
  userService = inject(UserService)
  common =new CommonMethods();
  userdata=this.common.getfromLS('user');
  

  
}
