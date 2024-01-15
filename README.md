# Katxupa
**Delicious Dish for Typescript and JavaScript projects.**

In [Cape Verde](https://en.wikipedia.org/wiki/Cape_Verde) we have a saying:

"_Put a person to work in the field and serve them anything other than [Katxupa](https://www.crumbsnatched.com/cachupa-traditional-dish-of-cape-verde/) 
for breakfast, and you'll notice a decline in productivity and motivation. Therefore, give them Katxupa and spice it up on the side._"

Just as "_Katxupa_" is an essential part of Cape Verdean culture, this library brings _functional_ elements to enhance your 
productivity and developer happiness. So, consume (use) it!

> **Katxupa**, Cape Verde’s national dish, is a flavorful stew consisting of hominy, beans, seasoned meats, and vegetables. 
> Each family has its unique version, leading to delightful variations. 
> One undeniable fact: there is no Cape Verdean who doesn't appreciate Katxupa ("Cachupa") — whether for breakfast, lunch, dinner, or any time, anywhere.

## Why Katxupa
For starters, the "_K_" in **Katxupa** stands for [Kotlin](https://kotlinlang.org/), which was the primary inspiration for this library. Drawing from the 
functional programming paradigm of Kotlin and its concise yet expressive syntax, Katxupa aims to bring similar benefits 
to Typescript and JavaScript developers.

### What Makes Katxupa Special?
* **Functional Delight**: _Katxupa_ introduces functional programming concepts to enhance your code's expressiveness and clarity.

* **Kotlin-Inspired Goodness**: Leveraging lessons learned from Kotlin, _Katxupa_ provides utilities and extensions that streamline your workflow.

* **Boosted Productivity**: Enjoy a more productive development experience with _Katxupa_'s utility classes, sequences, durations, and more.

* **Developer Happiness**: Inspired by the joy of coding in Kotlin, Katxupa seeks to bring happiness to your TypeScript and JavaScript projects.

### Key Features
* **Scope Functions**: _Kotlin-like_ scope functions, provides a set of functions to execute a block of code in the context of a given object: _letIt_, _runIt_, _withIt_, _apply_, and _also_.

* **Collections Functions**: _Kotlin-like_ functions for Arrays, Maps, and Sets: Apply concise and expressive operations on collections.

* **Sequences**: Lazy sequences with a _Kotlin-esque_ feel, providing a convenient way to work with iterable data.

* **Duration**: A flexible and comprehensive time duration class with support for various units, offering better time handling.

* **Optional**: A type that represents an optional value, helping to avoid null or undefined-related issues.

* **Result and Either**: Functional constructs to handle success, errors, and alternate paths in a more expressive manner.

* **Inspired by Cape Verde**: Infused with the spirit of [Cape Verde](https://en.wikipedia.org/wiki/Cape_Verde)  and its cherished dish **Katxupa**, this library aims to add flavor to your coding experience.

### Get a Taste of Katxupa
Explore the documentation and see how Katxupa can bring a delightful touch to your TypeScript and JavaScript projects. 
From functional programming utilities to time handling and result handling, **Katxupa** is here to make your coding journey _more enjoyable_.

## Installation
This package is build up with simplicity in mind, brings no additional dependencies, and it's published in NPM https://www.npmjs.com/package/katxupa.

It can be installed using your preferred package manager.

### NPM
```shell
npm install katxupa
```

### PNPM
```shell
pnpm install katxupa
```

### YARN
```shell
yarn add katxupa
```

## Usage
### Scope Functions
Simply call any value with **_letIt_**, **_runIt_**, **_also_** or **_apply_**, and it'll be passed as the argument or the context of a scope function.

```ts
const person = {name: "Manuel", email: "ney.br.santos@gmail.com", age: 35};

person.letIt(it => {
    console.log(`${it.name},`);
    it.age < 30 ? console.log("A Young Man") : console.log("An Old Man");
    return it.age;
}).also(it => {
    console.log(`Actual Age is ${it}`);
});
// Output:
//      Manuel,
//      An Old Man
//      Actual Age is 35
```

It also supports the use of the new [Optional Chaining Operator](https://github.com/tc39/proposal-optional-chaining), 
bringing the logic of [Kotlin's Null Safe Calls](https://kotlinlang.org/docs/reference/null-safety.html) to the JavaScript world.

```ts
 const user = await this.userRepository.findOneBy({
    id: userId,
});

user?.runIt(function() {
    this.emailService.send(this.email, `${this.name} welcome to the Katxupa library`);
});
```

You can execute a block of code only if a value is neither null nor undefined:
```ts
const data: string | null = await getData();

data?.also(it => console.log(`Already initialized: ${it}`)) ?? console.log("Still not initialized");
```
The above code is equivalent to:
```ts
if (data != null && data != undefined)
    console.log(`Already initialized: ${str!}`);
else
    console.log("Still not initialized");
```

The usage of **_takeIf_** & **_takeUnless_** is a bit different. You can call any value with **_takeIf_** and it will 
return the caller instance if the predicate is true, or undefined if it's false (and vice versa when using **_takeUnless_**).
```ts
const account = await accountService.getAccount(id);

account.takeIf(it => {
    return addressBook.has(it.email);
})?.also(it => {
    emailService.send(it.email, "You are entitled for crypto airdrop")
}) ?? console.log(`Account with ${id} not found in the system`);
```

### Null Safety
* Null-safety through [Optional Chaining Operator](https://github.com/tc39/proposal-optional-chaining) for scope functions:
```ts
// Only run the code block if "numberOrUndefined" is defined 
const numberOrUndefinedOrNull = await bitcoinService.getPrice();
numberOrUndefinedOrNull?.letIt((it) => {
    it++;
    it = it * 100;
    return it;
});

// Actually, there is no need to declare a variable
(await bitcoinService.getPrice())
    ?.letIt((it) => {
        it++;
        it = it * 100;
        return it;
    });
```
* **_Optional_** wrapper for general purpose:
```ts
// Example 1
// Get Usecase:
//    1- Validate if user exists
//    2- Through an HttpError if not 
//    3- Return the user object
return optionalOf(user)
    .orElseThrow(() => new NotFoundError("User doesn't exist"))
    .get();

// Example 2
// Delete Usecase:
//    1- Validate if user exists
//    2- Through an HttpError if not 
//    3-  Delete the user from the database asynchronously and await for the result
await Optional.of(user)
  .orElseThrow(() => new HttpError(409, "User doesn't exist"))
  .runAsync(() => this.userRepository.delete({id: userId}));

// Example 3
// Update usecase:
//    1- Validate if user exists
//    2- Through an HttpError if not
//    3- If exists, merge the existing one with additional userData
//    4- Call the user repository and save the updated user asyncronously, returning a promise
//            
return optionalOf(user)
    .orElseThrow(() => new HttpError(409, "User doesn't exist"))
    .map(user => {
        return {
            ...user,
            userData,
        };
    })
    .runAsync(user => this.userRepository.save(user));
```

### Duration
An easy, expressive and functional way of declaring a duration of time with support for various units (nanoseconds, 
microseconds, milliseconds, seconds, minutes, hours, and days).

```ts
// Example 1
durationOf(1000)
    .toSeconds()
    .letIt(it => {
        console.log(`1000 milliseconds are the same as ${it} seconds`);
    });

// Example 2
const oneYearInMinutes = (1).years().toHours().toMinutes();
console.log(`1 year is approximately ${oneYearInMinutes} minutes.`);

// Example 3
const duration = (1).years().add((6).months()).toString();
console.log(duration); // Output: 548d 0h 0m 0s 0ns
```

### Sequence
The **Katxupa** _**sequenceOf()**_ global function creates a lazy sequence using a generator function or from an [Iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol).
```ts
// Example 1: Creating a sequence of numbers and performing operations
const numberSequence = new Sequence(function* () {
    for (let i = 1; i <= 5; i++) {
        yield i;
    }
});

console.log(numberSequence.toList()); // Output: [1, 2, 3, 4, 5]

// Example 2: Summing a sequence of numbers
const sumResult = numberSequence.sum();
console.log(sumResult); // Output: 15

// Example 3: Mapping elements in a sequence
const squaredNumbers = numberSequence.map(x => x * x);
console.log(squaredNumbers.toList()); // Output: [1, 4, 9, 16, 25]

// Example 4: Filtering elements in a sequence
const evenNumbers = numberSequence.filter(x => x % 2 === 0);
console.log(evenNumbers.toList()); // Output: [2, 4]

// Example 5: Taking and dropping elements from a sequence
const takenNumbers = numberSequence.take(3);
console.log(takenNumbers.toList()); // Output: [1, 2, 3]

const droppedNumbers = numberSequence.drop(2);
console.log(droppedNumbers.toList()); // Output: [3, 4, 5]

// Example 6: Chaining operations
const chainedSequence = numberSequence
    .filter(x => x > 2)
    .map(x => x * 2)
    .take(2);

console.log(chainedSequence.toList()); // Output: [6, 8]
```

### Range
The `Range` class provides utility methods for working with numeric ranges.

```ts
// Example 1: Creating a Numeric Range
const numericRange = Range.rangeTo(1, 5, 2);
console.log(numericRange); // Output: [1, 3, 5]

// Example 2: Creating a Numeric Range (Exclusive)
const numericRangeAlias = rangeUntil(1, 5, 2);
console.log(numericRangeAlias); // Output: [1, 3, 5]

// Example 3: Checking if a Value is in Range
const isInRange = Range.inRange(3, 1, 5);
console.log(isInRange); // Output: true

// Example 4: Range with chaining Operations 
rangeTo(1, 5, 2)
    .runIt(function () {
        console.log(`multiplying the following range of numbers: ${this}`);
        this.map(it => it * 2)
            .forEach(it => console.log(it));
    });
```

### Global Utility Functions
Global functions are the unsung heroes that transcend the boundaries of specific data types, providing a universal 
toolkit for developers. These functions, residing in the global scope, are the go-to tools when you need versatile 
and expressive solutions that operate seamlessly across various data structures.

#### Meet some Ingredients
* **runIt()**: The maestro orchestrating the symphony of functions, _runIt_ calls a specified function block and presents its harmonious result.
* **withIt()**: The chameleon of functions, _withIt_ transforms any object into the star of the show, letting it shine in a function block tailored just for them.
* **listOf()**: Assemble an immutable list of elements effortlessly with _listOf_. It's your go-to for creating collections in a concise and readable manner.
* **mutableListOf()**: When you need a dynamic collection that can evolve with your needs, turn to _mutableListOf_ to create mutable lists with ease.
* **optionalOf()**: Embrace the power of optionals with _optionalOf_, a function that lets you gracefully handle scenarios with potentially absent values.
* **durationOf()**: Time is of the essence, and _durationOf_ allows you to craft time durations with precision, making time manipulation a breeze. 
* **sequenceOf()**: Elevate your iteration game with _sequenceOf_, creating lazy sequences that conserve resources and provide on-the-fly transformation capabilities.
* **reducerOf()**: Transform your data with _reducerOf_, a function designed for building reducers that streamline complex state transformations in a functional paradigm.
* **rangeTo()**: Define ranges effortlessly with _rangeTo_, a function simplifying the creation of numeric ranges for iteration or data selection.
* **ok()**: Indicate success with confidence using _ok_. This function constructs an "ok" result, signaling that a task or operation was completed successfully.
* **error()**: Handle errors gracefully with _error_. This function constructs an error result, encapsulating details about the failure and allowing for structured error handling.

These are just a smell of the utility this library brings to the table. Please, check the complete list in the [Global Functions]() section.

### Type Extension Functions
In JavaScript, where each data type carries its own set of behaviors, type extension functions emerge as the virtuosos of customization. 
These functions enrich your interactions with core data types, injecting them with new capabilities, being functional 
or utilities, and streamlining common operations.

| Type                   | Utilities                                                                                                                             |  
|------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| [Object Extensions]()  | Extensions redefine how you interact with objects, enabling fluid and expressive operations tailored to your needs.                   |  
| [Number Extensions]()  | Brings a consistent, functional and powerful approach to numeric operations                                                           |  
| [String Extensions]()  | Give your strings a makeover with extensions that redefine the way you manipulate text.                                               |  
| [Boolean Extensions]() | Functions like letIt, also, runIt, apply, takeIf, and takeUnless introduce a consistent and expressive way to handle boolean values.  |  
