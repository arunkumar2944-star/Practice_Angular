import { Routes } from '@angular/router';
import { Notes } from './notes';
import { NoteList } from './note-list/note-list';
import { Dashboard } from '../dashboard/dashboard';
import { NoteForm } from './note-form/note-form';
import { NoteDetails } from './note-details/note-details';



export const NOTE_ROUTES: Routes = [
    {
        path: '',
        component: Notes,
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'

            },
            {
                path:'noteform',
                component:NoteForm
            },
            {
                path:'notelist',
                component:NoteList
            },
            {
                path:'note',
                component:NoteDetails
            }
        ]
    }

]