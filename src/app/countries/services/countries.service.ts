import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Country } from '../interfaces/countries.interface';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private _httpClient: HttpClient) {}


  searchByAlpha(term: string, name: string): Observable<Country | null> {
    const url = `${this.apiUrl}/${name}/${term}`;

    return this._httpClient.get<Country[]>(url)
    .pipe(
      map( countries => countries.length > 0 ? countries[0] : null),
      catchError(() => of(null))
    );
  }

  search(term: string, name: string): Observable<Country[]> {
    const url = `${this.apiUrl}/${name}/${term}`;

    return this._httpClient.get<Country[]>(url)
    .pipe(
      catchError(() => of([]))
    );
  }


}
