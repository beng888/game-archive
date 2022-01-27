import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { monthsAbbreviations } from './static';
import { selectMonthsFilter } from '@store/selectors/rawg.selectors';
import { Store } from '@ngrx/store';
import { Appstate } from 'src/app/store';
import { ActivatedRoute } from '@angular/router';

import { chunk } from 'lodash';
import { generateYearsBetween } from '@shared/helpers/functions';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit {
    private generateYearsBetween = generateYearsBetween;

    public months = this.store.select(selectMonthsFilter);
    public ABBR: any = monthsAbbreviations;
    public Years = chunk(this.generateYearsBetween(1970).reverse(), 9);
    public selectedYear!: number;
    public selectedMonth!: number;
    selectedYears!: number;

    browseYears = (arrow?: string) => {
        if (arrow === 'right') {
            if (this.selectedYears < this.Years.length - 1)
                return this.selectedYears++;
            return (this.selectedYears = this.Years.length - 1);
        }
        if (this.selectedYears > 0) return this.selectedYears--;
        return (this.selectedYears = 0);
    };

    ngOnInit(): void {
        this.route.params.subscribe((s) => {
            this.selectedYear = Number(s['year']);
            this.selectedMonth = Number(s['month']);
            this.selectedYears = this.Years.findIndex((f) =>
                f.includes(Number(this.route.snapshot.params.year))
            );
        });
    }
    constructor(
        private store: Store<Appstate>,
        private route: ActivatedRoute
    ) {}
}
