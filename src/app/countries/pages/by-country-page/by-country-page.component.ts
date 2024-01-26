import { Component } from '@angular/core';
import { Country } from '../../interfaces/countries.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrl: './by-country-page.component.css'
})
export class ByCountryPageComponent {

  public countries: Country[] = []

  constructor(private _service: CountriesService){

  }

  searchByCountry(value: string){
    this._service.search(value, "name").subscribe( (countries: Country[]) => {this.countries = countries} )
  }
}
