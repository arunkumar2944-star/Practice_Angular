import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyProductivity } from './weekly-productivity';

describe('WeeklyProductivity', () => {
  let component: WeeklyProductivity;
  let fixture: ComponentFixture<WeeklyProductivity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeeklyProductivity],
    }).compileComponents();

    fixture = TestBed.createComponent(WeeklyProductivity);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
