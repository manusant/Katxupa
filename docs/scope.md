## Scope Functions
The Katxupa library contains several functions whose sole purpose is to execute a block of code within the context of an object. 
When you call such a function on an object with a lambda expression provided, it forms a temporary scope. In this scope, 
you can access the object through _**it**_ or in some cases _**this**_. Such functions are called scope functions. 

There are five of them: **_letIt_**, **_runIt_**, **_withIt_**, **_applyIt_**, and **_alsoIt_**.

Basically, these functions all perform the same action: execute a block of code on an object. What's different is how this 
object becomes available inside the block and what the result of the whole expression is.

Here's a typical example of how to use a scope function:
```ts
({name: "Manuel", age: 36})
    .letIt(it => {
        console.log(it);
        it.age++;
        console.log(it);
    });
```
If you write the same without letIt, you'll have to introduce a new variable and repeat its name whenever you use it.
```ts
const user = {name: "Manuel", age: 36};
console.log(user);
user.age++;
console.log(user);
```

Scope functions don't introduce any new technical capabilities, but they can make your code more concise and readable.

Due to the many similarities between scope functions, choosing the right one for your use case can be tricky. 
The choice mainly depends on your intent and the consistency of use in your project. Below, we provide detailed descriptions 
of the differences between scope functions and their conventions.

### Function selection
To help you choose the right scope function for your purpose, we provide this table that summarizes the key differences between them.

| Function | Object Reference | Return Value   | Is extension function                        |
|----------|------------------|----------------|----------------------------------------------|
| letIt    | it               | Lambda Result  | Yes                                          |
| runIt    | this             | Lambda Result  | Yes                                          |
| runIt    | -                | Lambda Result  | No: called without the context object        |
| withIt   | this             | Lambda Result  | No: takes the context object as an argument. |
| applyIt  | this             | Context Object | Yes                                          |
| alsoIt   | it               | Context Object | Yes                                          |

> Note that **letIt** & **alsoIt** can be called with standard lambda/arrow functions, but because JavaScript arrow functions don't 
> have an own this context, **runIt** & **applyIt** have to be called with standard functions.

Detailed information about these functions is provided in the dedicated sections below.

Here is a short guide for choosing scope functions depending on the intended purpose:
* Executing a lambda on non-nullable objects: **letIt**
* Introducing an expression as a variable in local scope: **letIt**
* Object configuration: **applyIt**
* Object configuration and computing the result: **runIt**
*  Running statements where an expression is required: non-extension **runIt**
* Additional effects: **alsoIt**
* Grouping function calls on an object: **withIt**

The use cases of different scope functions overlap, so you can choose which functions to use based on the specific 
conventions used in your project or team.

Although scope functions can make your code more concise, avoid overusing them: it can make your code hard to read and 
lead to errors. We also recommend that you avoid nesting scope functions and be careful when chaining them because it's 
easy to get confused about the current context object and value of this or it.

### Distinctions
Because scope functions are similar in nature, it's important to understand the differences between them. There are two 
main differences between each scope function:

* The way they refer to the context object.
* Their return value.

#### Context object: this or it
Inside the lambda passed to a scope function, the context object is available by a short reference instead of its actual name. 
Each scope function uses one of two ways to reference the context object: as a function receiver (_this_) or as a lambda argument (_it_). 
Both provide the same capabilities, so we describe the pros and cons of each for different use cases and provide recommendations for their use.

```ts
function main() {
    const str = "Hello"
    // this
    str.runIt(function () {
        console.log(`The string's length: ${this.length}`)
    } );

    // it
    str.letIt(it => {
        console.log(`The string's length: ${it.length}`)
    })
}
```
### Functions
To help you choose the right scope function for your use case, we describe them in detail and provide recommendations for use. 
Technically, scope functions are interchangeable in many cases, so the examples show conventions for using them.

#### letIt
* **The context object** is available as an argument (_it_).
* **The return value** is the lambda result.

_letIt_ can be used to invoke one or more functions on results of call chains.
```ts
const data: Array<number> | null = await idsFromFile();

const str = data?.letIt(it => convertToString(it)) ?? "empty";
```

#### withIt
* **The context object** is available as a receiver (_this_).
* **The return value** is the lambda result.

As _withIt_ is not an extension function: the context object is passed as an argument, but inside the lambda, it's available as a receiver (_this_).

We recommend using _withIt_ for calling functions on the context object when you don't need to use the returned result. 
In code, with can be read as "**with this object, do the following**."

```ts
const numbers = mutableListOf("one", "two", "three");

withIt(numbers, function () {
    console.log(`'withIt' is called with argument ${this}`);
    console.log(`It contains ${this.length} elements`);
});
```

You can also use withIt to introduce a helper object whose properties or functions are used for calculating a value.
```ts
const numbers = mutableListOf<string>("one", "two", "three");

