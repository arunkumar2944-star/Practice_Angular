import { Routes } from '@angular/router';
import{Home} from './home/home';
import{User} from './user/user';
import{Login} from './login/login';
import { Notes } from './notes/notes';


export const routes: Routes = [

    
    {
        path: "", component: Home
    },
    {
        path: "user", component: User
    },
    {
        path: "login", component: Login
    },
    {
        path: "notes", component: Notes,
        
    },
    



    {
        path: "**", component: Home //wildcard entry should be in last
    }


];
