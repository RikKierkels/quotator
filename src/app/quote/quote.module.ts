import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteFavoritesListComponent } from './quote-favorites-list/quote-favorites-list.component';

@NgModule({
  declarations: [QuoteFavoritesListComponent],
  exports: [QuoteFavoritesListComponent],
  imports: [CommonModule]
})
export class QuoteModule {}
