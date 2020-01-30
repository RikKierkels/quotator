import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { TimerState } from 'src/app/shared/timer/timer-state.interface';
import { merge, NEVER, Observable, Subject, Subscription, timer } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  mapTo,
  scan,
  shareReplay,
  startWith,
  switchMap,
  tap
} from 'rxjs/operators';
import { Icon } from 'src/app/shared/icon.enum';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'qu-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerComponent implements OnInit, OnDestroy {
  @Output() tick = new EventEmitter<number>();

  icon = Icon;
  intervalControl = new FormControl(0);
  start = new Subject<void>();
  stop = new Subject<void>();

  private subscription: Subscription;
  private initialState: TimerState = { isTicking: false, intervalInSec: 5 };
  private intervalChange$ = this.intervalControl.valueChanges.pipe(
    distinctUntilChanged()
  );

  private commands$ = merge(
    this.start.pipe(mapTo({ isTicking: true })),
    this.stop.pipe(mapTo({ isTicking: false })),
    this.intervalChange$.pipe(map(intervalInSec => ({ intervalInSec })))
  );

  state$: Observable<TimerState> = this.commands$.pipe(
    startWith(this.initialState),
    scan(
      (state: TimerState, command: TimerState): TimerState => ({
        ...state,
        ...command
      })
    ),
    shareReplay(1)
  );

  private timer$ = this.state$.pipe(
    switchMap(state => {
      const intervalInMs = state.intervalInSec * 1000;
      return state.isTicking ? timer(intervalInMs, intervalInMs) : NEVER;
    }),
    tap(tickCount => this.tick.emit(tickCount))
  );

  ngOnInit(): void {
    this.intervalControl.setValue(this.initialState.intervalInSec, {
      emitEvent: false
    });
    this.subscription = this.timer$.subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
