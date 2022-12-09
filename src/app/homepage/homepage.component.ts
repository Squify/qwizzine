import {Component} from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {

  scoreboard: number[] = []

  constructor() {
    let scoreboardJSON = localStorage.getItem('scoreboardJSON')
    this.scoreboard = scoreboardJSON ? JSON.parse(scoreboardJSON) : [];
  }
}
