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
  @Output() tick = new EventEmitter<void>();

  private initialState: TimerState = { isTicking: false, intervalInSec: 5 };
  private subscription: Subscription;

  icon = Icon;
  intervalControl = new FormControl(this.initialState.intervalInSec);

  start = new Subject<void>();
  stop = new Subject<void>();

  commands$ = merge(
    this.start.pipe(mapTo({ isTicking: true })),
    this.stop.pipe(mapTo({ isTicking: false })),
    this.intervalControl.valueChanges.pipe(
      distinctUntilChanged(),
      map(interval => ({ interval }))
    )
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

  timer$ = this.state$.pipe(
    switchMap(state => {
      const intervalInMs = state.intervalInSec * 1000;
      return state.isTicking ? timer(intervalInMs, intervalInMs) : NEVER;
    }),
    tap(() => this.tick.emit())
  );

  ngOnInit(): void {
    this.subscription = this.timer$.subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
