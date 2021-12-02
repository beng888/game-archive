import { Component, OnInit } from '@angular/core';
import { Game } from '@core/interfaces/res';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Appstate } from 'src/app/store';
import { ActivatedRoute } from '@angular/router';
import { selectGames } from '@store/selectors/rawg.selectors';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  games$!: Observable<Array<Game>>;
  isCalender: boolean = false;

  ngOnInit(): void {
    this.games$ = this.store.pipe(select(selectGames));
    // this.route.params.subscribe((p) => (this.params = p));
    this.route.params.subscribe(
      (p) => (this.isCalender = Object.keys(p)?.includes('year'))
    );

    // console.log((this.params = this.route.snapshot.params));
    // this.route.params.subscribe((p) => {
    //   if (Object.keys(p)?.length > 0) {
    //     console.log(p);
    //   }
    // });
  }

  constructor(private store: Store<Appstate>, private route: ActivatedRoute) {
    const id: Observable<string> = route.params.pipe(map((p) => p.id));
  }
}
