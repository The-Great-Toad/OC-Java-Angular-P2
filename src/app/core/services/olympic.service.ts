import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { OlympicCountry } from '../models/olympics.interfaces';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private http = inject(HttpClient);
  private olympicUrl: string = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<OlympicCountry[]>([]);

  loadInitialData(): Observable<OlympicCountry[]> {
    return this.http.get<OlympicCountry[]>(this.olympicUrl).pipe(
      tap((value) => {
        this.olympics$.next(value);
        localStorage.setItem('olympics', JSON.stringify(value));
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error loading Olympic data:', error);
        return [];
      })
    );
  }

  getOlympics(): Observable<OlympicCountry[]> {
    return this.olympics$.asObservable();
  }

  getCountryByName(countryName: string): OlympicCountry | undefined {
    let countries = this.olympics$.getValue();

    if (!countries || countries.length === 0) {
      console.warn('No countries available, checking localStorage...');
      countries = JSON.parse(localStorage.getItem('olympics') || '[]');
    }

    return countries.find(
      (country) => country.country.toLowerCase() === countryName.toLowerCase()
    );
  }
}
