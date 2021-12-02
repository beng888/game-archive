import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsRoutingModule } from './details-routing.module';
import { DetailsComponent } from './details.component';
import { MediaCardComponent } from './components/media-card/media-card.component';
import { AddBuyButtonsComponent } from './components/add-buy-buttons/add-buy-buttons.component';
import { RatingsComponent } from './components/ratings/ratings.component';
import { GameInfoComponent } from './components/game-info/game-info.component';

@NgModule({
  declarations: [
    DetailsComponent,
    MediaCardComponent,
    AddBuyButtonsComponent,
    RatingsComponent,
    GameInfoComponent,
  ],
  imports: [CommonModule, DetailsRoutingModule],
})
export class DetailsModule {}
