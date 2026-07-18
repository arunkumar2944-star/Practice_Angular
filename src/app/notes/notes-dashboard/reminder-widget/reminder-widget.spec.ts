import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderWidget } from './reminder-widget';

describe('ReminderWidget', () => {
  let component: ReminderWidget;
  let fixture: ComponentFixture<ReminderWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReminderWidget],
    }).compileComponents();

    fixture = TestBed.createComponent(ReminderWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
