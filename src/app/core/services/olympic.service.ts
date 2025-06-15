import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IOlympicCountry } from '../models/IOlympicCountry';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private http = inject(HttpClient);
  private olympicUrl: string = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<IOlympicCountry[]>([]);

  loadInitialData(): Observable<IOlympicCountry[]> {
    return this.http.get<IOlympicCountry[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next([]);
        return caught;
      })
    );
  }

  getOlympics(): Observable<IOlympicCountry[]> {
    return this.olympics$.asObservable();
  }
}
