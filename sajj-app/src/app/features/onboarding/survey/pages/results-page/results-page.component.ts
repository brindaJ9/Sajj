import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SurveyService } from '../../services/survey.service';
import { StyleArchetype, determineArchetype } from '../../data/archetypes.data';
import { getPaletteColors } from '../../data/color-palettes.data';

@Component({
  selector: 'app-results-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results-page.component.html',
  styleUrls: ['./results-page.component.scss']
})
export class ResultsPageComponent implements OnInit {
  archetype: StyleArchetype | null = null;
  paletteColors: string[] = [];
  styleTraits: string[] = [];

  constructor(
    private surveyService: SurveyService,
    private router: Router
  ) {}

  ngOnInit() {
    const result = this.surveyService.getLatestResult();
    
    if (!result) {
      // No survey result, redirect to survey
      this.router.navigate(['/onboarding/survey']);
      return;
    }

    // Determine archetype based on survey answers
    this.archetype = determineArchetype({
      styles: result.style_vibe,
      occasions: result.occasions,
      challenge: result.challenge,
      colors: result.color_palette,
      fit: result.fit_vibe,
      adventure: result.adventure_level,
      styleTraits: result.style_traits
    });

    // Get palette colors
    if (result.color_palette) {
      this.paletteColors = getPaletteColors(result.color_palette);
    }

    // Get style traits
    this.styleTraits = result.style_traits || [];
  }

  exploreStyleSculpt() {
    this.router.navigate(['/dashboard']);
  }

  retakeQuiz() {
    this.router.navigate(['/onboarding/survey']);
  }
}
