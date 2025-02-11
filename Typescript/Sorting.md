### configuring ts compiler and run

**tsconfig.json**
```
"compilerOptions": {
    "outDir": "./dist/out-tsc",     // for compiled code
    "rootDir": "./src,              // for sourse code
}
```
``-w`` - flag in terminal - watch changes in all files in directory and recompile

```npm init -y``` - generate package.json file
**npm i nodemon** - this package responsible for executing code once it was compiled
**npm i concurrently** - run multiple scripts in one time

**package.json**
```
"scripts": {
    "start:build": "tsc -w",
    "start:run": "nodemon build/index.js",
    "start": "concurrently npm:start:*"
}
```
### Sorter
```
export class Sorter {
  constructor(public collection: NumbersCollection) { }

  sort(): void {
    const { length } = this.collection;

    for (let i=0; i < lenght; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        if (this.collection.compare(j, j+1) {
          this.collection.swap(j, j+1)
        }
      }
    }
  }
}
```

## Type guard
```
if (this.collection instanceof Array) {}     // objects, that are created with constructor
if (typeof this.collection === 'string') {}    // for primitive values or 'object'
if (typeof this.collection === 'object') {}
```
