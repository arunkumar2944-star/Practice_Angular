import { Component } from '@angular/core';
import { NoteList } from "../note-list/note-list";

@Component({
  selector: 'app-notes-dashboard',
  imports: [NoteList],
  templateUrl: './notes-dashboard.html',
  styleUrl: './notes-dashboard.css',
})
export class NotesDashboard {}
