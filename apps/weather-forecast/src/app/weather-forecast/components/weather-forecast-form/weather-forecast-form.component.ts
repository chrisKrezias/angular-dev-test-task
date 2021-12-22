import { PeriodMode } from './../../enums/period-mode.enum';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { debounceTime, firstValueFrom, map, Subject, takeUntil } from 'rxjs';
import { updateCity, updatePeriodMode } from '../../state/weather-forecast.actions';
import { IWeatherForecastState } from '../../state/weather-forecast.state';

@Component({
	selector: 'weather-forecast-form',
	templateUrl: './weather-forecast-form.component.html',
	styleUrls: ['./weather-forecast-form.component.scss'],
})
export class WeatherForecastFormComponent implements OnInit, OnDestroy {
	public form = this.fb.group({
		city: ['', Validators.required],
		modeToggle: [false],
	});

	private modeToggleMap = new Map<boolean, PeriodMode>([
		[false, PeriodMode.Hourly],
		[true, PeriodMode.Daily],
	]);
	private destroy$ = new Subject<void>();

	constructor(private fb: FormBuilder, private store: Store<IWeatherForecastState>) {}

	async ngOnInit(): Promise<void> {
		await this.setForm();
		this.setCityControlValueChangesSubscription();
		this.setModeToggleControlValueChangesSubscription();
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	private async setForm(): Promise<void> {
		const { city, mode } = await firstValueFrom(this.store.pipe(map(store => store.weatherForecastState)));
		const invertedMap = new Map([...this.modeToggleMap].map(([key, value]) => [value, key]));
		const modeToggle = invertedMap.get(mode);
		this.form.setValue({
			city,
			modeToggle,
		});
	}

	private setCityControlValueChangesSubscription(): void {
		this.form.controls.city.valueChanges.pipe(debounceTime(1000), takeUntil(this.destroy$)).subscribe(city => {
			this.store.dispatch(updateCity({ city }));
		});
	}

	private setModeToggleControlValueChangesSubscription(): void {
		this.form.controls.modeToggle.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((changes: boolean) => {
			const mode = this.modeToggleMap.get(changes) as PeriodMode;
			this.store.dispatch(updatePeriodMode({ mode }));
		});
	}
}
