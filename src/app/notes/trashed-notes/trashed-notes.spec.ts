import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashedNotes } from './trashed-notes';

describe('TrashedNotes', () => {
  let component: TrashedNotes;
  let fixture: ComponentFixture<TrashedNotes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrashedNotes],
    }).compileComponents();

    fixture = TestBed.createComponent(TrashedNotes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
