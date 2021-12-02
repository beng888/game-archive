import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { years, monthsAbbreviations } from './static';
import { selectMonthsFilter } from '@store/selectors/rawg.selectors';
import { Store } from '@ngrx/store';
import { Appstate } from 'src/app/store';
import { ActivatedRoute } from '@angular/router';

import { chunk } from 'lodash';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit {
  public months = this.store.select(selectMonthsFilter);
  public ABBR: any = monthsAbbreviations;
  public Years = chunk(years.reverse(), 9);
  public selectedYear!: string;
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
      this.selectedYear = s['year'];
      this.selectedMonth = Number(s['month']);
      this.selectedYears = this.Years.findIndex((f) =>
        f.includes(this.route.snapshot.params['year'])
      );
    });
  }
  constructor(private store: Store<Appstate>, private route: ActivatedRoute) {}
}
