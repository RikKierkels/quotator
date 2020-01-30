import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteSavedListComponent } from 'src/app/quote/quote-saved-list/quote-saved-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { QuoteComponent } from './quote-page/quote.component';

@NgModule({
  declarations: [QuoteComponent, QuoteSavedListComponent],
  exports: [QuoteComponent],
  imports: [CommonModule, SharedModule]
})
export class QuoteModule {}
