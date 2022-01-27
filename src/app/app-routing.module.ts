import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '@shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('./pages/home/home.module').then((m) => m.HomeModule),
    },
    {
        path: 'browse',
        loadChildren: () =>
            import('./pages/browse/browse.module').then((m) => m.BrowseModule),
    },
    { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
