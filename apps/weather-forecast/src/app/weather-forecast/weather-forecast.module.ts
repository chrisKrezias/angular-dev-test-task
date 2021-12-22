import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherForecastRoutingModule } from './weather-forecast-routing.module';
import { WeatherForecastPageComponent } from './pages/weather-forecast-page/weather-forecast-page.component';
import { WeatherForecastFormComponent } from './components/weather-forecast-form/weather-forecast-form.component';
import { WeatherForecastTableComponent } from './components/weather-forecast-table/weather-forecast-table.component';
import { WeatherForecastService } from './services/weather-forecast.service';

@NgModule({
	declarations: [WeatherForecastPageComponent, WeatherForecastFormComponent, WeatherForecastTableComponent],
	imports: [CommonModule, WeatherForecastRoutingModule],
	providers: [WeatherForecastService],
})
export class WeatherForecastModule {}
