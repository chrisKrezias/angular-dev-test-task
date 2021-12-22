import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherForecastRoutingModule } from './weather-forecast-routing.module';
import { WeatherForecastPageComponent } from './pages/weather-forecast-page/weather-forecast-page.component';


@NgModule({
	declarations: [
		WeatherForecastPageComponent
	],
	imports: [
		CommonModule,
		WeatherForecastRoutingModule
	]
})
export class WeatherForecastModule { }
