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

## Use class

@ngModule:
```
providers: [
  { provide: FoodService, useClass: MockFoodService }
]
```

