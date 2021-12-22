import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { WeatherForecastPageComponent } from './pages/weather-forecast-page/weather-forecast-page.component';
import { WeatherForecastRoutingModule } from './weather-forecast-routing.module';
import { WeatherForecastFormComponent } from './components/weather-forecast-form/weather-forecast-form.component';
import { WeatherForecastTableComponent } from './components/weather-forecast-table/weather-forecast-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WeatherForecastEffects } from './state/weather-forecast.effects';
import { WeatherForecastService } from './services/weather-forecast.service';
import { StoreModule } from '@ngrx/store';
import { weatherForecastReducer } from './state/weather-forecast.reducers';

@NgModule({
	declarations: [WeatherForecastFormComponent, WeatherForecastTableComponent, WeatherForecastPageComponent],
	imports: [
		CommonModule,
		WeatherForecastRoutingModule,
		ReactiveFormsModule,
		StoreModule.forFeature('weatherForecastState', weatherForecastReducer),
		EffectsModule.forFeature([WeatherForecastEffects]),
	],
	providers: [WeatherForecastService],
})
export class WeatherForecastModule {}
