import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RawgInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        return next.handle(
            request.clone({
                setHeaders: {
                    'x-rapidapi-key':
                        '0ea299f937mshf572a188514fe8ep1e3c54jsn7a336f10c06b',
                    'x-rapidapi-host':
                        'rawg-video-games-database.p.rapidapi.com',
                },

                setParams: {
                    key: '60e6ed4eda294eee8fc4c2fe4ad07e46',
                },
            })
        );
    }
}
