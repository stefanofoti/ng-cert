import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../services/weather.service';
import { Constants } from "../constants";
@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private weatherService: WeatherService) { }

  public lastResponse;
  public loadCompleted = false;

  ngOnInit(): void {
    let zipValue = this.activatedRoute.snapshot.paramMap.get('zipvalue');
    this.weatherService
        .getForecast(zipValue)
        .subscribe(
            data => {
              this.getValues(data);
            }, error => {
              alert("No location with zipcode " + zipValue + " found!");
            }
          );
  }

  getValues(response){
    let name = response.city.name;
    let list = new Array();
    let date = new Date();
    for(let i = 0; i<5; i++){

      let obj = {
        "main": response.list[i].weather[0].main,
        "temp": response.list[i].temp.day,
        "temp_min": response.list[i].temp.min,
        "temp_max": response.list[i].temp.max,
        "image": this.getImage(response.list[i].weather[0].main),
        "date": response.list[i].dt
      }
      list.push(obj);
    }
    this.lastResponse = {
      "name": name,
      "list": list
    }
    this.loadCompleted = true;
  }

  getImage(str){
    switch (str) {
      case "Clear":
        return Constants.SUN;
        break;
      case "Rain":
        return Constants.RAIN;
      case "Thunderstorm":
        return Constants.RAIN;
      case "Drizzle":
        return Constants.RAIN;
      case "Snow":
        return Constants.SNOW;
      case "Clouds":
        return Constants.CLOUDS;
      default:
        return Constants.SUN;
    }
  }

}
