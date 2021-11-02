import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { City } from '../../models';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css'],
})
export class WeatherCardComponent implements OnInit {
  public faTimes = faTimes;
  @Input() city!: City;
  @Output() onDeleteCity: EventEmitter<City> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  changeToCelsius(city: City) {
    const { type, temp } = city;
    if (type === 'C') return;
    if (type === 'F') {
      const c = ((Number(temp) - 32) * 5) / 9;
      this.city.temp = Number(c.toFixed(0));
      this.city.type = 'C';
    }
    if (type === 'K') {
      const c = Number(temp) - 273;
      this.city.temp = c;
      this.city.type = 'C';
    }
  }

  changeToFahrenheit(city: City) {
    const { type, temp } = city;
    if (type === 'F') return;
    if (type === 'C') {
      const f = Number((temp * 1.8 + 32).toFixed(0));
      this.city.temp = f;
      this.city.type = 'F';
    }
    if (type === 'K') {
      const f = (Number(temp) - 273) * (9 / 5) + 32;
      this.city.temp = Number(f.toFixed(0));
      this.city.type = 'F';
    }
  }

  changeToKelvin(city: City) {
    const { type, temp } = city;
    if (type === 'K') return;
    if (type === 'C') {
      const k = Number(temp) + 273;
      this.city.temp = k;
      this.city.type = 'K';
    }
    if (type === 'F') {
      const f = (Number(temp) - 32) / 1.8 + 273;
      this.city.temp = Number(f.toFixed(0));
      this.city.type = 'K';
    }
  }

  onDelete(city: City) {
    this.onDeleteCity.emit(city);
  }
}
