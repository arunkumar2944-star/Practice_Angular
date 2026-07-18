import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteGrid } from './note-grid';

describe('NoteGrid', () => {
  let component: NoteGrid;
  let fixture: ComponentFixture<NoteGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteGrid],
    }).compileComponents();

    fixture = TestBed.createComponent(NoteGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
