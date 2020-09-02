import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { LocalStorageService } from '../services/local-storage.service';
import { Constants } from "../constants";
@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.css']
})
export class WeatherDetailsComponent implements OnInit {

  constructor(
    private weatherService: WeatherService,
    private localStorageService: LocalStorageService
    ) { }

  @Input() currentZipCode: string;
  @Output() deleteEvent = new EventEmitter<string>();

  public loadCompleted = false;
  public lastResponse;

  ngOnInit(): void {
    /*this.lastResponse = this.localStorageService.getBean(this.currentZipCode);
    if(this.lastResponse){
      console.log("got response from storage");
      this.loadCompleted = true;
      return;
    }*/
    console.log("sending GET request...");
    this.weatherService
        .getWeather(this.currentZipCode)
        .subscribe(
            data => {
              this.getValues(data);
            }, error => {
              alert("No location with zipcode " + this.currentZipCode + " found!");
              this.deleteEvent.emit(this.currentZipCode);
            }
          );
  }

  getValues(response){
    console.log(response);
    let str: string = response.weather[0].main;
    let imagePath = "";
    switch (str) {
      case "Clear":
        imagePath = Constants.SUN;
        break;
      case "Rain":
        imagePath = Constants.RAIN;
        break;
      case "Thunderstorm":
        imagePath = Constants.RAIN;
        break;
      case "Drizzle":
        imagePath = Constants.RAIN;
        break;      
      case "Snow":
        imagePath = Constants.SNOW;
        break;
      case "Clouds":
        imagePath = Constants.CLOUDS;
        break;
      default:
        imagePath = Constants.SUN;
    }


    this.lastResponse = {
      temp: response.main.temp, 
      temp_min: response.main.temp_min,
      temp_max: response.main.temp_max,
      name: response.name,
      main: response.weather[0].main,
      description: response.weather[0].description,
      image: imagePath
    } 
    console.log(this.lastResponse);
    this.loadCompleted = true;
    this.localStorageService.addBean(this.currentZipCode, this.lastResponse);
  }

  deleteZip(currentZipCode: string){
    this.deleteEvent.emit(currentZipCode);
  }

}
