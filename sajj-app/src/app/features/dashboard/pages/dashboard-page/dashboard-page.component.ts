import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { WeatherService } from '../../../../core/services/weather.service';
import { SurveyService } from '../../../onboarding/survey/services/survey.service';
import { StyleArchetype, determineArchetype } from '../../../onboarding/survey/data/archetypes.data';
import { BottomNavComponent } from '../../../../shared/components/bottom-nav/bottom-nav.component';
import { ProfileDropdownComponent } from '../../../../shared/components/profile-dropdown/profile-dropdown.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, BottomNavComponent, ProfileDropdownComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  archetype: StyleArchetype | null = null;
  hasStyleProfile = false;

  constructor(
    protected weatherService: WeatherService,
    private surveyService: SurveyService,
    private router: Router
  ) {}

  ngOnInit() {
    // Request weather data on component init
    this.weatherService.getCurrentWeather();
    
    // Check if user has completed Meet Your Style
    const quizResult = this.surveyService.getQuizResult();
    
    if (quizResult) {
      this.hasStyleProfile = true;
      
      // Determine archetype from quiz result
      this.archetype = determineArchetype({
        styles: quizResult.style_vibe,
        occasions: quizResult.occasions,
        challenge: quizResult.challenge,
        colors: quizResult.color_palette,
        fit: quizResult.fit_vibe,
        adventure: quizResult.adventure_level,
        styleTraits: quizResult.style_traits
      });
    }
  }

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  startMeetYourStyle() {
    this.router.navigate(['/onboarding/survey']);
  }
}
