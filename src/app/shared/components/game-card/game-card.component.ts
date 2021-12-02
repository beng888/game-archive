import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from '@core/interfaces/res';
import { getImage } from '@shared/helpers/functions';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameCardComponent {
  @Input() game!: Game;
  public screenshot = 0;

  getImage = getImage;

  getColor(value: number): string {
    if (value > 75) return '#5ee432';
    if (value > 50) return '#fffa50';
    if (value > 30) return '#f7aa38';
    if (value > 0) return '#ef4655';
    return 'gray';
  }

  onHover(i: number) {
    this.screenshot = i;
  }

  selectGenre(genres: number | undefined) {
    this.router.navigate(['games'], {
      // relativeTo: this.route,
      queryParams: { genres },
      queryParamsHandling: 'merge',
    });
  }

  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {}
}
