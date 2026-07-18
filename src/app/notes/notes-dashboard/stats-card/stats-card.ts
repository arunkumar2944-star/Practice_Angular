import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stats-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-card.html',
  styleUrl: './stats-card.css'
})
export class StatsCard {

  @Input() title: string = '';

  @Input() value: number = 0;

  @Input() icon: string = '';

  @Input() bgColor: string = '';

  @Input() textColor: string = '';

  @Input() growth: number = 0;

  @Input() description: string = '';

  
}