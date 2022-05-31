### Enable route tracing

RouterModule.forRoot(ROUTES, {enableTracing: true} ) //for logging routing events

### subscribing to router events

```
this.router.events.pipe(
  filter(event => instanceof NavigationEnd)
).subscribe(event => {
  console.log(event);
});
```

### router outlet events

```
<router-outlet
  (activate)="onActivate($event) //returns activated component
  (deactivate)="onDeactivate($event)>
```

### inject data from resolver to component

```
data: Observable <{messages: Mail[] }> = this.route.data;
constructor(private route: ActivatedRoute) {}
```
