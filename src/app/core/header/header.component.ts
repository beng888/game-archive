import {
    Component,
    ElementRef,
    HostListener,
    OnInit,
    ViewChild,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Appstate } from 'src/app/store';
import { headerLinks } from './static';
import { selectCurrentRoute } from 'src/app/store/selectors/router.selectors';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { RawgService } from '@core/services/rawg.service';
import { Game, Res } from '@core/interfaces/rawg';
import { getImage } from '@shared/helpers/functions';
import { selectScrollToTop } from '@store/selectors/rawg.selectors';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
    public headerLinks: string[] = headerLinks;
    public searching: boolean = false;
    public menuOpen: boolean = false;
    public windowScrolled!: boolean;
    public route = this.store.select(selectCurrentRoute);
    public searchResults: Array<Game> | null = null;
    private searchInputValue$ = new Subject<any>();

    public showScrollToTop$ = this.store.pipe(select(selectScrollToTop));

    getImage = getImage;

    @ViewChild('searchInput') searchInput!: ElementRef;
    @ViewChild('head') head!: ElementRef;

    @HostListener('window:scroll', [])
    onWindowScroll() {
        const top =
            window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop;

        if (top > 200) this.windowScrolled = true;

        if (this.windowScrolled && top < 100) this.windowScrolled = false;
    }

    scrollToTop = () => {
        this.head.nativeElement.scrollIntoView({
            behavior: 'smooth',
        });
    };

    doSearch = () => {
        this.searching = !this.searching;
        this.searchInput.nativeElement.focus();
    };

    // search = debounce(function (f) {
    //   return f.value.search;
    // }, 1000);

    onKeyUp = ($event: any) => {
        const { value } = $event.target;
        this.searchInputValue$.next(value);
    };

    selectSearchResult(slug: string) {
        this.searchResults = null;
        this.router.navigate(['games', slug]);
    }

    onSubmit(f: NgForm) {
        this.router.navigate(['games'], {
            queryParams: { search: f.value.search },
        });
    }

    ngOnInit(): void {
        this.searchInputValue$
            .pipe(
                filter((res) => res.length > 2),
                debounceTime(1000),
                distinctUntilChanged()
            )
            .subscribe((s) =>
                this.service.getSearchResults(s).subscribe((S: Res<Game>) => {
                    this.searchResults = S.results;
                })
            );
    }

    constructor(
        private store: Store<Appstate>,
        private router: Router,
        private service: RawgService
    ) {}
}
