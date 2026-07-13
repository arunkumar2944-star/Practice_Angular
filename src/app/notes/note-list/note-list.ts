import { Component,inject } from '@angular/core';
import { RouterLink ,Router} from "@angular/router";

@Component({
  selector: 'app-note-list',
  imports: [RouterLink],
  templateUrl: './note-list.html',
  styleUrl: './note-list.css',
})
export class NoteList {
  router=inject(Router)
  
noteAdd(){
        this.router.navigate(['/home/notes/noteform']);

}

}
