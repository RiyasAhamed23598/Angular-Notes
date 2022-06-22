### Firebase CLI

**npm install -g firebase-tools
firebase login
firebase init**
- select Database and Hosting
- select name of application to link
- what file shoud be used for database rules? - database.rules.json
- what do you want to use as your public directory? - public
- configure as a SPA? - Y

npm build:production - for hosting(as result we have a hosting url in terminal)

### fixed import path

tsconfig.json

```
{
  "compilerOptions": {
    "paths": {
      "store": ["src/store.ts"]
    }
  }
}
```

### Firebase integration

```
@NgModule({
  imports: [
    AngularFireModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ]
})
```
**shared.module.ts**
```
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        AuthService
      ]
    }
  }
}
```
**auth.service.ts**
```
export interface User {
  email: string,
  uid: string,
  authenticated: boolean
}

@Injectable()
export class AuthService {
  auth$ = this.af.authState.pipe(tap((next) => {
    if (!next) {
      this.store.set('user', null);
      return;
    }
    const user: User = {
      email: next.email,
      uid: next: uid,
      authenticated: true
    }
    this.store.set('user', user);
  });

  constructor(
    private store: Store,
    private af: AngularFireAuth
  ){}
  
  get user() {
    return this.af.auth.currentUser;
  }
  
  get authState() {
    return this.af.authState;
  }
  
  createUser(email: string, password: string) {
    return this.af.auth.createUserWithEmailAndPassword(email, password);
  }
  
  loginUser(email: string, password: string) {
    return this.af.auth.signInWithEmailAndPassword(email, password);
  }
  
  logoutUser() {
    return this.af.auth.signOut();
  }
}
```
**login.component.ts**
```
async registerUser(event: FormGroup) {
  const { email, password } = event.value;
  try {
    await this.authService.loginUser(email, password);
    this.router.navigate(['/']);
  } catch (err) {
    this.error = err.message;
  }
}
```

## Working with database
 
shared.module.ts
```
imports: [
  AngularFireDatabaseModule
]
```

meals.service.ts
```
export interface Meal {
  name: string,
  ingredients: string[],
  timestamp: number,
  $key: string,
  $exists: () => boolean
}

@Injectable()
export class MealsService {
  meals$: Observable<Meal[]> = this.db.list(`meals/${this.uid}`).pipe(
    tap(next => this.store.set('meals', next);
  );
  
  constructor (
    private store: Store,
    private db: AngularFireDatabase,
    private authService: AuthService
  ){}
  
  get uid() {
    return this.authService.user.uid;
  }
}
```


