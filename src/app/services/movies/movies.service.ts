import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) {
  }

  getPopularMovies(pageId: number): Observable<any> {
    const apiKey = environment.movie_db_api_key.toString()
    return this.http.get('https://api.themoviedb.org/3/movie/popular?api_key=' + apiKey + '&language=fr-FR&page=' + pageId)
  }

  getPopularPeople(pageId: number): Observable<any> {
    const apiKey = environment.movie_db_api_key.toString()
    return this.http.get('https://api.themoviedb.org/3/person/popular?api_key=' + apiKey + '&language=fr-FR&page=' + pageId)
  }
}
