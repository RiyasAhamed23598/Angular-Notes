## generate component
ng g c user

## create custom two way binding, not only for forms

without signals:

```
@Input() size: number
@Output() sizeChange: number
```

using signals

```
size = model();
//or
size = model.required();
```

## get rid of zone.js
**angular.json** -> remove "zone.js"
**main.ts** -> change to 
```
bootstrapApplication(AppComponent{
  providers: provideExperimentalZonelessChangeDetection
}).catch((err) => console.error(err));
```
