import {delay, map, mergeMap, of, toArray} from "rxjs";

describe('Subscribe & assert testing in RxJs', () => {

  it('should compare each emitted value', () => {
    const source$ = of(1,2,3);

    const final$ = source$.pipe(
      map(val => val * 10)
    );

    const expected = [10, 20, 30];
    let index = 0;

    final$.subscribe((val) => {
      expect(val).toEqual(expected[index]);
      index ++;
    })
  });

  it('should compare emitted values on completion with toArray', () => {
    const source$ = of(1,2,3);

    const final$ = source$.pipe(
      map(val => val * 10),
      toArray()
    );

    const expected = [10, 20, 30];

    final$.subscribe((val) => {
      expect(val).toEqual(expected);
    })
  });

  it('should let you test async operations with done callback', done => {
    const source$ = of("ready","set","go").pipe(
      mergeMap((message, index) => of(message).pipe(delay(index * 1000)))
    );

    const expected = ["ready","set","go"];
    let index = 0;

    source$.subscribe(val => {
      expect(val).toEqual(expected[index]);
      index++;
    }, null, done);
  });
});
