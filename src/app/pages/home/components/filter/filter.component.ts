import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { List } from '@core/interfaces/rawg';
import { select, Store } from '@ngrx/store';
import { Appstate } from 'src/app/store';
import * as fromRawgActions from 'src/app/store/actions/rawg.actions';
import * as RawgSelectors from 'src/app/store/selectors/rawg.selectors';
import { Observable } from 'rxjs';
import { top, new_releases, top_NewRelease } from './static';
import {
    selectDescription,
    selectTitle,
} from '@store/selectors/rawg.selectors';

type Filter = [
    string,
    Observable<any>,
    string[],
    string[],
    string?,
    string[]?,
    string[]?
];

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
})
export class FilterComponent implements OnInit {
    @Input() loading!: boolean | null;

    public top: top_NewRelease[] = top;
    public new_releases: top_NewRelease[] = new_releases;
    public selectedList: string | null = null;
    public listSelect: boolean = false;
    public hasParams: boolean = false;
    public description$!: Observable<string | null>;
    public title$!: Observable<string | null>;
    public readMore: boolean = false;
    public filtering: boolean = true;

    @ViewChild('description') elementView!: ElementRef;

    public Filters: Filter[] = [
        [
            'Platforms',
            this.store.select(RawgSelectors.selectPlatformsFilter),
            ['name'],
            ['parent_platforms', 'id'],
            'platforms',
            ['name'],
            ['platforms', 'id'],
        ],
        [
            'Release Date',
            this.store.select(RawgSelectors.selectYearsFilter),
            ['from', 'to'],
            ['dates', 'from', 'to'],
            'years',
            ['year'],
            ['dates', 'year', 'year'],
        ],
        [
            'Genres',
            this.store.select(RawgSelectors.selectGenresFilter),
            ['name'],
            ['genres', 'slug'],
        ],
        [
            'Order by',
            this.store.select(RawgSelectors.selectOrderFilter),
            ['name'],
            ['ordering', 'id'],
        ],
        [
            'Tags',
            this.store.select(RawgSelectors.selectTagsFilter),
            ['name'],
            ['tags', 'slug'],
        ],
    ];

    ngOnInit(): void {
        this.description$ = this.store.pipe(select(selectDescription));
        this.title$ = this.store.pipe(select(selectTitle));

        this.store.dispatch(fromRawgActions.loadGenres());
        this.route.params.subscribe((s) => {
            if (s.slug) return (this.hasParams = true);
            return (this.hasParams = false);
        });

        this.route.params.subscribe((S) => {
            const lists = [...top, ...new_releases];
            if (S.year) return (this.selectedList = 'Release Calendar');
            const P = lists.find(
                (f) => f.url.replace('lists/', '') === S.slug
            )?.name;
            if (P) return (this.selectedList = P);
            return (this.selectedList = 'Main');
        });
    }

    byID = (A: List, B: List) => A?.id === B?.id;

    selectListFilter = (data: top_NewRelease) => {
        this.selectedList = data.name;
        this.router.navigate(
            [`games${data.url !== '' ? `/${data?.url}` : ''}`],
            {
                queryParams: data?.q,
            }
        );
    };

    selectFilter(data: { key: string; value: string }) {
        const { key, value } = data;

        const unnecessaryParam = () => {
            if (key === 'parent_platforms') return 'platforms';
            if (key === 'platforms') return 'parent_platforms';
            return '';
        };

        this.router.navigate(['games'], {
            // relativeTo: this.route,
            queryParams: { [key]: value || null, [unnecessaryParam()]: null },
            queryParamsHandling: 'merge',
            // skipLocationChange: true,
        });
    }

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private store: Store<Appstate>
    ) {}
}
