import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

interface NavItem {
  id: string;
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss']
})
export class BottomNavComponent {
  navItems: NavItem[] = [
    { id: 'home', label: 'Home', icon: '🏠', route: '/dashboard' },
    { id: 'wardrobe', label: 'Wardrobe', icon: '👔', route: '/wardrobe' },
    { id: 'style-me', label: 'Style Me', icon: '✨', route: '/style-me' },
    { id: 'plan-ahead', label: 'Plan Ahead', icon: '📅', route: '/plan-ahead' }
  ];

  constructor(private router: Router) {}

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
