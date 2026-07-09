import { Routes } from '@angular/router';
import{Home} from './home/home';
import{User} from './user/user';
import{Login} from './user/login/login';
import { Notes } from './notes/notes';
import { Registration } from './user/registration/registration';
import { Landing } from './user/landing/landing';
import { HOME_ROUTES } from './home/home.routes';
export const routes: Routes = [

    
    {
        path: "", component: Landing
    },
    {
        path: "login", component: Login
    },
    
    
    {
        path: "register", component: Registration,
        
    },
    // {
    //     path: "home", component: Home,
        
    // },
    {
    path: 'home',
    children: HOME_ROUTES
  },


    {
        path: "**", component: Landing //wildcard entry should be in last
    }


];
