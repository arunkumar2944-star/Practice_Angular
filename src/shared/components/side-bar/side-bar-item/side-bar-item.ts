import { Component, Input } from '@angular/core';
import { RouterLink } from "@angular/router";
import { UserType } from '../../../models/enum';


@Component({
  selector: 'app-side-bar-item',
  imports: [RouterLink],
  templateUrl: './side-bar-item.html',
  styleUrl: './side-bar-item.css',
})
export class SideBarItem {

   @Input () route!:{title:string,route:string,icon:string,description:string,allowedUserType:UserType};
}
