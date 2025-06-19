import { Component, inject, OnInit } from '@angular/core';
import { map, Observable, of, Subscription } from 'rxjs';
import { IOlympicCountry } from 'src/app/core/models/IOlympicCountry';
import { IParticipation } from 'src/app/core/models/IParticipation';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false,
})
export class HomeComponent implements OnInit {
  private olympicService = inject(OlympicService);
  public olympics$: Observable<any> = of(null);

  // Chart options
  public view: [number, number] = [700, 400];
  public results$!: Subscription;
  public results: any[] = [];
  public gradient: boolean = true;
  public showLegend: boolean = false;
  public showLabels: boolean = true;
  public isDoughnut: boolean = false;
  public legendPosition: string = 'below';

  public colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.results$ = this.olympics$.subscribe({
      next: (olympicCountries: IOlympicCountry[]) => {
        this.results = olympicCountries.map(
          (olympicCountry: IOlympicCountry) => ({
            name: olympicCountry.country,
            value: (olympicCountry.participations as IParticipation[])
              .map((participation: IParticipation) => participation.medalsCount)
              .reduce((acc, curr) => acc + curr, 0),
          })
        );
        console.log('Results:', this.results);
      },
      error: (err) => console.error('Error fetching olympics data', err),
    });
  }

  public onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  public onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  public onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
