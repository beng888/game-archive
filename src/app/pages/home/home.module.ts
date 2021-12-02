import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '@shared/shared.module';
import { FilterComponent } from './components/filter/filter.component';
import { CalendarComponent } from './components/calendar/calendar.component';

@NgModule({
  declarations: [HomeComponent, FilterComponent, CalendarComponent],
  imports: [SharedModule, HomeRoutingModule],
})
export class HomeModule {}
