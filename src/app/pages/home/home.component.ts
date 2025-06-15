import { Component, inject, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
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

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
  }
}
