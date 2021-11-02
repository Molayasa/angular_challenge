import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CITIES_NAMES } from './cities-names';
import { CityName } from '../../models';

@Component({
  selector: 'app-city-selector',
  templateUrl: './city-selector.component.html',
  styleUrls: ['./city-selector.component.css'],
})
export class CitySelectorComponent implements OnInit {
  public city!: string;
  public citiesNames: CityName[] = CITIES_NAMES;
  @Output() onCitySelection = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onSelectionChange(city: string) {
    this.onCitySelection.emit(city);
  }
}
