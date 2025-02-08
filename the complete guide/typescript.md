### Types and primitives
- Primitives: number, string, boolean, (null, undefined, symbols)
- Complex types: arrays, objects
- Function types, parameters

### type inference
define type from assingment without explicitly stating this type

### functions
- type inference without explicit retyrn type setting
- can return type void

### Generics

```
function insertAtBeginning<T>(array: T[], value: T) {
  const newArray = [value, ...array];
  return newArray;
}

const demoArray = [1,2,3];
const updatedArray = insertAtBeginning(demoArray, -1);
```

### Classes 
- we can define constructor in a class
- create new object using **new** keyword
- methods instead of functions
- define public and private properties (also set it in constructor before parameters and don't define them separately in the class)

### Interfaces
- can be used as an object TYPE as alternative
- interfaces can be implemented by classes, unlike types
- another syntax^
```
interface Human {
  name: string
}

type Human = {
  name: string
}
```
