import { Component, computed, inject, input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAward, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Color, NgxChartsModule } from '@swimlane/ngx-charts';
import {
  LineChartData,
  Series,
} from 'src/app/core/models/ngx-charts/line-chart/line-chart-data.interface';
import { OlympicCountry } from 'src/app/core/models/olympics.interfaces';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-country-detail',
  imports: [NgxChartsModule, FontAwesomeModule, RouterModule],
  templateUrl: './country-detail.component.html',
  styleUrl: './country-detail.component.scss',
})
export class CountryDetailComponent implements OnInit {
  private olympicService = inject(OlympicService);

  public countryName = input.required<string>();
  public errorMessage: string =
    'There was an error loading the country data or the country is not in the database.<br> Please check the country name or try again later.';
  public faAward = faAward;
  public faRightFromBracket = faRightFromBracket;

  public country = computed((): OlympicCountry | undefined =>
    this.olympicService.getCountryByName(this.countryName())
  );
  public olympicCount = computed((): number => {
    const country = this.country();
    return country ? country.participations.length : 0;
  });
  public medalCount = computed((): number => {
    const country = this.country();
    return country
      ? country.participations.reduce(
          (medalCount, participation) => medalCount + participation.medalsCount,
          0
        )
      : 0;
  });
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

  // options
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

  ngOnInit(): void {
    console.log(
      `Initialized with country: ${this.countryName()}`,
      this.country()
    );
    console.log("Country's line chart data:", this.lineChartData());
  }
}
