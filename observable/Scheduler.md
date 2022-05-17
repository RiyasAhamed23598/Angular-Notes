## AsyncScheduler

**asyncScheduler** similar to setTimeout

```
// work, delay?, state?
asyncSheduler.schedule(
  (value) => console.log(value), //function
  2000, //delay
  'hello!" //value that should be passed to work function
);
```

asyncSheduler returns a subscription function, which we can use to unsubscribe

```
of(1,2,3, asyncScheduler).subscribe(observer);

of(1,2,3).pipe(
// use delay() operator. In this case error message will be emitted immediately
  observeOn(asyncScheduler, 3000)
).subscribe(observer);
```

- **observeOn()** - subscription immediately, emit value on scheduler
- **subscribeOn()** - subscription on scheduler

## AsapScheduler

**AsapScheduler** - similar to queueMicrotask or Promise.resolve

```
queueMicrotask(() => console.log('from microtask');

asapScheduler.scheduler(() => console.log('here'));

range(1,5, asapScheduler).subscribe(observer);

```

## AnimationFrameScheduler

**animationFrameScheduler** - similar to requestAnimationFrame

```
animationFrameScheduler.scheduler(function
(position) {
  ball.style.transform = `translate3d(0, ${position}px, 0)`;

  if(position <= 300) {
    this.schedule(position + 1);
  }
}, 0, 0);

interval(0, animationFrameScheduler).pipe(
   takeWhile(val => val <= 300)
).subscribe(val => {
  ball.style.transform = `translate3d(0, ${position}px, 0)`;
});
```

## QueueScheduler

**queueScheduler** - execute task synchronously, on queue

```
queueScheduler.scheduler(() => {
  queueScheduler.scheduler(() => {
    console.log('secondQueue');
  });
  console.log('firstQueue');
});
```
