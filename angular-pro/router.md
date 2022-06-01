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

### Auxiliary named router outlets

```
<router-outlet></router-outlet>
<router-outlet name="pane"></router-outlet>

export const ROUTES: Routes = [
  {
    path: 'folder/:name',
    component: MailFolderComponent
  },
  {
    path: 'message/:id',
    component: MailViewComponent,
    outlet: 'pane'
  }
]
```

navigate:

```
<a [routerLink]="['', { outlets: { pane: ['message, massage.id']}}]" ></a>

this.router.navigate(
  ['', { outlets: { pane: ['message, this.massage.id']}}]
)

//navigate to primary autlet

<a [routerLink]="[{ outlets: { primary: 'folder/inbox, pane: null}}]" ></a>
```

 ## Guards
 
 - **canLoad** for lazy-loaded modules
 - **canActivate**
 - **canActivateChild**
 - **canDeactivate**

```
@Injectable()
export class AuthGuard implements CanLoad, CanActivate {
  constructor(private authService: AuthService) {}
  
  canLoad(): boolean | UrlTree {
    return this.authService.checkPermissions();
  }
  
  canActivate(): boolean | UrlTree {
    return this.authService.isLoggedIn();
  }
}
```

```
export declare interface CanActivate {
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;
}
```
