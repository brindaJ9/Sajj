import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomNavComponent } from '../../../../shared/components/bottom-nav/bottom-nav.component';
import { ProfileDropdownComponent } from '../../../../shared/components/profile-dropdown/profile-dropdown.component';

@Component({
  selector: 'app-plan-ahead-page',
  standalone: true,
  imports: [CommonModule, BottomNavComponent, ProfileDropdownComponent],
  templateUrl: './plan-ahead-page.component.html',
  styleUrls: ['./plan-ahead-page.component.scss']
})
export class PlanAheadPageComponent {}
