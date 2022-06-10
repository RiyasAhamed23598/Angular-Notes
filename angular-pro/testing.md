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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CounterComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;

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
} )
```
