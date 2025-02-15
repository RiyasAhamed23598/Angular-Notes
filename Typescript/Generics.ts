class ArrayOfAnything<T> {
  constructor(public collection: T[]){}

  get(index: number): T {
    return this.collection[index]
  }
}

// Example of generics with functions

function printAnything<T>(arr: T[]): void {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
}

// printAnything<string>(['a', 'b', 'c']);
printAnything(['a', 'b', 'c']);

// Generic Constraints

interface Printable {
  print(): void;

function printHousesOrCars<T extends Printable>(arr: T) {
  arr[0].print();
}
