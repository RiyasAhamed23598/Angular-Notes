### init test environment 

included to general test.ts file

TestBed.initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
)

## shallow testing Pipes

```
describe('Shallow FileSizePipe test', () => {
    @Component({
      selector: 'comp',
      template: `
        size: {{ size | filesize:suffix }}
      `
    })
    class TestComponent {
      suffix: any;
      size:number = 123456789;
    }

    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let el: HTMLElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [
          FileSizePipe,
          TestComponent
        ],
      });
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      el = fixture.nativeElement;
    })

    it('should convert bytes to megabytes', () => {
      fixture.detectChanges();
      expect(el.textContent).toBe(' size: 117.74MB ');
      component.size = 1029281;
      fixture.detectChanges();
      expect(el.textContent).toBe(' size: 0.98MB ');
    })
  })
```

## Testing service with httpClient

```
describe('StockInventoryService', () => {
  let service: StockInventoryService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StockInventoryService,
      ],
      imports: [HttpClientTestingModule]
    });

    httpClient = TestBed.inject(HttpClient);
    service = TestBed.inject(StockInventoryService);
  });

  it ('should get cart items', () => {
    spyOn(httpClient, 'get').and.returnValue(of([...cartItems]));

    service.getCartItems().subscribe((result: Item[]) => {
        expect(result.length).toBe(1);
        expect(result).toEqual(cartItems);
      }
    )
  })
})
```

### Testing components

```
describe('CounterComponent', () => {

  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CounterComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    component.value = 0;
  });

  it('should increment correctly', () => {
    component.increment();
    expect(component.value).toBe(1);
  })

  it('should not increment over the maximum value', () => {
    for (let i = 0; i < 200; i++){
      component.increment();
    }
    expect(component.value).toBe(100);
  })

  it('should not increment over the maximum value with input', () => {
    component.step = 20;
    component.max = 20;
    component.increment();
    component.increment();
    expect(component.value).toBe(20);
  })

  it('should call the output on a value change', () => {
    spyOn(component.changed, 'emit').and.callThrough();
    component.step = 100;
    component.increment();
    expect(component.changed.emit).toHaveBeenCalledWith(100);
  })
  
  it ('should increment when the + button is clicked', () => {
    el.query(By.css('button:first-child')).triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.value).toBe(1);
    expect(el.query(By.css('p')).nativeElement.textContent).toBe('1');
  });

  it ('should increment the value when the up arrow is pressed', () => {
    const event = new Event('KeyboardEvent') as any;
    event.code = 'ArrowUp';
    el.query(By.css('.counter > div > div')).triggerEventHandler('keydown', event);
    expect(component.value).toEqual(1);
  });
} )
```

## Testing container Components with async providers

```
class MockStockInventoryService {
  getProducts() {
    return of([{id:1, price: 10, name: 'Test'}]);
  }
  getCartItems() {
    return of([{id:1, quantity: 1}]);
  }
}

describe('StockInventoryComponent', () => {

  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;
  let el: DebugElement;
  let service: StockInventoryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [
        StockInventoryComponent,
        StockBranchComponent,
        StockCounterComponent,
        StockProductComponent,
        StockSelectorComponent
      ],
      providers: [
        { provide: StockInventoryService, useClass: MockStockInvertoryService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    component.value = 0;
    service = el.injector.get(StockInventoryService);
  });

  it('should get cart items and products on init', () => {
    spyOn(service, 'getProducts').and.callTrough();
    spyOn(service, 'getCartItems').and.callTrough();
    component.ngOnInit();
    expect(service.getProducts).toHaveBeenCalled();
    expect(service.getCartItems).toHaveBeenCalled();
  });
  
  it('should create a product map from the service response', () => {
    component.ngOnInit();
    expect(component.productMap.get(1)).toEqual({id:1, price: 10, name: 'Test'});
  });
  
  it('should create a stock item for each cart item', () => {
    spyOn(component, 'addStock');
    component.ngOnInit();
    expect(component.addStock).toHaveBeenCalledWith({id:1, quantity: 1});
  });
})
```

### NO_ERRORS_SCHEMA

allow to use a particular component without warrying about importing child components
```
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [
        StockInventoryComponent
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: StockInventoryService, useClass: MockStockInvertoryService }
      ]
    }).compileComponents();
```

### Testing an Attribute Directive

```
@Component({
  template: `
    <input type="text" [value]="value" credit-card>
  `
})
class TestComponent {
  value = 123456;
}

describe('CreditCardDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let el: DebugElement;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CreditCardDirective,
        TestComponent
      ],
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  }
  
  it('should format the string with spaces, () => {
    const directive = el.query(By.directive(CreditCardDirective)).nativeElement;
    directive.value = '475123';
    directive.dispatchEvent(new Event('input'));
    expect(directive.value).toBe('4751 23');
    directive.value = '4751239812019201';
    directive.dispatchEvent(new Event('input'));
    expect(directive.value).toBe('4751 2398 1201 9201');
  });
  
  it('should have a max-length of 16 characters, () => {
    const directive = el.query(By.directive(CreditCardDirective)).nativeElement;
    directive.value = '475123345685756723424365465645646';
    directive.dispatchEvent(new Event('input'));
    expect(directive.value).toBe('4751 2334 5685 7567');    
  });
}
```
