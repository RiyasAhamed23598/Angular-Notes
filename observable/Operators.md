## What is Observable?

- **Observable** represents a stream or collection of data that can be delivered over time.
- **subscriber** - has method *next()*;
- **observer** - with 3 parameters - next, error, complete
- **subscription** - object is returned after subscribing an observable, that has method *unsubscribe()*, which evoces complete, if there are any other subscriptions.

```
const observer =  {
  next: value => console.log('next', value);
  error: value => console.log('error', value);
  complete: () => console.log('complete'); //can be evoked one time and does not emit any values
}

const observable = new Observable( subscriber => {
  subscriber.next('hello'); // emiting a value
  subscriber.next('world');
  subscriber.complete();
  
  // or return a function on complete
}

const subscription = observable.subscribe( observer );
const subscription2 = observable.subscribe( observer );

subscription.add(subscription2); //then we can unsubscribe from two subscriptions callong once subscription.unsubscribe();

//or

observable.subscribe( 
  value => console.log('next', value),
  null,
  () => console.log('complete')
 );
```

- Observables are lazy (cold by default) - until something acually subscribing emited value, nothing will be run


## Observables creation operations

- **creation operators** - standalone functions to create observables

```
of('some string'); // values are emiting synchronously

from([1, 2, 3, 4, 5]); // create observable from array, string, Promise or iterator(from generator);

fromEvent(document, 'click');

interval(1000); // wait 1000 until first emition

timer(0, 1000); // first argument - when will be emited the first value

range (1,5) // result 1, 2, 3, 4, 5 synchronously

empty() // creates an empty observable
``` 

### creating observable from generator function

```
function* hello() {
  yield 'hello';
  yield 'World';
}

const iterator = hello();
// console.log(iterator.next().value);

const source$ = from(iterator);

source$.subscribe(observer);
```

## Pipable Operators

pipable operators is a simply function that appear in a pipe method, receiving the source observable

- **map()**
- **pluck()** take a property name from emited value. pluck('code'); source.pipe(pluck('job', 'title')); = obj.job.title
- **mapTo()** - mapTo('keyPressed') - always emit 'keyPressed' value // Map emissions to constant value.
- **filter()**

```
function calculateScrollPercent(element) {
  const {scrollTop, scrollHeight, clientHight} = element;
  
  return (scrollTop/ (scrollHeight - clientHeight))*100;
}

const progressBar = document.querySelector('.progress');

const scroll$ = fromEvent(document, 'scroll');
const progress$ = scroll$.pipe(
  //percent progress
  map(({target}) => calculateScrollPercent (target.documentElement))
);

scroll$.subscribe(percent => {
  progressBar.style.width = `${percent}`
});
```

- **reduce((acc, curr) => acc + curr, 0)** // emit value only when observable completes
- **scan((acc, curr) => acc + curr, 0))** // the same as reduce, but emit value on every next;
- **tap()** // tap also can take observer(with next, complete, error) to trigger side effects instead of simple function

## Filtering Operators

- **take(3)** 
- **first(({y}) => y > 200)** - first that have a proper condition
- **takeWhile(({y}) => y <= 200)** - all values befor condition is false
- **takeUntil(notifier$)** // comptete, when notifier$ emit the first value
- **distinctUntilChanged()** distinctUntilChanged((prev, curr) => prev.name == curr.name);
- **distinctUntilKeyChanged('key')**

## Rate limiting operators

- **debounceTime(500)** - used when we care only abou the last value after pause 500ms
- **debounce(() => interval(1000)**
- **throttleTime(500)** - emit only first value, and then ignores others, until certain time is pass **throttleTime(500, asyncScheduler, {leading: true, trailing: false})
- **sampleTime(500)** - emits only 1 value each time interval
- **sample(notifier$)** - return the last value when notifier is triggered
- **auditTime(500)** - return the last value in the interval which starts when the first value is emited - the same as **throttleTime(500, asyncSheduler, {leading: false, trailing: true})

## Transformation operators
Flattering operators - take observable, emit observable and return observable

- **mergeAll()**
- **mergeMap()** - combine of map and mergeAll
- **switchMap()** - only one inner subscription at once
- **concatMap()** - no other inner observable ever be activated before previous completed, and creates a queue of other inner observables; uses when we need to keep on order of requests
- **exhaustMap()** - check if there are any active inner observables and does not emit outer in this case.

- **catchError()** - return other observable in case of error ( we can use creation of empty observable by using **empty()**

- **finalize()** - takes a function whit will be called once in the competion of observable

## Combination operators

- **startWith('a','b','c')** - the first values
- **endWith('a','b','c')** - the last values

- **concat(observable1$, observable2$)** - queue observable execution, the second observeble starts after comleting the first // can be pipable or not 

- **merge(obs1$, obs2$)** - one observable from several // not array

- **combineLatest(obs1$, obs2$)** - emits the first value(array) after two observables emit something

- **forkJoin(obs1$, obs2$)** - emits the last value of each observable after all are completed // Promise.all()
- **forkJoin({first: obs1$, second: obs2$})**


