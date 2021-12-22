import { map, tap } from 'rxjs/operators';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IWeatherForecastState } from '../../state/weather-forecast.state';
import { ForecastTableBuilderFactory, ITableConfig } from '../../models/forecast-table-builder-factory.model';

@Component({
	selector: 'weather-forecast-table',
	templateUrl: './weather-forecast-table.component.html',
	styleUrls: ['./weather-forecast-table.component.scss'],
})
export class WeatherForecastTableComponent {
	public forecast$: Observable<{ cityName: string; tableData: ITableConfig | null }>;

	constructor(private store: Store<IWeatherForecastState>) {
		this.forecast$ = this.store.select('weatherForecastState').pipe(
			map(({ city, mode, data }) => ({
				cityName: city,
				tableData: city ? ForecastTableBuilderFactory.getBuilder(mode).build(data) : null,
			})),
			tap(({ tableData }) => console.log(tableData))
		);
	}
}
