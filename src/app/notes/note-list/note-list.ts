import {
  CommonModule
} from '@angular/common';

import {
  Component,
  inject,
  OnInit,
  ChangeDetectorRef,
  NgZone, computed, Input, signal, SimpleChanges
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
  // notesList = signal<NoteDto[]>([]);
  @Input()
  notesList: NoteDto[] = [];

  filteredNotes: NoteDto[] = [];

  selectedTab = signal('all');

  showAll = false;

get displayedNotes(): NoteDto[] {

  return this.showAll
    ? this.filteredNotes
    : this.filteredNotes.slice(0, 6);

}

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
  ) { }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['notesList']) {
      this.filteredNotes = [...this.notesList];
    }

  }

  noteAdd() {
    this.router.navigate(['/home/notes/noteform']);

  }

  editNote(id: string) {

  }

  deleteNote(id: string) {

  }
  ngOnInit(): void {
     if (this.notesList.length === 0) {
      this.loadNotes();
    }

  }

  loadNotes() {
    this.noteService.getNoteByUserID().subscribe({
       next: (response) => {
        this.notesList = response.notes;
        this.filteredNotes = [...response.notes];

        this.cd.detectChanges();
        //  });
      }, error: (error) => {
        console.error('Get list failed', error);
        alert('Get list Failed');
      }
    });
  }
  loadAllNotes() {
    this.selectedTab.set('all');
    this.filteredNotes = [...this.notesList];
    // Your existing logic
  }

  loadFavorite() {
    this.selectedTab.set('favorite');

    this.filteredNotes = this.notesList.filter(
      note => note.isFavorite
    );
    // Your existing logic
  }

  loadPinned() {
    this.selectedTab.set('pinned');
    this.filteredNotes = this.notesList.filter(
      note => note.isPined
    );
    // Your existing logic
  }

  loadReminded() {
    this.selectedTab.set('reminded');
    this.filteredNotes = this.notesList.filter(
      note => note.isReminded
    );
    // Your existing logic
  }

}
