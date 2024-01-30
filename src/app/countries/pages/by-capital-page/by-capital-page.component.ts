import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/countries.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrl: './by-capital-page.component.css'
})
export class ByCapitalPageComponent implements OnInit {

  public countries: Country[] = []
  public isLoading: boolean = false;
  public initialValue: string = '';

  constructor(private _service: CountriesService){}
  ngOnInit(): void {
    this.countries = this._service.cacheStore.byCapital.countries
    this.initialValue = this._service.cacheStore.byCapital.term
  }

  searchByCapital(value: string){
    this.isLoading = true;
    this._service.search(value, "capital").subscribe( (countries: Country[]) => {
      this.countries = countries;
      this.isLoading = false;
    } )
  }

}
