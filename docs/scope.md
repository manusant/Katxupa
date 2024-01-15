## Scope Functions
The Katxupa library contains several functions whose sole purpose is to execute a block of code within the context of an object. 
When you call such a function on an object with a lambda expression provided, it forms a temporary scope. In this scope, 
you can access the object through _**it**_ or in some cases _**this**_. Such functions are called scope functions. 

There are five of them: **_letIt_**, **_runIt_**, **_withIt_**, **_apply_**, and **_also_**.

Basically, these functions all perform the same action: execute a block of code on an object. What's different is how this 
object becomes available inside the block and what the result of the whole expression is.

Here's a typical example of how to use a scope function:

```ts
const result = "Hello".letIt( it => {
    console.log(it.toUpperCase());
    return it.length;
});
console.log(result); // Output: HELLO\n5
```