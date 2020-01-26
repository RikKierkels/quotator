import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { Quote } from 'src/app/quote/quote.interface';
import { Icon } from 'src/app/shared/icon.enum';

@Component({
  selector: 'qu-quote-favorites-list',
  templateUrl: './quote-favorites-list.component.html',
  styleUrls: ['./quote-favorites-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuoteFavoritesListComponent {
  @Input() quotes: Quote[];
  @Output() quoteRemoved = new EventEmitter<number>();

  icon = Icon;

  trackByFn(index, item): number {
    return item.id;
  }
}
