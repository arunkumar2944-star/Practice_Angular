import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBar } from '../../shared/components/side-bar/side-bar';
@Component({
  selector: 'app-home',
  imports: [RouterOutlet, SideBar],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
