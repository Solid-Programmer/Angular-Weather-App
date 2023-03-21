import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { WeatherData } from '../models/weather.model';
import { WeatherForecastData } from '../models/weatherforecast.model';

@Injectable({
  providedIn: 'root'
})

export class WeatherService {

  constructor(private http : HttpClient) { }

  getcurrentWeatherData(city:string) : Observable<WeatherData> {
    return this.http.get<WeatherData>(environment.weatherAPIBaseURL,
      {
        params: new HttpParams()
        .set('q',city)
        .set('APPID',environment.appId)
        .set('units','metric')
      })
  }

  getforecaseWeatherData(city:string) : Observable<WeatherForecastData> {
    return this.http.get<WeatherForecastData>(environment.weatherAPIForecastURL,
      {
        params: new HttpParams()
        .set('q',city)
        .set('APPID',environment.appId)
        .set('units','metric')
      })
  }
}
