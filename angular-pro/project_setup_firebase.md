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
@Injectable()
export class AuthService {
  constructor(
    private af: AngularFireAuth
  ){}
  
  createUser(email: string, password: string) {
    return this.af.auth.createUserWithEmailAndPassword(email, password);
  }
  
  loginUser(email: string, password: string) {
    return this.af.auth.signInWithEmailAndPassword(email, password);
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


