## Subject

- subject is **Observable** - has pipe and subscribe methods
- subjects is **Observer** - has next, error and complete methods
- subjects is **multicast observer** - deliver the same value to all register observers (unicast)

```
const loading$ = new Subject();

export const loadingService = {
  showLoading: () => loading$.next(true),
  hideLoading: () => loading$.next(false),
  loadingStatus$: loading$.asObservable()
}
```

- **share()** - convert unicast to multicast observable
- **multicast(() => new Subject())**

```
const interval$ = interval(2000);
const multicastedInterval$ = interval$.pipe(multicast(() => new Subject()) // connectable observables 

const connectedSub = multicastedInterval$.connect();

connectedSub.unsubscribe(); //for removing all subscriptions

//or

const multicastedInterval$ = interval$.pipe(
    multicast(() => new Subject(),
    refCount() // handle unsubscribe to inner connected subject
)

//or 

const multicastedInterval$ = interval$.pipe(
    share()
);
```

## BehaviorSubject

const subject$ = new BehaviorSubject(0); // A variant of Subject that requires an initial value and emits its current value whenever it is subscribed to.

## ReplaySubject

const subject$ = new ReplaySubject(3); //  dont need an initial value, but we use it if new subscribers need to receive a number of previously emited values

- **shareReplay** - turns unicast observable to multicast and also replays last values

```
shareReplay(1) // replay only last value
shareReplay(1, 2000) // second argument - how long replayed values will be available

## AsyncSubject

const subject$ = AsyncSubject();

emit the last single value to all subscriptions only when this observable is complete.

subject$.complete();
