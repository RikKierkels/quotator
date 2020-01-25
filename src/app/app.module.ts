import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Environment } from 'src/app/shared/environment';
import { environment } from 'src/environments/environment';
import { QuoteModule } from 'src/app/quote/quote.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { QuoteFavoriteService } from 'src/app/quote/quote-favorite.service';

const initFavoritesFactory = (favoriteService: QuoteFavoriteService) => {
  return () => favoriteService.syncWithStorage();
};

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, QuoteModule, SharedModule],
  providers: [
    { provide: Environment, useValue: environment },
    {
      provide: APP_INITIALIZER,
      useFactory: initFavoritesFactory,
      deps: [QuoteFavoriteService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
