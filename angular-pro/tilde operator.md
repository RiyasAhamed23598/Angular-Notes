## ~ (Bitwise Not operator)

In JavaScript, the tilde ~ Bitwise NOT operator is commonly used right before an indexOf() to do a boolean check (truthy/falsy) on a string.

```
if (~foo.indexOf("w")) {
  // item in list
} else {
  // item not in list
}
```

The Bitwise NOT operator effectively works like this:
**// ~N -> -(N+1)**

So if -1 is returned it will be turned into 0 which is falsy. Anything that is not falsy is truthy.

## What to use
Fortunately as of ES7 released in 2016, you can just use Array.includes instead for an accurate boolean check.

```
var foo = "hello world";

foo.includes("w"); // true
foo.includes("z"); // false
```
