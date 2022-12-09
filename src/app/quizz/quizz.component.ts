import {Component, OnInit} from '@angular/core';
import {Movie} from "../interfaces/movie";
import {MoviesService} from "../services/movies/movies.service";
import {People} from "../interfaces/people";

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

  counter = 15

  constructor(private moviesService: MoviesService) {
  }

  ngOnInit() {
    this.getMovies()
    this.getPeople()
    localStorage.setItem('good_answer', '0')
  }

  getMovies(): void {
    this.moviesService.getPopularMovies(1).subscribe(value => {
        this.movies = value.results
        this.pickRandomMovie()
      },
      error => console.log('oops')
    )
  }

  pickRandomMovie(): void {
    this.currentMovie = this.movies[Math.floor(Math.random() * (20 - 1) + 1)]
  }

  getPeople(): void {
    this.moviesService.getPopularPeople(1).subscribe(value => {
        this.peoples = value.results
        this.pickRandomPeople()
      },
      error => console.log('oops')
    )
  }

  pickRandomPeople(): void {
    this.currentPeople = this.peoples[Math.floor(Math.random() * (20 - 1) + 1)]
    console.log(this.currentPeople)
  }

  answer(value: boolean): void {
    if (this.currentPeople?.known_for.find(e => e.id === this.currentMovie?.id)) {
      if (value)
        this.addPoint()
      else
        localStorage.clear() //TODO: perdu
    } else {
      if (!value)
        this.addPoint()
      else
        localStorage.clear()
    }
    console.log(localStorage.getItem('good_answer'))
  }

  addPoint() {
    const score = localStorage.getItem('good_answer')
    if (score)
      localStorage.setItem('good_answer', (this.localToScore(score) + 1).toString())
    else
      localStorage.setItem('good_answer', '1')
  }

  localToScore(local: any): number {
    return parseInt(local.toString())
  }
}
