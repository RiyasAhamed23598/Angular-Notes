## The TS Type System
- Helps us catch errors during development
- Uses 'type annotations' to analyze our code
- Only active during development
- doesn't provide any perfomance optimization

## Types
E.g.: String - It's a value that has all properties + methods that we ssume that a string (or other type) has.
Types basically are shortcuts

Object Types can be casted to another Type. Primitives - can't.
Primitives: number, string, boolean, symbol, void, null, undefined

**Type annotations** - code we add to tell Typescript what type of value a variable will refer to
**Type inference** - Typescript tries to figure out what type of value a variable refers to. Works when variable declaration and initialization are in the same line of code

#### When to use Type Annotations?
- when we declare a variable on one line then initialize it later
- when we want a variable to have a type that can't be inferred
- when a function returns the 'any' type and we need to clarify the value

#### return type never
```
const throwError = (message: string): never => {
  throw new Error(message);
}
```

### type annotations for destructuring objects in functions parameters
```
({ date, weather}: { date: Date, weather: string }): void => {}
```

### type annotations for destructuring objects in variables
```
const { age }: { age: number } = profile; 
```

### Multiple types in array
```
const importantDates: (Date | string)[] = [];
importantDates.push('2030-10-10');
importantDates.push(new Date());
```

## Tuples
tuple - Array-like structure where each element represents some property of a record
order in tuple have a very specific meaning
```
const pepsi: [string, boolean, number] = ['brown', true, 40];
type Drink = [string, boolean, number]; // type alias
```
### Modifiers
**public** - can be called anywhere, anytime
**private** - can only be called by other methods in this class
**protected** - can be called by other methods in this class or by other methods in child classes
