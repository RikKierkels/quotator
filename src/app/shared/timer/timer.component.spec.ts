import { TimerComponent } from './timer.component';

describe('TimerComponent', () => {
  let component: TimerComponent;

  beforeEach(() => {
    component = new TimerComponent();
    component.ngOnInit();
    component.intervalControl.setValue(1);
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should tick at the set interval', done => {
    // Expecting 3 ticks but ticks first emit is 0;
    const expectedTicks = 2;

    component.tick.subscribe(ticks => {
      if (ticks === expectedTicks) done();
    });

    component.start.next();
    jest.advanceTimersByTime(3001);
    component.stop.next();
  });

  it('should not tick before its first interval', () => {
    component.tick.subscribe(fail);

    component.start.next();
    jest.advanceTimersByTime(999);
    component.stop.next();
  });

  it('should stop ticking when the timer is stopped', () => {
    let actualTicks = 0;
    component.tick.subscribe(ticks => (actualTicks = ticks));

    component.start.next();
    jest.advanceTimersByTime(3000);
    component.stop.next();
    jest.advanceTimersByTime(3000);

    expect(actualTicks).toBe(2);
  });
});
