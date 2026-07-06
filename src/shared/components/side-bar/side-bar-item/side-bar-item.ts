import { Component, Input } from '@angular/core';
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-side-bar-item',
  imports: [RouterLink],
  templateUrl: './side-bar-item.html',
  styleUrl: './side-bar-item.css',
})
export class SideBarItem {

   @Input () route!:{path:string[],name:string};
}
