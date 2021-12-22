import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, mergeMap, catchError, withLatestFrom } from 'rxjs/operators';
import { PeriodMode } from '../enums/period-mode.enum';
import { WeatherForecastService } from '../services/weather-forecast.service';
import { WeatherForecastActions } from './weather-forecast.actions';
import { IWeatherForecastState, IForecast } from './weather-forecast.state';

@Injectable()
export class WeatherForecastEffects {
	getCoordinates$ = createEffect(() =>
		this.actions$.pipe(
			ofType(WeatherForecastActions.UpdateCity),
			mergeMap(({ city }) =>
				this.weatherForecastService.getCoordinates(city).pipe(
					map(coordinates => {
						if (city && coordinates.length) {
							return {
								type: WeatherForecastActions.UpdateCoordinates,
								lat: coordinates[0].lat,
								lon: coordinates[0].lon,
								isCityValid: true,
							};
						}

						return {
							type: WeatherForecastActions.setCityInvalid,
						};
					}),
					catchError(error =>
						of({
							type: WeatherForecastActions.setCityInvalid,
						})
					)
				)
			)
		)
	);

	getForecastByCoordinates$ = createEffect(() =>
		this.actions$.pipe(
			ofType(WeatherForecastActions.UpdateCoordinates),
			withLatestFrom(this.store$),
			mergeMap(([{ lat, lon }, storeState]) => this.getForecast$(lat, lon, storeState.weatherForecastState.mode))
		)
	);

	getForecastByPeriodMode$ = createEffect(() =>
		this.actions$.pipe(
			ofType(WeatherForecastActions.UpdatePeriodMode),
			withLatestFrom(this.store$),
			mergeMap(([mode, storeState]) => {
				if (storeState.weatherForecastState.isCityValid) {
					return this.getForecast$(
						storeState.weatherForecastState.lat,
						storeState.weatherForecastState.lon,
						(mode as { mode: PeriodMode }).mode || mode
					);
				}

				return of({
					type: WeatherForecastActions.UpdateForecast,
					forecast: [],
				});
			})
		)
	);

	constructor(
		private actions$: Actions,
		private weatherForecastService: WeatherForecastService,
		private store$: Store<IWeatherForecastState>
	) {}

	getForecast$ = (lat: number, lon: number, mode: PeriodMode) =>
		this.weatherForecastService.getForecast(lat, lon, mode).pipe(
			map((forecast: IForecast) => ({
				type: WeatherForecastActions.UpdateForecast,
				hourlyData: forecast.hourly || [],
				dailyData: forecast.daily || [],
			})),
			catchError(() =>
				of({
					type: WeatherForecastActions.setCityInvalid,
				})
			)
		);
}
