import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowseComponent } from './browse.component';
import { PageNotFoundComponent } from '@shared/components/page-not-found/page-not-found.component';
const routes: Routes = [
    { path: '', component: BrowseComponent },
    { path: ':slug', component: BrowseComponent },
    { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BrowseRoutingModule {}
