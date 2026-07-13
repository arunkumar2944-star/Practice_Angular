import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteNotes } from './favorite-notes';

describe('FavoriteNotes', () => {
  let component: FavoriteNotes;
  let fixture: ComponentFixture<FavoriteNotes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteNotes],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoriteNotes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
