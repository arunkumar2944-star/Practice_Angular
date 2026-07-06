import { Component } from '@angular/core';
import { SideBarItem } from './side-bar-item/side-bar-item';

@Component({
  selector: 'app-side-bar',
  imports: [SideBarItem],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.css',
})
export class SideBar {

routes=[

  { path: ['/'], name: 'Home' },
    { path: ['/', 'notes'], name: 'Notes' },
    { path: ['/', 'user'], name: 'User' },
]


}
