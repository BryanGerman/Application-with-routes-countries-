import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/countries.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrl: './by-capital-page.component.css'
})
export class ByCapitalPageComponent {

  public countries: Country[] = []

  constructor(private _service: CountriesService){}

  searchByCapital(value: string){
    this._service.search(value, "capital").subscribe( (countries: Country[]) => {this.countries = countries} )
  }

}
