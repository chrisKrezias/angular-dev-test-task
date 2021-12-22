import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class HttpHelperService {
	constructor(private http: HttpClient) {}

	public get(url: string): Observable<any> {
		return this.http.get(url);
	}
}
