import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SurveyService } from '../../../onboarding/survey/services/survey.service';
import { StyleArchetype, determineArchetype } from '../../../onboarding/survey/data/archetypes.data';
import { getPaletteColors, COLOR_PALETTES } from '../../../onboarding/survey/data/color-palettes.data';
import { QuizResult } from '../../../onboarding/survey/models/quiz-result.model';
import { BottomNavComponent } from '../../../../shared/components/bottom-nav/bottom-nav.component';
import { ProfileDropdownComponent } from '../../../../shared/components/profile-dropdown/profile-dropdown.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, BottomNavComponent, ProfileDropdownComponent],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  private surveyService = inject(SurveyService);
  private router = inject(Router);

  archetype: StyleArchetype | null = null;
  quizResult: QuizResult | null = null;
  paletteColors: string[] = [];
  paletteLabel: string = '';
  hasStyleProfile = false;

  // Friendly labels for occasions
  occasionLabels: Record<string, string> = {
    'college': 'College',
    'office': 'Office',
    'casual': 'Casual Outings',
    'travel': 'Travel',
    'gym': 'Gym',
    'parties': 'Parties',
    'dates': 'Date Nights',
    'traditional': 'Traditional Events',
    'weddings': 'Weddings'
  };

  // Friendly labels for challenges
  challengeLabels: Record<string, string> = {
    'matching': "I don't know what matches",
    'repeating': 'I keep wearing the same outfits',
    'style': "I'm still figuring out my personal style",
    'shopping': 'Shopping feels overwhelming',
    'wardrobe': "I don't make the most of the clothes I own",
    'occasions': 'I struggle to dress for different occasions'
  };

  // Friendly labels for fit preferences
  fitLabels: Record<string, string> = {
    'oversized': 'Oversized',
    'relaxed': 'Relaxed',
    'regular': 'Regular Fit',
    'tailored': 'Tailored',
    'slim': 'Slim Fit'
  };

  ngOnInit() {
    this.quizResult = this.surveyService.getQuizResult();
    
    if (this.quizResult) {
      this.hasStyleProfile = true;
      
      // Determine archetype
      this.archetype = determineArchetype({
        styles: this.quizResult.style_vibe,
        occasions: this.quizResult.occasions,
        challenge: this.quizResult.challenge,
        colors: this.quizResult.color_palette,
        fit: this.quizResult.fit_vibe,
        adventure: this.quizResult.adventure_level,
        styleTraits: this.quizResult.style_traits
      });

      // Get palette colors and label
      if (this.quizResult.color_palette) {
        this.paletteColors = getPaletteColors(this.quizResult.color_palette);
        const palette = COLOR_PALETTES.find(p => p.id === this.quizResult!.color_palette);
        this.paletteLabel = palette?.label || '';
      }
    }
  }

  getOccasionLabel(occasionId: string): string {
    return this.occasionLabels[occasionId] || occasionId;
  }

  getChallengeLabel(challengeId: string): string {
    return this.challengeLabels[challengeId] || challengeId;
  }

  getFitLabel(fitId: string): string {
    return this.fitLabels[fitId] || fitId;
  }

  getAdventureLabel(level: number): string {
    if (level >= 80) return 'Very Adventurous';
    if (level >= 60) return 'Adventurous';
    if (level >= 40) return 'Moderate';
    if (level >= 20) return 'Conservative';
    return 'Very Safe';
  }

  getFormattedOccasions(): string {
    if (!this.quizResult?.occasions || this.quizResult.occasions.length === 0) {
      return '';
    }
    return this.quizResult.occasions
      .map(o => this.getOccasionLabel(o))
      .join(', ');
  }

  navigateBack() {
    this.router.navigate(['/dashboard']);
  }

  retakeMeetYourStyle() {
    this.router.navigate(['/onboarding/survey']);
  }

  startMeetYourStyle() {
    this.router.navigate(['/onboarding/survey']);
  }
}
