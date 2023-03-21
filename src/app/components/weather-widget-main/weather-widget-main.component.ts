import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather-widget-main',
  templateUrl: './weather-widget-main.component.html',
  styleUrls: ['./weather-widget-main.component.css']
})
export class WeatherWidgetMainComponent {

  WeatherData:any;
  WeatherForecastData:any;
  state = 'collapsed';

  constructor(private weatherService : WeatherService) {}

  toggle(): void {
    this.state = this.state === 'collapsed' ? 'expanded' : 'collapsed';
  }

  ngOnInit() {
    this.WeatherData = {
      main : {},
      isDay: false
    };

    this.getWeatherData();
    console.log(this.WeatherData);
  }

  getWeatherData(){
    this.weatherService.getcurrentWeatherData("Heidenheim,Germany").subscribe(
      result => {
        this.WeatherData = result;
        this.setWeatherData(result);
      }
    );
  }

  getWeatherForecastData(){
    this.weatherService.getforecaseWeatherData("Heidenheim,Germany").subscribe(
      result => {
        this.WeatherForecastData = result;
      }
    );
  }

  setWeatherData(data:any){
    this.WeatherData = data;
    let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
    this.WeatherData.dt = new Date();
    let currentDate = new Date();
    this.WeatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
  }
}
