import { Component, OnInit } from '@angular/core';
import { City } from '../../models';
import { WeatherService } from '../../services/weather.service';
import { CityService } from '../../services/city.service';

@Component({
  selector: 'app-cities-list',
  templateUrl: './cities-list.component.html',
  styleUrls: ['./cities-list.component.css'],
})
export class CitiesListComponent implements OnInit {
  public title: string = 'Your Cities';
  public cities: City[] = [];
  public selectedCity!: City;
  constructor(
    private cityService: CityService,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {}

  searchAndAddCity(cityName: string) {
    // Check if City is already listed and does not call weather api again
    if (this.cities.filter((city) => city.name === cityName).length) return;

    this.weatherService.getCityWeatherInfo(cityName).subscribe((city: City) => {
      this.selectedCity = city;
      this.cityService
        .addCity(this.selectedCity!)
        .subscribe((cities) => (this.cities = cities));
    });
  }

  deleteCity(city: City) {
    this.cityService
      .deleteCity(city)
      .subscribe((cities) => (this.cities = cities));
  }
}
