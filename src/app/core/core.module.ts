import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RawgInterceptor } from './interceptors/rawg.interceptor';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [SharedModule, HttpClientModule],
  exports: [HeaderComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RawgInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
