class Boat {
    color: string = 'red';

    get formattedColor(): string {
        return `This boat is ${this.color}`;
    }

    @testDecorator
    pilot(): void {
        console.log('swish');
    }
}

function testDecorator(target: any, key: string): void {
    console.log('Target:', target);
    console.log('Key:', key);
}

var __decorate = function(decorators, target, key, desc) {
    var desc = Object.getOwnPropertyDescriptor(target, key);
    for(var decorator of decorators) {
        decorator(target, key, desc);
    }
}

testDecorator(Boat.prototype, 'pilot');


// property descriptor

// property descriptor for methods
// writable - wheter or not the property can be changed
// enumerable - whether or not the property can be looped over
// value - current property
// configurable - property definition can be changed and property can be deleted

const car = { make: 'honda', year: 2000 };
Object.getOwnPropertyDescriptor(car, 'make');
/* { value: 'honda',
    writable: true,
    enumerable: true,
    configurable: true
} */
Object.defineProperty(car, 'make', { writable: false });
/* { value: 'honda',
    writable: false,
    enumerable: true,
    configurable: true
} */

@classDecorator
class Boat {
    @testDecorator
    color: string = 'red';

    get formattedColor(): string {
        return `This boat is ${this.color}`;
    }

    @logError('oops boat was sunk')
    pilot(@parameterDecorator speed: string): void {
        if (speed === 'fast') {
            console.log('swish');
        } else {
            throw new Error();
        }
    }
}

function parameterDecorator(target: Boat, key: string, index: number) {
    // key 'pilot' 
    // index 0
}

function classDecorator(constructor: typeof Boat) {
    console.log(constructor);
}

// decorators Factory
function logError(errMessage: string) {
    return function(target: Boat, key: string, desc: PropertyDescriptor): void {
        const method = desc.value;

        desc.value = function () {
            try {
                method();
            } catch (e) {
                console.log(errMessage);
            }
        }
    }
}

function testDecorator(target: any, key: string): void {
    // we can't gat the value because target is the prototype
    const val = target[key];
}
