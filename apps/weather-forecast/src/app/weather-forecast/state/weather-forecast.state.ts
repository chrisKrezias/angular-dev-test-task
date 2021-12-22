import { PeriodMode } from '../enums/period-mode.enum';

export interface IWeatherForecastState {
	weatherForecastState: IWeatherForecastStateDetails;
}

export interface IForecast {
	daily: IForecastDailyData[];
	hourly: IForecastHourlyData[];
}

export interface IWeatherForecastStateDetails {
	city: string;
	mode: PeriodMode;
	lat: number;
	lon: number;
	data: (IForecastHourlyData | IForecastDailyData)[];
	isCityValid: boolean;
}

export interface IForecastHourlyData {
	temp: number;
}

export interface IForecastDailyData {
	temp: {
		day: number;
		min: number;
		max: number;
		night: number;
		eve: number;
		morn: number;
	};
}
