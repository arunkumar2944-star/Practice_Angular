import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NoteDto } from '../../../../shared/models/Note.dto';
import { Priority } from '../../../../shared/models/enum';

@Component({
  selector: 'app-reminder-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reminder-widget.html',
  styleUrl: './reminder-widget.css'
})
export class ReminderWidget {

  @Input() reminders: NoteDto[] = [];

  priority = Priority;

  getRemainingTime(date: Date | string): string {

    const reminderDate = new Date(date);

    const now = new Date();

    const diff = reminderDate.getTime() - now.getTime();

    const minutes = Math.floor(diff / (1000 * 60));

    const hours = Math.floor(minutes / 60);

    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day(s) left`;
    }

    if (hours > 0) {
      return `${hours} hour(s) left`;
    }

    if (minutes > 0) {
      return `${minutes} minute(s) left`;
    }

    return 'Expired';
  }
}