import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/countries.interface';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.interface';



@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrl: './by-region-page.component.css'
})
export class ByRegionPageComponent implements OnInit {

  public countries: Country[] = []
  public regions: Region[] = ['Africa' , 'Asia' , 'Europe' , 'America' , 'Oceania']
  public selectedRegion?: Region;

  constructor(private _service: CountriesService){

  }
  ngOnInit(): void {
    this.countries = this._service.cacheStore.byRegion.countries;
    this.selectedRegion = this._service.cacheStore.byRegion.region;
  }

  searchByRegion(region: Region){

    this.selectedRegion = region;

    this._service.search(region, "region").subscribe( (countries: Country[]) => {this.countries = countries} )
  }

}
