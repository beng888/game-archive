import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { Rating } from '@core/interfaces/res';
import { getColor, getImage } from '@shared/helpers/functions';
import { State } from '@store/reducers/rawg.reducer';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameInfoComponent implements OnInit {
  @Input() info!: State;
  readMore: boolean = false;
  activeImage: number | null = null;

  getColor = getColor;
  getImage = getImage;

  getRating = (arr: Rating[]) =>
    arr.reduce((prev: Rating, current: Rating) =>
      +prev.percent > +current.percent ? prev : current
    );

  ngOnInit(): void {}
  constructor() {}
}