const firstAndLast = withIt(numbers, function () {
    return `The first element is ${this.first()}, the last element is ${this.last()}`
});
console.debug(firstAndLast);
```

#### runIt
* **The context object** is available as a receiver (this).
* **The return value** is the lambda result.

_runIt_ does the same as _withIt_ but it is implemented as an extension function. So like _letIt_, you can call it on the context object using dot notation.

_runIt_ is useful when your lambda function both initializes objects and computes the return value.

```ts
const service = new MultiportService("https://api.example.com/data", 80)

const result = service.runIt(function () {
    this.port = 8080;
    const result = this.query(prepareRequest());
    console.debug(`Request sent to port ${this.port}"`);
    return result;
});

// the same code written with letIt() function:
const letResult = service.letIt(it => {
    it.port = 8080;
    const result = it.query(prepareRequest());
    console.debug(`Request sent to port ${it.port}"`);
    return result;
});
```

You can also invoke _runIt_ as a non-extension function. The non-extension variant of _runIt_ has no context object, but it still returns the lambda result. 
Non-extension run lets you execute a block of several statements where an expression is required. 
In code, non-extension _runIt_ can be read as "**run the code block and compute the result.**"

```ts
const hexNumberRegex = runIt(() => {
    const digits = "0-9"
    const hexDigits = "A-Fa-f"
    const sign = "+-"

   return  new RegExp(`[${sign}]?[${digits}${hexDigits}]+`, "g");
});

let match;
while ((match = hexNumberRegex.exec("+123 -FFFF !%*& 88 XYZ")) !== null) {
    console.log(match[0]);
}
```

#### applyIt
* **The context object** is available as a receiver (this).
* **The return value** is the object itself.

As _applyIt_ returns the context object itself, we recommend that you use it for code blocks that don't return a value and 
that mainly operate on the members of the receiver object. The most common use case for _applyIt_ is for object configuration. 
Such calls can be read as "**apply the following assignments to the object.**"

```ts
const manuel = {name: "Manuel", age: 36};

manuel.applyIt(function () {
    this.name = "Manuel Santos";
    this.age++;
    (this as any)["country"] = "Portugal";
});
console.log(manuel)
```
Another use case for _applyIt_ is to include _applyIt_ in multiple call chains for more complex processing.

#### alsoIt
* **The context object** is available as an argument (_it_).
* **The return value** is the object itself.

_alsoIt_ is useful for performing some actions that take the context object as an argument.
Use _alsoIt_ for actions that need a reference to the object rather than its properties and functions, or when you
don't want to shadow the _this_ reference from an outer scope.

When you see also in code, you can read it as "**and also do the following with the object**."

```ts
const numbers = mutableListOf<string>("one", "two", "three");

numbers
    .alsoIt(it => console.log(`The list elements before adding new one: ${it}`))
    .push("four");
```

#### takeIf and takeUnless
In addition to scope functions, the _Katxupa_ standard library contains the functions **takeIf** and **takeUnless**. 
These functions let you embed checks of an object's state in call chains.

When called on an object along with a predicate, **takeIf** returns this object if it satisfies the given predicate. 
Otherwise, it returns _undefined_. So, _takeIf_ is a filtering function for a single object.

**takeUnless** has the opposite logic of _takeIf_. When called on an object along with a predicate, _takeUnless_ returns 
_undefined_ if it satisfies the given predicate. Otherwise, it returns the object.

When using _takeIf_ or _takeUnless_, the object is available as a lambda argument (_it_).

```ts
const number: number = Math.floor(Math.random() * 100);

const evenOrNull = number.takeIf(it =>  it % 2 == 0);
const oddOrNull = number.takeUnless(it => it % 2 == 0);

console.log(`even: ${evenOrNull}, odd: ${oddOrNull}`);
```
> When chaining other functions after takeIf and takeUnless, don't forget to perform a null check or use a safe call (_?._) because their return value is nullable.

```ts
const str = "Hello";
const caps = str.takeIf(it => it.length > 0)?.toUpperCase();
//const caps = str.takeIf(it => it.length > 0).toUpperCase() //compilation error
console.debug(caps);
```

**takeIf** and **takeUnless** are especially useful in combination with scope functions. For example, you can chain 
_takeIf_ and _takeUnless_ with _letIt_ to _runIt_ a code block on objects that match the given predicate. To do this, 
call _takeIf_ on the object and then call let with a safe call (_?_). For objects that don't match the predicate, _takeIf_ 
returns undefined and _letIt_ isn't invoked.

```ts
function displaySubstringPosition(input: string, sub: string) {
    input.indexOf(sub)
        .takeIf(it => it >= 0)
        ?.letIt(it => {
            console.log(`The substring ${sub} is found in ${input}.`)
            console.log(`Its start position is ${it}.`)
        });
}

displaySubstringPosition("010000011", "11");
displaySubstringPosition("010000011", "12");

// Output:
//  The substring 11 is found in 010000011.
//  Its start position is 7.
```