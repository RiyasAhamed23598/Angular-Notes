### Load children
```
{
  path: 'dashboard',
  loadChildren: (): LoadChildrenType<DashboardModule> =>
  import('./dashboard').then((m: { DashboardModule: DashboardModule }) => m.DashboarModule),
},
 ```
 
 ## Preloading Strategies
 
 ```
 import: [
  RouterModule.forRoot(ROUTES, { preloadingStrategy: PreloadAllModules })
 ]
 ```
 
 ### Custom preloading strategies
 
 ```
 export class CustomPreload implements PreloadingStrategy {
    preload(route: Route, fn: () => Observable<any>): Observable<any> {
      return route.data && route.data.preload ? fn() : of(null);
    };
 } 
 //-------
 {
  path: 'dashboard',
  data: { preload: true },
  loadChildren: (): LoadChildrenType<DashboardModule> =>
    import('./dashboard').then((m: { DashboardModule: DashboardModule }) => m.DashboarModule),
},
//-------
providers: [CustomPreload]
import: [
  RouterModule.forRoot(ROUTES, { preloadingStrategy: CustomPreload })
 ]
 ```
 
 
