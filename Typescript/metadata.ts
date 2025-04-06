// tsconfig.json
//   "experimentalDecorators": true,                   /* Enable experimental support for legacy experimental decorators. */
//   "emitDecoratorMetadata": true, 
// npm install reflect-metadata

import 'reflect-metadata';

const plane = {
    color: 'red'
};

/* Reflect.defineMetadata('note', 'hi there', plane);
Reflect.defineMetadata('height', 10, plane);

const note = Reflect.getMetadata('note', plane);
const height = Reflect.getMetadata('height', plane);
console.log(note);
console.log(height); */

Reflect.defineMetadata('note', 'hi there', plane, 'color');
const note = Reflect.getMetadata('note', plane, 'color');
console.log(note);


// -------------------------------------------
@printMetadata
class Plane {
    color: string = 'red';

    @markFunction('Hi there')
    fly(): void {
        console.log('vroom');
    }
}

function markFunction(secret: string) {
    return function (target: Plane, key: string) {
        Reflect.defineMetadata('secret', secret, target, key);
    }
}

function printMetadata(target: typeof Plane) {  //typeof Plane - reference to type of the constructor function
    for ( let key in target.prototype) {
        const metadata = Reflect.getMetadata('secret', target.prototype, key);
        console.log(key, metadata);
    }
}
