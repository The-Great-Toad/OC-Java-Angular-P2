import { Component, input } from '@angular/core';

export interface DetailsBlockData {
  title: string;
  details: Details[];
}

export interface Details {
  label: string;
  value: number | string;
}

@Component({
  selector: 'app-details-block',
  imports: [],
  templateUrl: './details-block.component.html',
  styleUrl: './details-block.component.scss',
})
export class DetailsBlockComponent {
  public data = input.required<DetailsBlockData>();
}
