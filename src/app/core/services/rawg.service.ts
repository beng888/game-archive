import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { environment } from '@environment/environment';
import { Browse, Game, List, Res } from '@core/interfaces/rawg';
import { Params } from '@angular/router';
import { map } from 'rxjs/operators';

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
        // console.log('%c%s', 'color: #d90000', URL);

        // const { next_posts_page } = this.details$;

        // console.log(this.router.routerState.snapshot.root);

        // if (
        //     params.hasOwnProperty('details') &&
        //     next_posts_page?.includes(params.details)
        // )
        //     return EMPTY;

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

        // const URL = this.router.routerState.snapshot.url;

        // const { next_posts_page } = this.details$;

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

        // if (URL.includes(params.details) && next_posts_page) {

        // if (next_posts_page?.includes(params.details)) {
        //     return gameRedditsRequest.pipe(
        //         map((res: any) => {
        //             return {
        //                 reddit_posts: res.results,
        //                 next_posts_page: res.next,
        //             };
        //         })
        //     );
        // }

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
                    next_posts_page: resp['gameRedditsRequest']?.next,
                };
            })
        );
    }

    getNextPage({ page, pageType, next }: any): Observable<any> {
        return this.http.get(`${environment.BASE_URL}${page}`).pipe(
            map((res: any) => {
                return {
                    [pageType]: res.results,
                    [next]: res.next,
                };
            })
        );
    }

    constructor(private http: HttpClient) {}
}
