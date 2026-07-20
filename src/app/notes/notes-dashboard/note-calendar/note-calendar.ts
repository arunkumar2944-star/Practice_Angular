import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-note-calendar',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './note-calendar.html',
  styleUrl: './note-calendar.css'
})
export class NoteCalendarComponent implements OnInit {

  @Input() reminders: any[] = [];

  today = new Date();

currentMonth = this.today.getMonth();

currentYear = this.today.getFullYear();

monthName = '';

weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

calendarDays: {
  day: number | null;
  isToday: boolean;
  hasReminder: boolean;
}[] = [];

ngOnInit(): void {

  this.generateCalendar();
}

 generateCalendar(): void {

  this.calendarDays = [];

  const firstDay = new Date(
    this.currentYear,
    this.currentMonth,
    1
  );

  const lastDay = new Date(
    this.currentYear,
    this.currentMonth + 1,
    0
  );

  this.monthName = firstDay.toLocaleString(
    'default',
    {
      month: 'long',
      year: 'numeric'
    }
  );

  let startDay = firstDay.getDay();

  startDay = startDay === 0 ? 6 : startDay - 1;

  // Empty boxes before first day

  for (let i = 0; i < startDay; i++) {

    this.calendarDays.push({
      day: null,
      isToday: false,
      hasReminder: false
    });
  }

  // Actual dates

  for (let day = 1; day <= lastDay.getDate(); day++) {

    const currentDate = new Date(
      this.currentYear,
      this.currentMonth,
      day
    );

    const isToday =
      currentDate.toDateString() ===
      new Date().toDateString();

    const hasReminder = this.reminders.some(
      reminder =>
        new Date(
          reminder.reminderDate
        ).toDateString() ===
        currentDate.toDateString()
    );

    this.calendarDays.push({

      day,

      isToday,

      hasReminder
    });
  }
}

previousMonth(): void {

  if (this.currentMonth === 0) {

    this.currentMonth = 11;

    this.currentYear--;

  } else {

    this.currentMonth--;
  }

  this.generateCalendar();
}

nextMonth(): void {

  if (this.currentMonth === 11) {

    this.currentMonth = 0;

    this.currentYear++;

  } else {

    this.currentMonth++;
  }

  this.generateCalendar();
}
}