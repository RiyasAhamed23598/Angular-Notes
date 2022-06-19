### Benefits of using a Store

- State is only changed in a controlled way
- Component state is driven from the Store
- Immutable Objects are predictable
- Immutability is fast with Angular, no change detection
- Time-travel debugging and Developer Tools
- Avoid data synchronisation problems
- Server side rendering, client side rehydration

## creating an Observable Store with Rx

store.ts
```
/*
store.set('todos', [{}, {}])

store.select('todos')
*/

const state: State = {
  playlist: undefined
}

export class Store {
  private subject = new BehaviorSubject<State>();
  private store = this.subject.asObservable().pipe(distinctUntilChanged());
  
  get value() {
    return this.subject.value;
  }
  
  select<T>(name: string): Observable<T> {
    return this.store.pipe(pluck(name));
  }
  
  set(name: string, state: any) {
    this.subject.next({
      ...this.value,
      [name]: state
    })
  }
}
```

state.ts
```
export interface State {
  playlist: any[]
}
```
