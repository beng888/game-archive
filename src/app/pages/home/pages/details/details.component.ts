import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Appstate } from '@store/index';
import { selectGameDetails } from '@store/selectors/rawg.selectors';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
})
export class DetailsComponent implements OnInit {
  details$ = this.store.pipe(select(selectGameDetails));

  ngOnInit(): void {}

  constructor(private store: Store<Appstate>) {}
}
