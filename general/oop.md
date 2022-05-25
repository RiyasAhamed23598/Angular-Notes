## encapsulation

Encapsulation is achieved when each object keeps its state private, inside a class. 
Other objects don’t have direct access to this state. Instead, they can only call a list of public functions — called methods.

## abstraction

Applying abstraction means that each object should only expose a high-level mechanism for using it.
This mechanism should hide internal implementation details. It should only reveal operations relevant for the other objects.

## inheritance

Objects are often very similar. They share common logic. But they’re not entirely the same. Ugh…
So how do we reuse the common logic and extract the unique logic into a separate class? One way to achieve this is inheritance.
It means that you create a (child) class by deriving from another (parent) class. This way, we form a hierarchy.
The child class reuses all fields and methods of the parent class (common part) and can implement its own (unique part).

## polymorphism

Simply put, polymorphism gives a way to use a class exactly like its parent so there’s no confusion with mixing types. 
But each child class keeps its own methods as they are.
This typically happens by defining a (parent) interface to be reused. 
It outlines a bunch of common methods. Then, each child class implements its own version of these methods.
