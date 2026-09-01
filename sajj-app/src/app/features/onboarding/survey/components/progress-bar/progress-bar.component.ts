import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  imports: [],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss',
})
export class ProgressBar {

  @Input() current!: number;
  @Input() total!: number;

  get percentage(): number{
    return (this.current / this.total) * 100;
  }

}
