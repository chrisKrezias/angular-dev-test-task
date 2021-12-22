import { createAction, props } from '@ngrx/store';
import { PeriodMode } from '../enums/period-mode.enum';
import { IForecastDailyData, IForecastHourlyData } from './weather-forecast.state';

export enum WeatherForecastActions {
	UpdateCity = '[Weather Forecast Form] Update City',
	UpdatePeriodMode = '[Weather Forecast Form] Update Period Mode',
	UpdateCoordinates = '[Weather Forecast Api] Update Coordinates',
	UpdateForecast = '[Weather Forecast Api] Update Forecast',
	setCityInvalid = '[Weather Forecast Api] Set City Invalid',
}

export const updateCity = createAction(WeatherForecastActions.UpdateCity, props<{ city: string }>());

export const updatePeriodMode = createAction(WeatherForecastActions.UpdatePeriodMode, props<{ mode: PeriodMode }>());

export const updateCoordinates = createAction(
	WeatherForecastActions.UpdateCoordinates,
	props<{ lat: number; lon: number; isCityValid: boolean }>()
);

export const updateForecast = createAction(
	WeatherForecastActions.UpdateForecast,
	props<{ hourlyData: IForecastHourlyData[]; dailyData: IForecastDailyData[] }>()
);

export const setCityInvalid = createAction(WeatherForecastActions.setCityInvalid, props<{ isCityValid: boolean }>());
