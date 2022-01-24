import { Component, HostListener, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Appstate } from './store';
import { selectBackground } from '@store/selectors/rawg.selectors';
import { isMobile, loadParentPlatforms } from '@store/actions/rawg.actions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    title = 'game-archive';
    isMobile = false;
    BG$ = this.store.pipe(select(selectBackground));

    @HostListener('window:resize', [])
    checkIfMobile = () => {
        if (window.innerWidth <= 640 && this.isMobile === false) {
            this.isMobile = true;
            this.store.dispatch(isMobile(true));
        }

        if (window.innerWidth > 640 && this.isMobile === true) {
            this.isMobile = false;
            this.store.dispatch(isMobile(false));
        }
    };

    onActivate(event: any) {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    }

    onWindowScroll() {
        this.checkIfMobile();
    }

    ngOnInit(): void {
        this.checkIfMobile();

        this.store.dispatch(loadParentPlatforms());
    }
    constructor(private store: Store<Appstate>) {}
}
