import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
} from '@angular/core';
import { Store, Vendor } from '@core/interfaces/rawg';

@Component({
    selector: 'app-add-buy-buttons',
    templateUrl: './add-buy-buttons.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddBuyButtonsComponent implements OnInit {
    @Input() stores!: Store[];
    @Input() vendors!: Vendor[];

    getLink = (id: number) =>
        window.open(this.vendors.find((a) => a.store_id === id)?.url);
    ngOnInit(): void {}
    constructor() {}
}
