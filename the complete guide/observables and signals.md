- signals required initial value, observables not (except subjects)
- signals have functions set() and update(), subjects next()
- Observables - values over time, signals - values in a container
- you can read a value from signal in any point of time without a subscription
- Observables - great for managing events & streamed data, Signals - for managing application state

## Converting Signals to Observables 
```
someSignal = signal(0);
someObservable$ = toObservable(this.someSignal);
```

## Converting Observables To Signals
```
interval$ = interval(1000);
intervalSignal = toSignal(this.interval$);
// or with initial value
intervalSignal = toSignal(this.interval$, {initialValue: 0});
// with toSignal() function there is not needed to clean up the subscription manually, but you can disable this behaviour with:
intervalSignal = toSignal(this.interval$, {manualCleanup: true});
```

## Creating custom observable
```
customInterval$ = new Observable((subscriber) => {
  let timesExecuted = 0;
  const interval = setInterval(() => {
      if ( timesExecuted > 5){
        clearInterval(interval);
        subscriber.complete();
        return;
      }
     subscriber.next( {message: 'new value', value: timesExecuted});
     timesExecuted++;
  }, 2000)
});

```
