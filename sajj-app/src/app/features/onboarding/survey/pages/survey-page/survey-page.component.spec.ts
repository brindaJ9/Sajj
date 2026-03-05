import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyPage } from './survey-page.component';

describe('SurveyPage', () => {
  let component: SurveyPage;
  let fixture: ComponentFixture<SurveyPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurveyPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
