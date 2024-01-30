import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/countries.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrl: './by-country-page.component.css'
})
export class ByCountryPageComponent implements OnInit {

  public countries: Country[] = []
  public initialValue: string = '';

  constructor(private _service: CountriesService){

  }
  ngOnInit(): void {
    this.countries = this._service.cacheStore.byCountries.countries;
    this.initialValue = this._service.cacheStore.byCountries.term
  }

  searchByCountry(value: string){
    this._service.search(value, "name").subscribe( (countries: Country[]) => {this.countries = countries} )
  }
}
