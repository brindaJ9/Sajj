import { Component } from '@angular/core';
import { ProgressBar } from '../../components/progress-bar/progress-bar.component';


@Component({
  selector: 'app-survey-page',
  standalone:true,
  imports: [ProgressBar],
  templateUrl: './survey-page.component.html',
  styleUrls: ['./survey-page.component.scss'],
})
export class SurveyPageComponent{

  currentStep = 0;
  totalSteps = 4;

  

}
// imports: [
//   ProgressBarComponent,
//   QuestionCardComponent,
//   SurveyNavigationComponent
// ]


