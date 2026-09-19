import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomNavComponent } from '../../../../shared/components/bottom-nav/bottom-nav.component';
import { ProfileDropdownComponent } from '../../../../shared/components/profile-dropdown/profile-dropdown.component';

@Component({
  selector: 'app-style-me-page',
  standalone: true,
  imports: [CommonModule, BottomNavComponent, ProfileDropdownComponent],
  templateUrl: './style-me-page.component.html',
  styleUrls: ['./style-me-page.component.scss']
})
export class StyleMePageComponent {}
