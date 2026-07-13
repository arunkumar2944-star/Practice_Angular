import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedNotes } from './completed-notes';

describe('CompletedNotes', () => {
  let component: CompletedNotes;
  let fixture: ComponentFixture<CompletedNotes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompletedNotes],
    }).compileComponents();

    fixture = TestBed.createComponent(CompletedNotes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
