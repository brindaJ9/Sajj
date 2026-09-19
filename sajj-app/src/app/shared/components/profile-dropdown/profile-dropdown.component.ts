import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';

@Component({
  selector: 'app-profile-dropdown',
  standalone: true,
  imports: [CommonModule, RouterModule, ClickOutsideDirective],
  templateUrl: './profile-dropdown.component.html',
  styleUrls: ['./profile-dropdown.component.scss']
})
export class ProfileDropdownComponent {
  isOpen = signal(false);
  
  // Mock user data - replace with actual user service later
  userName = 'Brinda';
  userStyle = 'The Romantic';

  constructor(private router: Router) {}

  toggleDropdown(): void {
    this.isOpen.update(val => !val);
  }

  closeDropdown(): void {
    this.isOpen.set(false);
  }

  navigateToProfile(): void {
    this.closeDropdown();
    this.router.navigate(['/profile']);
  }

  logout(): void {
    this.closeDropdown();
    // Add logout logic here (clear session, tokens, etc.)
    this.router.navigate(['/onboarding/survey']);
  }
}
