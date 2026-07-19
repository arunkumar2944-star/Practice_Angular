import {
  CommonModule,
} from '@angular/common';

import {
  Component,
  inject,
  OnInit,
  signal, SimpleChanges
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
  notesList = signal<NoteDto[]>([]);

  filteredNotes = signal<NoteDto[]>([]);

  selectedTab = signal('all');

  showAll = false;

   currentPage = 1;

    itemsPerPage = 6;

    totalPages = 0;
    totalNotes=0;

    paginatedNotes=signal<NoteDto[]>([]);

  get displayedNotes(): NoteDto[] {

    return this.showAll
      ? this.filteredNotes()
      : this.filteredNotes().slice(0, 6);
  }

  get notesCount(): number {

    return this.notesList().length;

  }
  router = inject(Router);
  // noteService = inject(NoteService);
  priority = Priority;

  constructor(
    private noteService: NoteService,
  ) { }

  // ngOnChanges(changes: SimpleChanges): void {

  //   if (changes['notesList']) {
  //     this.filteredNotes = [...this.notesList()];
  //   }

  // }

  noteAdd() {
    this.router.navigate(['/home/notes/noteform']);

  }

  editNote(id: string) {

  }

  deleteNote(id: string) {

  }
  ngOnInit(): void {

    console.log('Before API call');
    console.log('notesList:', this.notesList());
    console.log('filteredNotes:', this.filteredNotes);

    this.loadNotes();

  }

  loadNotes() {

    this.noteService.getNoteByUserID(this.currentPage,this.itemsPerPage,this.selectedTab()).subscribe({

      next: (response) => {

        console.log('API Response:', response);

        this.notesList.set(response.notes);

        this.filteredNotes.set(response.notes);

            this.currentPage = response.page;

        this.totalPages = response.totalPages;

        this.totalNotes = response.total;

        console.log('After API call');
        console.log('notesList:', this.notesList());
        console.log('filteredNotes:', this.filteredNotes);
        console.log('displayedNotes:', this.displayedNotes);

      },

      error: (error) => {

        console.error(error);

      }

    });

  }

  loadAllNotes() {
    this.selectedTab.set('all');
   this.loadNotes()

    // Your existing logic
  }

  loadFavorite() {

    this.selectedTab.set('favorite');

       this.loadNotes()


  }

  loadPinned() {

    this.selectedTab.set('pinned');

      this.loadNotes()


  }

  loadReminded() {

    this.selectedTab.set('reminded');

      this.loadNotes()


  }

  getTagColor(index: number): string {

    const colors = [

      'bg-indigo-100 text-indigo-700',

      'bg-green-100 text-green-700',

      'bg-yellow-100 text-yellow-700',

      'bg-pink-100 text-pink-700',

      'bg-blue-100 text-blue-700'

    ];

    return colors[index % colors.length];

  }
  redirect() {

  }

  getCategoryConfig(category: string) {
    const categories: any = {
      Work: {
        icon: '💼',
        class: 'bg-blue-100 text-blue-700'
      },
      Meeting: {
        icon: '🤝',
        class: 'bg-purple-100 text-purple-700'
      },
      Personal: {
        icon: '🏠',
        class: 'bg-green-100 text-green-700'
      },
      Study: {
        icon: '📚',
        class: 'bg-yellow-100 text-yellow-700'
      }
    };

    return categories[category] || {
      icon: '📂',
      class: 'bg-gray-100 text-gray-700'
    };
  }

  isToday(date: Date | string): boolean {
    const today = new Date();
    const reminderDate = new Date(date);

    return (
      today.getDate() === reminderDate.getDate() &&
      today.getMonth() === reminderDate.getMonth() &&
      today.getFullYear() === reminderDate.getFullYear()
    );
  }

  previousPage() {

  if (this.currentPage > 1) {

    this.currentPage--;

    this.loadNotes();
  }
}

nextPage() {

  if (this.currentPage < this.totalPages) {

    this.currentPage++;

    this.loadNotes();
  }
}

}
