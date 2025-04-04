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
