import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { Icon } from 'src/app/shared/icon.enum';

@Component({
  selector: 'qu-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  @Output() clicked = new EventEmitter<void>();
  @Input() altText: string;
  @Input() icon: Icon;
  @Input() inverted: boolean;
}
