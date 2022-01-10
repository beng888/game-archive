import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameCardComponent } from './components/game-card/game-card.component';
import { SelectComponent } from './components/select/select.component';
import { RouterModule } from '@angular/router';
import { BrowseCardComponent } from './components/browse-card/browse-card.component';
import { ImageViewerComponent } from './components/image-viewer/image-viewer.component';
import { ObserveVisibilityDirective } from './directives/observeVisibility.directive';
import { readMoreDirective } from './directives/readMore.directive';

@NgModule({
    declarations: [
        GameCardComponent,
        SelectComponent,
        BrowseCardComponent,
        ImageViewerComponent,
        ObserveVisibilityDirective,
        readMoreDirective,
    ],
    imports: [CommonModule, FormsModule, RouterModule],
    exports: [
        CommonModule,
        FormsModule,
        GameCardComponent,
        SelectComponent,
        RouterModule,
        BrowseCardComponent,
        ReactiveFormsModule,
        ImageViewerComponent,
        ObserveVisibilityDirective,
        readMoreDirective,
    ],
})
export class SharedModule {}
