import { PeriodMode } from './../enums/period-mode.enum';
import { Injectable } from '@angular/core';
import { HttpHelperService } from '../../core/services/http-helper.service';
import { Observable } from 'rxjs';
import { ICoordinates } from '../models/coordinates.model';
import { environment } from 'apps/weather-forecast/src/environments/environment';

const API_KEY = environment.openweathermapApiKey;

@Injectable()
export class WeatherForecastService {
	private excludedModeMap = new Map([
		[PeriodMode.Daily, PeriodMode.Hourly],
		[PeriodMode.Hourly, PeriodMode.Daily],
	]);

	constructor(private http: HttpHelperService) {}

	public getCoordinates(city: string): Observable<ICoordinates[]> {
		return this.http.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`);
	}

	public getForecast(latitude: number, longitude: number, mode: PeriodMode): Observable<any> {
		return this.http.get(
			`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,${this.excludedModeMap.get(
				mode
			)},alerts&appid=${API_KEY}`
		);
	}
}
