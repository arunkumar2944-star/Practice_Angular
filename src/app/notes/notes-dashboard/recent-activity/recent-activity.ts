import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivityDto } from '../../../../shared/models/activity.dto';

@Component({
  selector: 'app-recent-activity',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recent-activity.html',
  styleUrl: './recent-activity.css'
})
export class RecentActivity {

  @Input() activities: ActivityDto[] = [];

  getIcon(type: string): string {

    switch (type) {

      case 'created':
        return 'fa-solid fa-plus';

      case 'updated':
        return 'fa-solid fa-pen';

      case 'favorite':
        return 'fa-solid fa-star';

      case 'pinned':
        return 'fa-solid fa-thumbtack';

      case 'archived':
        return 'fa-solid fa-box-archive';

      case 'deleted':
        return 'fa-solid fa-trash';

      default:
        return 'fa-solid fa-clock';
    }
  }

  getColor(type: string): string {

    switch (type) {

      case 'created':
        return 'bg-green-100 text-green-600';

      case 'updated':
        return 'bg-blue-100 text-blue-600';

      case 'favorite':
        return 'bg-yellow-100 text-yellow-600';

      case 'pinned':
        return 'bg-purple-100 text-purple-600';

      case 'archived':
        return 'bg-gray-100 text-gray-600';

      case 'deleted':
        return 'bg-red-100 text-red-600';

      default:
        return 'bg-slate-100 text-slate-600';
    }
  }
}