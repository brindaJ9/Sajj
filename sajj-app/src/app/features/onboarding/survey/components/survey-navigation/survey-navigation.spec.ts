import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyNavigation } from './survey-navigation';

describe('SurveyNavigation', () => {
  let component: SurveyNavigation;
  let fixture: ComponentFixture<SurveyNavigation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurveyNavigation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyNavigation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
