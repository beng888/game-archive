import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameCardComponent } from './components/game-card/game-card.component';
import { SelectComponent } from './components/select/select.component';
import { RouterModule } from '@angular/router';
import { BrowseCardComponent } from './components/browse-card/browse-card.component';

@NgModule({
  declarations: [GameCardComponent, SelectComponent, BrowseCardComponent],
  imports: [CommonModule, FormsModule, RouterModule],
  exports: [
    CommonModule,
    FormsModule,
    GameCardComponent,
    SelectComponent,
    RouterModule,
    BrowseCardComponent,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
