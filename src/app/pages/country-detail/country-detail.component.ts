import { Component, computed, inject, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAward, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Color, NgxChartsModule } from '@swimlane/ngx-charts';
import { DetailsBlockComponent } from 'src/app/core/components/details-block/details-block.component';
import { ErrorComponent } from 'src/app/core/components/error/error.component';
import {
  LineChartData,
  Series,
} from 'src/app/core/models/ngx-charts/line-chart/line-chart-data.interface';
import { OlympicCountry } from 'src/app/core/models/olympics.interfaces';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-country-detail',
  imports: [
    NgxChartsModule,
    FontAwesomeModule,
    RouterModule,
    DetailsBlockComponent,
    ErrorComponent,
  ],
  templateUrl: './country-detail.component.html',
  styleUrl: './country-detail.component.scss',
})
export class CountryDetailComponent {
  private olympicService = inject(OlympicService);

  public countryName = input.required<string>();
  public errorMessage: string =
    'There was an error loading the country data or the country is not in the database.<br> Please check the country name or try again later.';
  public faAward = faAward;
  public faRightFromBracket = faRightFromBracket;

  /** Fetches the country data based on the provided country name. */
  public country = computed((): OlympicCountry | undefined =>
    this.olympicService.getCountryByName(this.countryName())
  );

  /**
   * Calculates the number of Olympic participations for the country.
   * Returns 0 if the country is not found.
   */
  public olympicCount = computed((): number => {
    const country = this.country();
    return country ? country.participations.length : 0;
  });

  /**
   * Calculates the total number of medals won by the country.
   * Returns 0 if the country is not found.
   */
  public medalCount = computed((): number => {
    const country = this.country();
    return country
      ? country.participations.reduce(
          (medalCount, participation) => medalCount + participation.medalsCount,
          0
        )
      : 0;
  });

  /**
   * Calculates the total number of athletes who participated in the olympics for the country.
   * Returns 0 if the country is not found.
   */
  public athleteCount = computed((): number => {
    const country = this.country();
    return country
      ? country.participations.reduce(
          (athleteCount, participation) =>
            athleteCount + participation.athleteCount,
          0
        )
      : 0;
  });

  /**
   * Provides the data for the details block component.
   * Includes the country name, number of entries, total number of medals, and total number of athletes.
   */
  public detailsBlockData = computed(() => {
    return {
      title: this.countryName(),
      details: [
        {
          label: 'Number of entries',
          value: this.olympicCount(),
        },
        {
          label: 'Total number medals',
          value: this.medalCount(),
        },
        {
          label: 'Total number of athletes',
          value: this.athleteCount(),
        },
      ],
    };
  });

  /**
   * Provides the data for the line chart.
   * Each series represents a year of participation with the number of medals won.
   */
  public lineChartData = computed((): LineChartData[] => {
    const country = this.country();
    const series: Series[] = [];
    country?.participations.forEach((participation) => {
      series.push({
        name: participation.year.toString(),
        value: participation.medalsCount,
      });
    });
    return [
      {
        name: country?.country || '',
        series: series,
      },
    ];
  });

  // Chart configuration
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Dates';
  yAxisLabel: string = 'Medals';
  timeline: boolean = true;
  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  } as Color;
}
