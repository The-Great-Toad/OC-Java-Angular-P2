import { Component, input } from '@angular/core';
import { DetailsBlockData } from '../../models/details.interfaces';

@Component({
  selector: 'app-details-block',
  imports: [],
  templateUrl: './details-block.component.html',
  styleUrl: './details-block.component.scss',
})
export class DetailsBlockComponent {
  public data = input.required<DetailsBlockData>();
}
