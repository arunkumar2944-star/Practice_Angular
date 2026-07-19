import { CommonModule } from '@angular/common';

import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges, computed
} from '@angular/core';

import { Router } from '@angular/router';

import { NoteDto } from '../../../../shared/models/Note.dto';

@Component({
  selector: 'app-note-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './note-grid.html',
  styleUrl: './note-grid.css'
})
export class NoteGrid implements OnChanges {

  @Input()
  notesList: NoteDto[] = [];

  router = inject(Router);

  filteredNotes: NoteDto[] = [];

  showAll = false;

  get displayedNotes(): NoteDto[] {

    return this.showAll
      ? this.filteredNotes
      : this.filteredNotes.slice(0, 6);

  }

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
    console.log('redirect event call')
    this.router.navigate(['/home/notes/notelist']);

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

}