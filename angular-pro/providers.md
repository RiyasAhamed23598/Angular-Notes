## Use value 

@ngModule:
```
providers: [
  { provide: 'api', useValue: '/api/pizzas' }
]
```
@ngComponent:
```
constructor(
  private http: Http,
  @Inject('api') private api: string
){}
```

## injection token

```
export const API_TOKEN = new InjectionToken<string>('api');
export const API_TOKEN_2 = new InjectionToken<string>('api');
```

@ngModule:
```
providers: [
  { provide: API_TOKEN, useValue: '/api/pizzas' }
  { provide: API_TOKEN_2, useValue: '/api/pizzas' }
]
```

@ngComponent:
```
constructor(
  private http: Http,
  @Inject(API_TOKEN) private api: string
){}
```

## useСlass

@ngModule:
```
providers: [
  { provide: FoodService, useClass: MockFoodService }
]
```

## useFactory

```
export function PizzaFactory(http) {
  return new FoodService(http, '/api/drinks');
}
//---
providers: [
  { 
  provide: FoodService, 
  useFactory: (http) => {
      return new FoodService(http, '/api/drinks');
    }
  },
  deps: [
    Http //make available in factory function
  ]
]
```
## useExisting
for restriction some methods if FoodServis and using only that provides DrinkService
```
export abstract class DrinkService {
  getDrinks: () => Observable<Drink[]>
}

providers: [
  { 
  provide: DrinkService, 
  useExisting: FoodService
  }
]
```
