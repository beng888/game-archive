import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { environment } from '@environment/environment';
import { Browse, Game, List, Res } from '@core/interfaces/res';
import { Params } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RawgService {
  constructor(private http: HttpClient) {}
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

  getGameDetails(id: string): Observable<any> {
    const gameTrailersRequest = this.http.get(
      `${environment.BASE_URL}/games/${id}/movies`
    );
    const gameScreenshotsRequest = this.http.get(
      `${environment.BASE_URL}/games/${id}/screenshots`
    );

    return forkJoin({
      gameScreenshotsRequest,
      gameTrailersRequest,
    }).pipe(
      map((resp: any) => {
        return {
          screenshots: resp['gameScreenshotsRequest']?.results,
          trailers: resp['gameTrailersRequest']?.results,
        };
      })
    );
  }
}
