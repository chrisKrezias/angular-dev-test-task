import { PeriodMode } from '../enums/period-mode.enum';

interface ITableBuilder {
	build(forecastData: any[]): ITableConfig | null;
}

export interface ITableConfig {
	columnLabels: string[];
	rowLabels: string[];
	values: number[][];
}

export class ForecastTableBuilderFactory {
	public static getBuilder(mode: PeriodMode): ITableBuilder {
		if (mode === PeriodMode.Daily) {
			return new DailyForecastTableBuilder();
		}

		return new HourlyForecastTableBuilder();
	}
}

class DailyForecastTableBuilder implements ITableBuilder {
	public build(forecastData: any[]) {
		if (forecastData) {
			const TOTAL_RECORDS = 7;
			const UNIX_MULTIPLIER = 1000;
			const filteredData = [...forecastData].splice(0, TOTAL_RECORDS);

			if (filteredData.length) {
				return {
					columnLabels: filteredData.map(({ dt }) => new Date(dt * UNIX_MULTIPLIER).toDateString()),
					rowLabels: Object.entries(filteredData[0].temp).map(([key, value]) => key),
					values: filteredData
						.map(({ temp }) => Object.entries(temp).map(([key, value]) => value))
						.reduce(
							(previous: any[], current: any[]) =>
								current.map((temp, i) => (previous[i] || []).concat(current[i])),
							[]
						),
				} as ITableConfig;
			}
		}
		return null;
	}
}

class HourlyForecastTableBuilder implements ITableBuilder {
	public build(forecastData: any[]) {
		if (forecastData) {
			const HOUR_STEP = 3;
			const UNIX_MULTIPLIER = 1000;
			const TOTAL_RECORDS = 8;
			const filteredData = [...forecastData]
				.filter((value, index) => index % HOUR_STEP === 0)
				.splice(0, TOTAL_RECORDS);

			if (filteredData.length) {
				return {
					columnLabels: filteredData.map(({ dt }) => new Date(dt * UNIX_MULTIPLIER).toUTCString()),
					rowLabels: ['temp'],
					values: [filteredData.map(({ temp }) => temp)],
				} as ITableConfig;
			}
		}

		return null;
	}
}
