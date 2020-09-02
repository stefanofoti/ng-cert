import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Constants } from "./../constants";
@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http:HttpClient) { }



  getWeather(zipCode: string){
    //return this.http.get("https://lp-store.herokuapp.com/weather?zipcode=95742");
    let address = Constants.ENDPOINT+"weather?zip="+zipCode+",us&appid="+Constants.API_KEY+"&units=imperial";
    console.log("invoking: " + address);
    return this.http.get(address);
  }

  getForecast(zipCode: string){
    let address = Constants.ENDPOINT+"forecast/daily?zip="+zipCode+",us&appid="+Constants.API_KEY+"&units=imperial";
    console.log("invoking: " + address);
    return this.http.get(address);
  }


}
