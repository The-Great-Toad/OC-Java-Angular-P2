import {
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { Color, NgxChartsModule } from '@swimlane/ngx-charts';
import { filter, Subscription, take } from 'rxjs';
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
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';
import { DetailsBlockComponent } from 'src/app/core/components/details-block/details-block.component';

@Component({
  selector: 'app-dashboard',
  imports: [NgxChartsModule, FontAwesomeModule, DetailsBlockComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
  private olympicService = inject(OlympicService);
  private router = inject(Router);

  private subscriptions: Subscription[] = [];
  public olympics$!: Subscription;
  public olympicCountries = signal<OlympicCountry[]>([]);
  public totalOlympicsNb = signal<number>(0);
  public faAward = faAward;
  public errorMessage: string =
    'There was an error loading the Olympic data.<br> Please try again later.';
  public errorDetails = signal<string | null>(null);

  public pieChartData = signal<PieChartData[]>([]);
  // view: [700, 400],
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

  ngOnInit(): void {
    this.fetchOlympicData();
  }

  private fetchOlympicData() {
    this.olympics$ = this.olympicService
      .getOlympics()
      .pipe(
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

    this.subscriptions.push(this.olympics$);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  public onSelect(data: PieChartClickedData): void {
    console.log('Item clicked', data);
    if (data && data.name) {
      this.router.navigate(['/detail', data.name]);
    } else {
      console.warn('No valid data to navigate to detail');
    }
  }

  //   public onActivate(data: any): void {
  //     console.log('Activate', JSON.parse(JSON.stringify(data)));
  //   }

  //   public onDeactivate(data: any): void {
  //     console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  //   }
}
