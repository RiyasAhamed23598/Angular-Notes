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


