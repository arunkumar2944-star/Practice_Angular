import { Routes } from '@angular/router';
import { Home } from './home';
import { Dashboard } from '../dashboard/dashboard';
import { Notes } from '../notes/notes';
import { User } from '../user/user';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    component: Home,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: Dashboard
      },
      {
        path: 'notes',
        component: Notes
      },
      {
        path: 'user',
        component: User
      }
    ]
  }
];