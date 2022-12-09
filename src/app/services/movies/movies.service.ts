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
    return this.http.get(environment.api_uri + '/movie/popular?api_key=' + environment.movie_db_api_key + '&language=fr-FR&page=' + pageId)
  }

  getPopularPeople(pageId: number): Observable<any> {
    return this.http.get(environment.api_uri + '/person/popular?api_key=' + environment.movie_db_api_key + '&language=fr-FR&page=' + pageId)
  }
}
