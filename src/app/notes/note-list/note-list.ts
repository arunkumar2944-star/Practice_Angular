import {
  CommonModule
} from '@angular/common';

import {
  Component,
  inject,
  OnInit,
  ChangeDetectorRef,
  NgZone
} from '@angular/core';

import { RouterLink, Router } from '@angular/router';

import { NoteDto } from '../../../shared/models/Note.dto';
import { NoteService } from '../../../shared/services/note-service';
import { Priority } from '../../../shared/models/enum';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './note-list.html',
  styleUrl: './note-list.css',
})
export class NoteList implements OnInit {
  notesList: NoteDto[] = [];

  get notesCount(): number {
    console.log('Getter called:', this.notesList.length);
    return this.notesList.length;
  }
  router = inject(Router);
  // noteService = inject(NoteService);
  priority = Priority;
   constructor(
    private noteService: NoteService,
    private cd: ChangeDetectorRef,
    private zone: NgZone
  ) {}


  noteAdd() {
    this.router.navigate(['/home/notes/noteform']);

  }

  editNote(id: string) {

  }

  deleteNote(id: string) {

  }
  ngOnInit(): void {
    console.log('On Init Call' + this.notesList.length)
    this.loadNotes()

  }

  loadNotes() {
    this.noteService.getNoteByUserID().subscribe({
      next: (response) => {
         this.zone.run(() => {

        this.notesList = [...response.notes];

        console.log('Notes length:', this.notesList.length);

        this.cd.detectChanges();
         });
      }, error: (error) => {
        console.error('Get list failed', error);
        alert('Get list Failed');
      }
    });
  }
}
