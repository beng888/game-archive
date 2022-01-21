import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { environment } from '@environment/environment';
import { Browse, Game, List, Res } from '@core/interfaces/rawg';
import { Params } from '@angular/router';
import { map } from 'rxjs/operators';
import { Appstate } from '@store/index';
import { Store } from '@ngrx/store';
import * as fromRawgActions from '@store/actions/rawg.actions';

@Injectable({
    providedIn: 'root',
})
export class RawgService {
    private defaultParams = {
        page_size: 21,
        page: 1,
    };

    getParentPlatforms(): Observable<Res<List>> {
        return this.http.get<Res<List>>(
            `${environment.BASE_URL}/platforms/lists/parents`
        );
    }

    getGenres(): Observable<Res<List>> {
        return this.http.get<Res<List>>(`${environment.BASE_URL}/genres`);
    }

    getBrowse(q: Params): Observable<Res<Browse>> {
        this.store.dispatch(fromRawgActions.loadBrowse());

        return this.http.get<Res<Browse>>(
            `${environment.BASE_URL}/${q.params.slug}`,
            {
                params: {
                    ...this.defaultParams,
                },
            }
        );
    }

    getGames(q: Params): Observable<Res<Game>> {
        const { queryParams, params, url } = q;
        const URL = url === '/' ? 'games/lists/main' : url.split('?')[0];

        this.store.dispatch(fromRawgActions.loadGames());

        const getQueries = () => {
            if (url === '/') return { ordering: '-relevance', discover: true };
            return { ...queryParams, filter: true, comments: true };
        };

        return this.http.get<Res<Game>>(`${environment.BASE_URL}/${URL}`, {
            params: {
                ...getQueries(),
                ...this.defaultParams,
            },
        });
    }

    getSearchResults(q: string): Observable<Res<Game>> {
        return this.http.get<Res<Game>>(`${environment.BASE_URL}/games`, {
            params: {
                page_size: 10,
                page: 1,
                search: q,
            },
        });
    }

    getGameDetails(q: Params): Observable<any> {
        const { queryParams, params, url } = q;
        this.store.dispatch(fromRawgActions.loadGameDetails());

        const gameTrailersRequest = this.http.get(
            `${environment.BASE_URL}/games/${params.details}/movies`
        );
        const gameScreenshotsRequest = this.http.get(
            `${environment.BASE_URL}/games/${params.details}/screenshots`
        );
        const gameStoresRequest = this.http.get(
            `${environment.BASE_URL}/games/${params.details}/stores`
        );
        const gameRedditsRequest = this.http.get(
            `${environment.BASE_URL}/games/${params.details}/reddit`
        );

        return forkJoin({
            gameScreenshotsRequest,
            gameTrailersRequest,
            gameStoresRequest,
            gameRedditsRequest,
        }).pipe(
            map((resp: any) => {
                return {
                    screenshots: resp['gameScreenshotsRequest']?.results,
                    trailers: resp['gameTrailersRequest']?.results,
                    vendors: resp['gameStoresRequest']?.results,
                    reddit_posts: resp['gameRedditsRequest']?.results,
                    loadNextPostsPage: resp['gameRedditsRequest']?.next,
                };
            })
        );
    }

    getNextPage({ page, pageType, loadType }: any): Observable<any> {
        return this.http.get(`${environment.BASE_URL}${page}`).pipe(
            map((res: any) => {
                return {
                    [loadType]: res.next,
                    results: res.results,
                    pageType,
                };
            })
        );
    }

    constructor(private http: HttpClient, private store: Store<Appstate>) {}
}
