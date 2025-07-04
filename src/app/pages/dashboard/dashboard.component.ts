import { Component, computed, inject, signal } from '@angular/core';
import { Color, NgxChartsModule } from '@swimlane/ngx-charts';
import { filter, Subscription } from 'rxjs';
import { mapToPieChartData } from 'src/app/core/models/mappers/chart-data.mapper';
import {
  PieChartClickedData,
  PieChartData,
} from 'src/app/core/models/ngx-charts/pie-chart/pie-chart-data.interface';
import { PieChartOptions } from 'src/app/core/models/ngx-charts/pie-chart/pie-chart.interface';
import { OlympicCountry } from 'src/app/core/models/olympics.interfaces';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAward } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { DetailsBlockComponent } from 'src/app/core/components/details-block/details-block.component';
import { ErrorComponent } from '../../core/components/error/error.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dashboard',
  imports: [
    NgxChartsModule,
    FontAwesomeModule,
    DetailsBlockComponent,
    ErrorComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private olympicService = inject(OlympicService);
  private router = inject(Router);

  public olympics$!: Subscription;
  public olympicCountries = signal<OlympicCountry[]>([]);
  public totalOlympicsNb = signal<number>(0);
  public faAward = faAward;
  public errorMessage: string =
    'There was an error loading the Olympic data.<br> Please try again later.';

  // Chart configuration
  public pieChartData = signal<PieChartData[]>([]);
  public pieChartOptions = computed<PieChartOptions>(() => ({
    results: this.pieChartData(),
    trimLabels: false,
    legend: false,
    labels: true,
    doughnut: false,
    scheme: {
      domain: [
        '#793e53',
        '#89a1db',
        '#9781a1',
        '#bfe1f1',
        '#b7c9e6',
        '#956064',
      ],
    } as Color,
  }));

  /**
   * Provides the data for the details block component.
   * It includes the title and details about the number of Olympics and countries.
   */
  public detailsBlockData = computed(() => {
    return {
      title: 'Medals per Country',
      details: [
        {
          label: 'Number of olympics',
          value: this.totalOlympicsNb(),
        },
        {
          label: 'Number of countries',
          value: this.olympicCountries().length,
        },
      ],
    };
  });

  /**
   * Initializes the component and fetches the Olympic data.
   * It subscribes to the Olympic service to get the list of countries
   * and maps the data to display in the pie chart.
   */
  constructor() {
    this.olympics$ = this.olympicService
      .getOlympics()
      .pipe(
        takeUntilDestroyed(),
        filter(
          (countries: OlympicCountry[]) => countries && countries.length > 0
        )
      )
      .subscribe((olympicCountries: OlympicCountry[]) => {
        this.olympicCountries.set(olympicCountries);
        this.totalOlympicsNb.set(olympicCountries[0].participations.length);
        this.pieChartData.set(mapToPieChartData(olympicCountries));
        console.log('pieChartData:', this.pieChartData());
      });
  }

  /**
   * Redirects to the detail page of the clicked item in the pie chart.
   *
   * @param data The data of the clicked pie chart item.
   */
  public onSelect(data: PieChartClickedData): void {
    console.log('Item clicked', data);
    if (data && data.name) {
      this.router.navigate(['/detail', data.name]);
    } else {
      console.warn('No valid data to navigate to detail');
    }
  }
}
