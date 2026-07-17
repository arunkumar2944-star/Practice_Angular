import { Routes } from '@angular/router';
import { Notes } from './notes';
import { NoteList } from './note-list/note-list';
import { Dashboard } from '../dashboard/dashboard';
import { NoteForm } from './note-form/note-form';
import { NoteDetails } from './note-details/note-details';
import { NotesDashboard } from './notes-dashboard/notes-dashboard';
import { ArchivedNotes } from './archived-notes/archived-notes';
import { CompletedNotes } from './completed-notes/completed-notes';
import { FavoriteNotes } from './favorite-notes/favorite-notes';
import { NoteEdit } from './note-edit/note-edit';
import { RecentNotes } from './recent-notes/recent-notes';
import { TrashedNotes } from './trashed-notes/trashed-notes';



export const NOTE_ROUTES: Routes = [
  {
    path: '',
    component: Notes,
    children: [

      {
        path: '',
        component: NotesDashboard
      },

      {
        path: 'noteform',
        component: NoteForm
      },

      {
        path: 'notelist',
        component: NoteList
      },

      {
        path: 'note/:id',
        component: NoteDetails
      },

      {
        path: 'edit/:id',
        component: NoteEdit
      },

      {
        path: 'archived',
        component: ArchivedNotes
      },

      {
        path: 'completed',
        component: CompletedNotes
      },

      {
        path: 'favorites',
        component: FavoriteNotes
      },

      {
        path: 'recent',
        component: RecentNotes
      },

      {
        path: 'trash',
        component: TrashedNotes
      }
    ]
  }
];