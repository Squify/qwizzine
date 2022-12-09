import {Component, OnInit} from '@angular/core';
import {MoviesService} from "../services/movies/movies.service";
import {Movie} from "../interfaces/movie";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  movies: Movie[] = []

  constructor(private moviesService: MoviesService) {
  }

  ngOnInit() {
    // this.getMovies()
  }

  // getMovies() {
  //   this.moviesService.getPopularMovies().subscribe(value => {
  //       this.movies = value.results
  //       console.log(this.movies)
  //     }
  //   )
  // }

}
