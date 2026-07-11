import { Routes } from '@angular/router';
import { Home } from './home';
import { Dashboard } from '../dashboard/dashboard';
import { Notes } from '../notes/notes';
import { User } from '../user/user';
import{Profile} from '../user/profile/profile'
import { Updatepassword } from '../user/updatepassword/updatepassword';
import { NOTE_ROUTES } from '../notes/note.routes';

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
        path: 'profile',
        component: Profile
      },
      {
        path: 'user',
        component: User
      },
      {
        path: 'updatepassword',
        component: Updatepassword
      },
      {
        path:'notes',
        children:NOTE_ROUTES
      },


      {
              path: "**", component: Dashboard //wildcard entry should be in last
          }
    ]
  }
];