import {Component, OnInit} from '@angular/core';
import {Movie} from "../interfaces/movie";
import {MoviesService} from "../services/movies/movies.service";
import {People} from "../interfaces/people";
import {Router} from "@angular/router";
import {Subscription, timer} from "rxjs";

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {

  peoples: People[] = []
  currentPeople: People | undefined;
  currentMovie: Movie | undefined;

  counter: number = 15
  timeLeft: number = 0
  timerSubscription: Subscription | undefined

  constructor(
    private moviesService: MoviesService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.pickNewGuess()
    this.startTimer()
  }

  // Set a timer for a duration of n seconds
  startTimer() {
    this.timerSubscription = timer(0, 1000).subscribe(n => {
      if (n > this.counter) {
        this.timerSubscription?.unsubscribe()
        alert("Le temps est écoulé !")
        this.saveScoreAndLeave()
      }
      else
        this.timeLeft = n
    });
  }

  // Reset the actor and movie that are chose to be guessed
  pickNewGuess() {
    if (Math.floor(Math.random() * (4 - 1) + 1) === 1) {
      this.getRandomPopularPeople()
      this.getRandomPopularMovies()
    } else {
      this.getSpecificMovieByActor()
    }
  }

  // Chose an actor in a list of popular people
  getRandomPopularPeople() {
    this.moviesService.getPopularPeople(Math.floor(Math.random() * (200 - 1) + 1)).subscribe(value =>
      this.currentPeople = value.results[Math.floor(Math.random() * (20 - 1) + 1)]
    )
  }

  // Chose a movie in a list of popular movies
  getRandomPopularMovies() {
    this.moviesService.getPopularMovies(Math.floor(Math.random() * (200 - 1) + 1)).subscribe(value =>
      this.currentMovie = value.results[Math.floor(Math.random() * (20 - 1) + 1)]
    )
  }

  // Chose a specific movie after picking a random actor in a list of popular people
  getSpecificMovieByActor() {
    this.moviesService.getPopularPeople(Math.floor(Math.random() * (200 - 1) + 1)).subscribe(value => {
        this.peoples = value.results
        this.currentPeople = this.peoples[Math.floor(Math.random() * (20 - 1) + 1)]
        this.currentMovie = this.currentPeople.known_for[0]
      }
    )
  }

  // Check if the user answer is correct
  submit(value: boolean): void {
    const isAnActorOfMovie = this.currentPeople?.known_for.find(movie => movie.id === this.currentMovie?.id) != null
    if (isAnActorOfMovie === value) {
      this.incrementScore()
      this.pickNewGuess()
      this.startTimer()
    } else
      this.saveScoreAndLeave()
  }

  // Increase the score
  incrementScore() {
    const score = localStorage.getItem('currentScore')
    if (score)
      localStorage.setItem('currentScore', (parseInt(score.toString()) + 1).toString())
    else
      localStorage.setItem('currentScore', '1')
  }

  // Save the last score in the leaderboard and return homepage
  saveScoreAndLeave() {
    let scoreboardJSON = localStorage.getItem('scoreboardJSON')
    let scoreboard = scoreboardJSON ? JSON.parse(scoreboardJSON) : [];

    let currentScore = localStorage.getItem('currentScore')
    if (currentScore) {
      if (!scoreboard.includes(parseInt(currentScore.toString())))
        scoreboard.push(parseInt(currentScore.toString()))
    }

    scoreboard.sort(function (a: number, b: number) {
      return b - a;
    });

    if (scoreboard.length > 10)
      scoreboard.pop()

    localStorage.setItem('scoreboardJSON', JSON.stringify(scoreboard))
    localStorage.removeItem('currentScore')
    this.router.navigate([''])
  }
}
