import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteSavedListComponent } from 'src/app/quote/quote-saved-list/quote-saved-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [QuoteSavedListComponent],
  exports: [QuoteSavedListComponent],
  imports: [CommonModule, SharedModule]
})
export class QuoteModule {}
