import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteCalendar } from './note-calendar';

describe('NoteCalendar', () => {
  let component: NoteCalendar;
  let fixture: ComponentFixture<NoteCalendar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteCalendar],
    }).compileComponents();

    fixture = TestBed.createComponent(NoteCalendar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
