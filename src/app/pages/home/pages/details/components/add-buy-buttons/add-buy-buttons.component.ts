import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Store } from '@core/interfaces/res';

@Component({
  selector: 'app-add-buy-buttons',
  templateUrl: './add-buy-buttons.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddBuyButtonsComponent implements OnInit {
  @Input() stores!: Store[]


  ngOnInit(): void {}
  constructor() {}
}
