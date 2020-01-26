import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Environment } from 'src/app/shared/environment';
import { environment } from 'src/environments/environment';
import { QuoteModule } from 'src/app/quote/quote.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { QuoteSaveService } from 'src/app/quote/quote-save.service';

const initQuoteSaveFactory = (quoteSaveService: QuoteSaveService) => {
  return () => quoteSaveService.syncWithStorage();
};

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, QuoteModule, SharedModule],
  providers: [
    { provide: Environment, useValue: environment },
    {
      provide: APP_INITIALIZER,
      useFactory: initQuoteSaveFactory,
      deps: [QuoteSaveService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
