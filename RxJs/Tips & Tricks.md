## Use finalize for side effects on completion

- if you unsibscribe observable from subscription, a complete callback will be ignored
- complete callback evoked only of ibservable completes naturally
- **finalyze()** - invokes in all cases

## Extract common operator logic into standalone functions

- **retryWhen()** - Retry an observable sequence on error based on custom criteria

## Use combination operators to access state from secondary streams

- **withLatestFrom()**

## Automate unsubscribe process with takeUntill

## Use filter and partition for conditional logic

- **partition()** - Split one observable into two based on provided predicate.

```
const [evens, odds] = source.pipe(partition(val => val % 2 === 0));

const subscribe = merge(
  evens.pipe(map(val => `Even: ${val}`)),
  odds.pipe(map(val => `Odd: ${val}`))
).subscribe(val => console.log(val));
```
