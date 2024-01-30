import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/countries.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.interface';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';
  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { region: '', countries: [] },
  };

  constructor(private _httpClient: HttpClient) {
    this.loadFromLocalStorage();
  }

  saveToLocalStorage(){
    localStorage.setItem("cacheStorage", JSON.stringify(this.cacheStore))
  }


  loadFromLocalStorage(){
    if(!localStorage.getItem("cacheStorage")) return;
    this.cacheStore = JSON.parse(localStorage.getItem("cacheStorage")! );
  }

  searchByAlpha(term: string, name: string): Observable<Country | null> {
    const url = `${this.apiUrl}/${name}/${term}`;

    return this._httpClient.get<Country[]>(url).pipe(
      map((countries) => (countries.length > 0 ? countries[0] : null)),
      catchError(() => of(null))
    );
  }

  search(term: string, name: string): Observable<Country[]> {
    const url = `${this.apiUrl}/${name}/${term}`;

    return this._httpClient.get<Country[]>(url).pipe(
      tap( countries => {
        if(name === 'name'){
          this.cacheStore.byCountries = {
            term,
            countries
          }
        } else if (name === "capital"){
          this.cacheStore.byCapital = {
            term,
            countries
          }
        } else {
          this.cacheStore.byRegion = {
            region: term as Region,
            countries
          }
        }
      }),
      tap(() => this.saveToLocalStorage()),
      catchError(() => of([]))
      );
  }
}
