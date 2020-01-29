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
  selector: 'qu-quote-saved-list',
  templateUrl: './quote-saved-list.component.html',
  styleUrls: ['./quote-saved-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuoteSavedListComponent {
  @Output() quoteRemoved = new EventEmitter<string>();
  @Input() quotes: Quote[];

  icon = Icon;

  trackByFn(index: number, quote: Quote): string {
    return quote._id;
  }
}
