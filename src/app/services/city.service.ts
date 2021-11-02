import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { City } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private cities: City[] = [];
  constructor() {}

  getCities(): Observable<City[]> {
    return of(this.cities);
  }

  addCity(city: City): Observable<City[]> {
    this.cities.push(city);
    return of(this.cities);
  }

  deleteCity(city: City): Observable<City[]> {
    const filterCities = this.cities.filter(
      (existinCity) => existinCity.name !== city.name
    );
    this.cities = filterCities;
    return of(this.cities);
  }
}
