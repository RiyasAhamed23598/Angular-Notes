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



