import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Browse } from '@core/interfaces/rawg';
import { getImage } from '@shared/helpers/functions';

@Component({
    selector: 'app-browse-card',
    templateUrl: './browse-card.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrowseCardComponent implements OnInit {
    @Input() item!: Browse;
    getImage = getImage;
    params: string = '';

    selectQuery = (item: Browse) => {
        this.router.navigate(['games'], {
            queryParams: {
                [this.params]:
                    this.params === 'platforms' || this.params === 'stores'
                        ? item.id
                        : item.slug,
            },
        });
    };

    ngOnInit(): void {
        this.route.params.subscribe((s) => (this.params = s.slug));
    }
    constructor(private router: Router, private route: ActivatedRoute) {}
}
