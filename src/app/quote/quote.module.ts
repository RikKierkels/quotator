import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteSavedListComponent } from 'src/app/quote/quote-saved-list/quote-saved-list.component';

@NgModule({
  declarations: [QuoteSavedListComponent],
  exports: [QuoteSavedListComponent],
  imports: [CommonModule]
})
export class QuoteModule {}
