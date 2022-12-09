import {Component, OnInit} from '@angular/core';
import {Movie} from "../interfaces/movie";
import {MoviesService} from "../services/movies/movies.service";
import {People} from "../interfaces/people";
import {Router} from "@angular/router";
import {timer} from "rxjs";

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {

  movies: Movie[] = []
  currentMovie: Movie | undefined;
  peoples: People[] = []
  currentPeople: People | undefined;

  counter: number = 15
  timeLeft: number = 0

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
    timer(0, 1000).subscribe(n => {
      if (n > this.counter)
        console.log()
      else
        this.timeLeft = n
    });
  }

  // Reset the actor and movie that are chose to be guessed
  pickNewGuess() {
    if (Math.floor(Math.random() * (3 - 1) + 1) === 1) {
      this.getRandomPopularPeople()
      this.getRandomPopularMovies()
    } else {
      this.getSpecificMovieByActor()
    }
  }

  // Chose a actor in a list of popular people
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

  //
  answer(value: boolean): void {
    if (this.currentPeople?.known_for.find(movie => movie.id === this.currentMovie?.id)) {
      if (value) {

        this.incrementScore()
        this.pickNewGuess()
        this.startTimer()
      } else {
        this.saveScoreAndLeave()
      }
    } else {
      if (!value) {
        this.incrementScore()
        this.pickNewGuess()
        this.startTimer()
      } else {
        this.saveScoreAndLeave()
      }
    }
  }

  // Increase the score
  incrementScore() {
    const score = localStorage.getItem('good_answer')
    if (score)
      localStorage.setItem('good_answer', (parseInt(score.toString()) + 1).toString())
    else
      localStorage.setItem('good_answer', '1')
  }

  // Save the last score in the leaderboard and return homepage
  saveScoreAndLeave() {
    localStorage.setItem('tableauscore', 'le score good_answer')
    localStorage.clear()
    this.router.navigate([''])
  }
}
