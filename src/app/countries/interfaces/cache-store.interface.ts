import { Country } from "./countries.interface"
import { Region } from "./region.interface";

export interface CacheStore {
  byCapital: TermCountry;
  byCountries: TermCountry;
  byRegion: RegionCountries

}

export interface TermCountry{
  term: string,
  countries: Country[]
}

export interface RegionCountries{
  countries: Country[];
  region?: Region
}
