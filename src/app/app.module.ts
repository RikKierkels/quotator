import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Environment } from 'src/app/shared/environment';
import { environment } from 'src/environments/environment';
import { QuoteModule } from 'src/app/quote/quote.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, QuoteModule, SharedModule],
  providers: [{ provide: Environment, useValue: environment }],
  bootstrap: [AppComponent]
})
export class AppModule {}
