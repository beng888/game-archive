import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'games', component: HomeComponent },
    { path: 'games/lists/:slug', component: HomeComponent },
    { path: 'games/calendar/:year/:month', component: HomeComponent },

    {
        path: 'games/:details',
        loadChildren: () =>
            import('./pages/details/details.module').then(
                (m) => m.DetailsModule
            ),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeRoutingModule {}
