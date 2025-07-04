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

  /**
   * Loads the initial Olympic data from a local JSON file.
   * It fetches the data, updates the BehaviorSubject, and stores it in localStorage for page reloads.
   * If an error occurs, it logs the error to the console and returns an empty array.
   *
   * This method is called once when the application starts to ensure that the data is available.
   *
   * @returns An observable that emits the initial Olympic data.
   */
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

  /**
   * Retrieves the current Olympic data as an observable.
   * It allows components to subscribe to changes in the Olympic data.
   *
   * @returns An observable that emits the current Olympic data.
   */
  getOlympics(): Observable<OlympicCountry[]> {
    return this.olympics$.asObservable();
  }

  /**
   * Gets the Olympic country data by its name.
   * It first checks the current value of the BehaviorSubject.
   * If no data is available, it attempts to retrieve it from localStorage.
   *
   * @param countryName The name of the country to search for.
   * @returns The OlympicCountry object if found, otherwise undefined.
   */
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
