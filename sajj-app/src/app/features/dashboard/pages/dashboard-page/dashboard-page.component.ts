import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../../../core/services/weather.service';
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
  constructor(protected weatherService: WeatherService) {}

  ngOnInit() {
    // Request weather data on component init
    this.weatherService.getCurrentWeather();
  }
}
