import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./weather-forecast/weather-forecast.module').then(m => m.WeatherForecastModule),
	},
];

@NgModule({
	declarations: [AppComponent],
	imports: [
		CommonModule,
		BrowserModule,
		RouterModule.forRoot(routes),
		HttpClientModule,
		StoreModule.forRoot({}),
		EffectsModule.forRoot([]),
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
