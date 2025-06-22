import {
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { Color, NgxChartsModule } from '@swimlane/ngx-charts';
import { Subscription } from 'rxjs';
import { mapToPieChartData } from 'src/app/core/models/mappers/chart-data.mapper';
import { PieChartData } from 'src/app/core/models/ngx-charts/pie-chart-data.interface';
import { PieChartOptions } from 'src/app/core/models/ngx-charts/pie-chart.interface';
import { OlympicCountry } from 'src/app/core/models/olympics.interfaces';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAward } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  imports: [NgxChartsModule, FontAwesomeModule],
  providers: [NgxChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
  private olympicService = inject(OlympicService);

  private subscriptions: Subscription[] = [];
  public olympics$!: Subscription;
  public olympicCountries = signal<OlympicCountry[]>([]);
  public totalOlympicsNb = signal<number>(0);
  public faAward = faAward;

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

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics().subscribe({
      next: (olympicCountries: OlympicCountry[]) => {
        this.olympicCountries.set(olympicCountries);
        this.totalOlympicsNb.set(olympicCountries[0].participations.length);
        this.pieChartData.set(mapToPieChartData(olympicCountries));
        console.log('pieChartData:', this.pieChartData());
      },
      error: (err) => console.error('Error fetching olympics data', err),
    });

    this.subscriptions.push(this.olympics$);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
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
