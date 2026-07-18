import { Component, inject, signal, computed, OnInit,Input } from '@angular/core';
import { NoteList } from "../note-list/note-list";
import { StatsCard } from './stats-card/stats-card';
import { CommonModule, LowerCasePipe } from '@angular/common'
import { NoteService } from '../../../shared/services/note-service';
// import { RouterLink, Router } from '@angular/router';
import { ReminderWidget } from './reminder-widget/reminder-widget';
import { NoteDto } from '../../../shared/models/Note.dto';
import { Status } from '../../../shared/models/enum';
import { ActivityDto } from '../../../shared/models/activity.dto';
import { RecentActivity } from './recent-activity/recent-activity';
@Component({
  selector: 'app-notes-dashboard',
  imports: [CommonModule,
    StatsCard, ReminderWidget, RecentActivity, NoteList],
  templateUrl: './notes-dashboard.html',
  styleUrl: './notes-dashboard.css',
})
export class NotesDashboard implements OnInit {
  noteService = inject(NoteService)
  notesList = signal<NoteDto[]>([]);
  searchText = signal('');
  debouncedSearch = signal('');


  loadNotes() {
    this.noteService.getNoteByUserID().subscribe({
      next: (response) => {
        //  this.zone.run(() => {

        this.notesList.set(response.notes)

        // console.log('Notes length:', JSON.stringify(this.notesList()));

        // this.cd.detectChanges();
        //  });
      }, error: (error) => {
        console.error('Get list failed', error);
        alert('Get list Failed');
      }
    });
  }

  ngOnInit(): void {
    this.loadNotes()
  }
  totalNotes = computed(() => this.notesList().length);

  favoriteNotes = computed(() =>
    this.notesList().filter(
      note => note.isFavorite
    ).length
  );

  pinnedNotes = computed(() =>
    this.notesList().filter(
      note => note.isPined
    ).length
  );

  archivedNotes = computed(() =>
    this.notesList().filter(
      note => note.status === Status.Archived
    ).length
  );


  upcomingReminders = computed(() => {

    return this.notesList()
      .filter(note =>
        note.reminderDate &&
        new Date(note.reminderDate) > new Date()
      )
      .sort((a, b) =>
        new Date(a.reminderDate!).getTime() -
        new Date(b.reminderDate!).getTime()
      )
      .slice(0, 5);

  });



  recentActivities = computed<ActivityDto[]>(() => {

    return this.notesList()

      .sort(
        (a, b) =>
          new Date(b.createdAt!).getTime() -
          new Date(a.createdAt!).getTime()
      )

      .slice(0, 8)

      .map(note => ({

        id: note._id!,

        title: note.title,

        type:
          note.isFavorite
            ? 'favorite'
            : note.isPined
              ? 'pinned'
              : note.status === Status.Archived
                ? 'archived'
                : 'created',

        date: note.createdAt!

      }));

  });

private timeoutId: any;

onSearch(event: Event): void {

  clearTimeout(this.timeoutId);

  const value = (event.target as HTMLInputElement).value;

  this.timeoutId = setTimeout(() => {

    this.debouncedSearch.set(value);

  }, 300);

}

filteredNotes = computed(() => {

  const search = this.debouncedSearch();

  if (!search) {
    return this.notesList();
  }

  return this.notesList().filter(note =>

    note.title.toLowerCase().includes(search) ||

    note.details.toLowerCase().includes(search) ||

    note.category.valueOf().toLowerCase().includes(search) ||

    note.tag.toLowerCase().includes(search)||
    note.priority.valueOf().toLowerCase().includes(search)||
    note.status.valueOf().toLowerCase().includes(search)

  );

});
  


}
