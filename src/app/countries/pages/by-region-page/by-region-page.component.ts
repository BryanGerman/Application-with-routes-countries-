import { Component } from '@angular/core';
import { Country } from '../../interfaces/countries.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrl: './by-region-page.component.css'
})
export class ByRegionPageComponent {

  public countries: Country[] = []

  constructor(private _service: CountriesService){

  }

  searchByRegion(value: string){
    this._service.search(value, "region").subscribe( (countries: Country[]) => {this.countries = countries} )
  }

}
