import { Action, createReducer, on } from '@ngrx/store';
import { PeriodMode } from '../enums/period-mode.enum';
import {
	updateCity,
	updatePeriodMode,
	updateCoordinates,
	updateForecast,
	setCityInvalid,
} from './weather-forecast.actions';
import { IWeatherForecastStateDetails } from './weather-forecast.state';

const initialState: IWeatherForecastStateDetails = {
	city: '',
	mode: PeriodMode.Hourly,
	lat: 0,
	lon: 0,
	hourlyData: [],
	dailyData: [],
	isCityValid: false,
};

const _weatherForecastReducer = createReducer(
	initialState,
	on(updateCity, (state, { city }) => ({ ...state, city })),
	on(updatePeriodMode, (state, { mode }) => ({ ...state, mode })),
	on(updateCoordinates, (state, { lat, lon, isCityValid }) => ({ ...state, lat, lon, isCityValid })),
	on(updateForecast, (state, { hourlyData, dailyData }) => ({
		...state,
		hourlyData,
		dailyData,
	})),
	on(setCityInvalid, state => ({ ...state, isCityValid: false, hourlyData: [], dailyData: [], lat: 0, lon: 0 }))
);

export function weatherForecastReducer(state: IWeatherForecastStateDetails, action: Action) {
	return _weatherForecastReducer(state, action);
}
