## Reactive Forms

in html template: 
- [formGroup]="form
- formGroupName="store"
- formControlName="code"
- formArrayName="stock"

in component:
```
form = new FromGroup({
  store: new FormGroup({
    code: new FormControl('b1b2')
  }),
  stock: new FormArray([])
})
```
```
<pre> {{form.value | json }} </pre> // - for visual representation of form
```

add formGroup to formArray

```
  const control = this.form.get('stock') as FormArray;
  constrol.push(this.createStock(stock)); // creates FormGroup from passed data
```

remove formGroup from formArray

```
  const control = this.form.get('stock') as FormArray;
  control.removeAt(index)
```
#### Using a formbuilder
```
form = this.fb.group({
  store: this.fb.group({
    code: ''
  }),
  stock: this.fb.array([])
})
```

#### create map from Array
```
const myMap = products.map<[number, Products]>(product => [product.id, product]);

this.productMap = new Map<number, Product>(myMap);
```

### subscribing to the value changes in forms

```
this.form.get('stock')
    .valueChanges.subscribe(value => {
      console.log(value) 
    })
});
```

#### reset a form

this.parent.get('selector).reset({product: '1', quantity: '10'}); //ng-untouched ng-pristine instead of ng-touched ng-dirty

## Control Value Accessor

interface ControlValueAccessor {
  writeValue(obj: any): void
  registerOnChange(fn: any): void
  registerOnTouched(fn: any): void
  setDisabledState(isDisabled: boolean)?: void
}

```
const COUNTER_CONTROL_ACCCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forvardRef(() => StockCounterComponent)
  // multi: true
}

@Component({
  providers: [COUNTER_CONTROL_ACCESSOR]
})
export class MyComponent implements ControlValueAccessor {
  private onTouch: Function;
  private onModelChange: Function;
  
  registerOnTouched(fn) {
    this.onTouch = fn
  }
  
  registerOnChange(fn) {
    this.onModelChange = fn
  }
  
  // set value outside component
  wrireValue(value) {
    this.value = value || 0;
  }   
  
  increment () {
    if (this.value < this.max) {
      this.value = this.value + this.step;      
      this.onModelChange(this.value);
    }
    this.onTouch();
  }
}
```
### Formgroup validators

```
form = this.fb.group({
  selector: this.createStock({}),
  stock: this.fb.array([])
}, { validator: StockValidators.checkStockExists });

export class StockValidators {
  static checkStockExists(control: AbstractControl) {
    const stockItem = control.get('stock');
    const selector = control.get('selector');
    
    if (!(stockItem && selector)) return null;
    
    const exists = stockItem.value.some((stock) => {
      return stock.product_id === parseInt(selector.value.product_id, 10);
    });
    
    return exists ? {stockExists: true} : null;
  }
}
```

