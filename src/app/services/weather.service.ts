import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment';
import { City } from '../models';
import { CITIES_COUNTRIES } from './cities-countries';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  public citiesCountries: any = CITIES_COUNTRIES;
  constructor(private http: HttpClient) {}

  getCityWeatherInfo(city: string): Observable<City> {
    let params = new HttpParams().set('q', city).set('units', 'metric');
    return this.http
      .get<City>(`${env.WEATHER_API_BASE_URL}`, {
        params,
      })
      .pipe(
        map((city: any) => {
          const {
            name,
            sys: { country },
            main: { temp },
          } = city;
          return {
            name,
            country: this.citiesCountries[country],
            temp: temp.toFixed(0),
            type: 'C',
            celsius: Number(temp.toFixed(0)),
          };
        })
      );
  }
}
