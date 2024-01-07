import {Optional} from "./Optional";
import {Sequence} from "./Sequence";

export {};

/**
 * Kachupa scope functions plus TypeScript type extensions
 *
 * @since version 1.0.0
 * @author Manuel Santos <ney.br.santos@gmail.com>
 * */
declare global {

    /**
     * Wraps a value that might be undefined or null in an Optional container.
     *
     * @template T - The type of the wrapped value.
     * @param {T | undefined | null} value - The value to be wrapped.
     * @returns {Optional<T>} - An Optional container holding the wrapped value.
     *
     * @example
     *  const result1 = optional("Hello");
     *  if (result1.isPresent()) {
     *    console.log(result1.get()); // Prints: Hello
     *  }
     *
     *  const result2 = optional(null);
     *  if (result2.isEmpty()) {
     *    console.log("Value is not present"); // Prints: Value is not present
     *  }
     *
     *  const result3 = optional(undefined);
     *  console.log(result3.orElse("Default")); // Prints: Default
     *
     *  const result4 = await optional(user)
     *     .orElseThrow(() => new HttpError(409, "User doesn't exist"))
     *     .map(user => {
     *        return {
     *          ...user,
     *          userData,
     *        };
     *      })
     *     .runAsync(user => this.userRepository.save(user));
     *  console.log(result4); // Prints: saved user content
     */
    function optional<T>(value: T | undefined | null): Optional<T>;

    /**
     * Calls the specified function block and returns its result.
     *
     * @param block The function block to be called.
     * @returns The result of the function block.
     *
     * @example
     * const result = runIt(() => {
     *     console.log("Executing the run block");
     *     return 42;
     * });
     * console.log(result); // Output: 42 (Example output; actual output will vary)
     */
    function runIt<R>(block: () => R): R;

    /**
     * Calls the specified function block with the given receiver as its receiver and returns its result.
     *
     * @param receiver The receiver object to be used in the function block.
     * @param block The function block to be called with the receiver as its receiver.
     * @returns The result of the function block.
     *
     * @example
     * const result = withIt({ x: 5, y: 10 }, function (this: { x: number, y: number }) {
     *     console.log(this.x + this.y);
     *     return this.x * this.y;
     * });
     * console.log(result); // Output: 15\n50 (Example output; actual output will vary)
     */
    function withIt<T, R>(receiver: T, block: (this: T) => R): R;

    interface Object {
        /**
         * Calls the specified function block with this value as its argument and returns its result.
         *
         * @param block The function block to be called with this value as its argument.
         * @returns The result of the function block.
         *
         * @example
         * const result = "Hello".letIt( value => {
         *     console.log(value.toUpperCase());
         *     return value.length;
         * });
         * console.log(result); // Output: 5 (Example output; actual output will vary)
         */
        letIt<T, R>(this: T, block: (it: T) => R): R;

        /**
         * Calls the specified function block with this value as its argument and returns this value.
         *
         * @param block The function block to be called with this value as its argument.
         * @returns This value.
         *
         * @example
         * const person = { name: "John", age: 30 };
         * const result = person.also((it) => {
         *     console.log(`Name: ${it.name}, Age: ${it.age}`);
         * });
         * console.log(result === person); // Output: true (Example output; actual output will vary)
         */
        also<T>(this: T, block: (it: T) => void): T;

        /**
         * Calls the specified function block with this value as its receiver and returns its result.
         *
         * @param block The function block to be called with this value as its receiver.
         * @returns The result of the function block.
         *
         * @example
         * const result = "Hello".runIt(function (this: string) {
         *     console.log(this.toUpperCase());
         *     return this.length;
         * });
         * console.log(result); // Output: HELLO\n5 (Example output; actual output will vary)
         */
        runIt<T, R>(this: T, block: (this: T) => R): R;

        /**
         * Calls the specified function block with this value as its receiver and returns this value.
         *
         * @param block The function block to be called with this value as its receiver.
         * @returns The original receiver.
         *
         * @example
         * const obj = { prop1: 'value1', prop2: 'value2' };
         * const result = obj.apply(function(this: typeof obj) {
         *     // Access and modify the receiver using 'this'
         *     console.log(this.prop1);
         *     this.prop2 = 'modifiedValue';
         * });
         * console.log(result === obj); // Output: true (Example output; actual output will vary)
         */
        apply<T>(this: T, block: (this: T) => void): T;

        /**
         * Returns `this` value if it satisfies the given predicate or `undefined` if it doesn't
         * @param predicate - The function to be executed with `this` as argument and returns a truthy or falsy value
         * @returns `this` or `undefined`
         */
        takeIf<T>(this: T, predicate: (it: T) => boolean): T | undefined;

        /**
         * Returns `this` value if it does not satisfy the given predicate or `undefined` if it does
         * @param predicate - The function to be executed with `this` as argument and returns a truthy or falsy value
         * @returns `this` or `undefined`
         */
        takeUnless<T>(this: T, predicate: (it: T) => boolean): T | undefined;
    }

    interface Number {
        /**
         * Calls the specified function block with this value as its argument and returns its result.
         *
         * @param block The function block to be called with this value as its argument.
         * @returns The result of the function block.
         *
         * @example
         * const result = "Hello".letIt( value => {
         *     console.log(value.toUpperCase());
         *     return value.length;
         * });
         * console.log(result); // Output: 5 (Example output; actual output will vary)
         */
        letIt<T, R>(this: T, block: (it: T) => R): R;

        /**
         * Calls the specified function block with this value as its argument and returns this value.
         *
         * @param block The function block to be called with this value as its argument.
         * @returns This value.
         *
         * @example
         * const person = { name: "John", age: 30 };
         * const result = person.also((it) => {
         *     console.log(`Name: ${it.name}, Age: ${it.age}`);
         * });
         * console.log(result === person); // Output: true (Example output; actual output will vary)
         */
        also<T>(this: T, block: (it: T) => void): T;

        /**
         * Calls the specified function block with this value as its receiver and returns its result.
         *
         * @param block The function block to be called with this value as its receiver.
         * @returns The result of the function block.
         *
         * @example
         * const result = "Hello".runIt(function (this: string) {
         *     console.log(this.toUpperCase());
         *     return this.length;
         * });
         * console.log(result); // Output: HELLO\n5 (Example output; actual output will vary)
         */
        runIt<T, R>(this: T, block: (this: T) => R): R;

        /**
         * Calls the specified function block with this value as its receiver and returns this value.
         *
         * @param block The function block to be called with this value as its receiver.
         * @returns The original receiver.
         *
         * @example
         * const obj = { prop1: 'value1', prop2: 'value2' };
         * const result = obj.apply(function(this: typeof obj) {
         *     // Access and modify the receiver using 'this'
         *     console.log(this.prop1);
         *     this.prop2 = 'modifiedValue';
         * });
         * console.log(result === obj); // Output: true (Example output; actual output will vary)
         */
        apply<T>(this: T, block: (this: T) => void): T;

        /**
         * Returns `this` value if it satisfies the given predicate or `undefined` if it doesn't
         * @param predicate - The function to be executed with `this` as argument and returns a truthy or falsy value
         * @returns `this` or `undefined`
         */
        takeIf<T>(this: T, predicate: (it: T) => boolean): T | undefined;

        /**
         * Returns `this` value if it does not satisfy the given predicate or `undefined` if it does
         * @param predicate - The function to be executed with `this` as argument and returns a truthy or falsy value
         * @returns `this` or `undefined`
         */
        takeUnless<T>(this: T, predicate: (it: T) => boolean): T | undefined;
    }

    interface String {
        /**
         * Calls the specified function block with this value as its argument and returns its result.
         *
         * @param block The function block to be called with this value as its argument.
         * @returns The result of the function block.
         *
         * @example
         * const result = "Hello".letIt( value => {
         *     console.log(value.toUpperCase());
         *     return value.length;
         * });
         * console.log(result); // Output: 5 (Example output; actual output will vary)
         */
        letIt<T, R>(this: T, block: (it: T) => R): R;

        /**
         * Calls the specified function block with this value as its argument and returns this value.
         *
         * @param block The function block to be called with this value as its argument.
         * @returns This value.
         *
         * @example
         * const person = { name: "John", age: 30 };
         * const result = person.also((it) => {
         *     console.log(`Name: ${it.name}, Age: ${it.age}`);
         * });
         * console.log(result === person); // Output: true (Example output; actual output will vary)
         */
        also<T>(this: T, block: (it: T) => void): T;

        /**
         * Calls the specified function block with this value as its receiver and returns its result.
         *
         * @param block The function block to be called with this value as its receiver.
         * @returns The result of the function block.
         *
         * @example
         * const result = "Hello".runIt(function (this: string) {
         *     console.log(this.toUpperCase());
         *     return this.length;
         * });
         * console.log(result); // Output: HELLO\n5 (Example output; actual output will vary)
         */
        runIt<T, R>(this: T, block: (this: T) => R): R;

        /**
         * Calls the specified function block with this value as its receiver and returns this value.
         *
         * @param block The function block to be called with this value as its receiver.
         * @returns The original receiver.
         *
         * @example
         * const obj = { prop1: 'value1', prop2: 'value2' };
         * const result = obj.apply(function(this: typeof obj) {
         *     // Access and modify the receiver using 'this'
         *     console.log(this.prop1);
         *     this.prop2 = 'modifiedValue';
         * });
         * console.log(result === obj); // Output: true (Example output; actual output will vary)
         */
        apply<T>(this: T, block: (this: T) => void): T;

        /**
         * Returns `this` value if it satisfies the given predicate or `undefined` if it doesn't
         * @param predicate - The function to be executed with `this` as argument and returns a truthy or falsy value
         * @returns `this` or `undefined`
         */
        takeIf<T>(this: T, predicate: (it: T) => boolean): T | undefined;

        /**
         * Returns `this` value if it does not satisfy the given predicate or `undefined` if it does
         * @param predicate - The function to be executed with `this` as argument and returns a truthy or falsy value
         * @returns `this` or `undefined`
         */
        takeUnless<T>(this: T, predicate: (it: T) => boolean): T | undefined;

        /**
         * Converts a string into a lazy sequence of its characters.
         * @returns {Sequence<string>} A lazy sequence representing the characters of the string.
         *
         * @example
         * const text = "Hello, world!";
         * const charSequence = text.asCharSequence();
         * const result = charSequence.toArray(); // ['H', 'e', 'l', 'l', 'o', ',', ' ', 'w', 'o', 'r', 'l', 'd', '!']
         */
        asCharSequence<T>(this: T): Sequence<T>;

        /**
         * Converts a string into a lazy sequence of its words using Intl.Segmenter.
         * @returns {Sequence<string>} A lazy sequence representing the words of the string.
         *
         * @example
         * // Example 1: as words and convert to an array
         * const phrase = "This is a sample phrase.";
         * const wordSequence = phrase.asWordSequence();
         * const result = wordSequence.toArray(); // ['This', 'is', 'a', 'sample', 'phrase.']
         *
         * // Example 2: Chaining
         * const wordSequence = phrase.asWordSequence();
         * const transformedSequence = wordSequence
         *     .map(word => word.toUpperCase()) // Convert words to uppercase
         *     .filter(word => word.length > 2) // Filter out short words
         *     .take(3); // Take the first 3 words
         *
         * const result = transformedSequence.toArray();
         * console.log(result); // Output: ['THIS', 'SAMPLE', 'PHRASE.']
         */
        asWordSequence<T>(this: T): Sequence<T>;
    }

    interface Boolean {
        /**
         * Calls the specified function block with this value as its argument and returns its result.
         *
         * @param block The function block to be called with this value as its argument.
         * @returns The result of the function block.
         *
         * @example
         * const result = "Hello".letIt( value => {
         *     console.log(value.toUpperCase());
         *     return value.length;
         * });
         * console.log(result); // Output: 5 (Example output; actual output will vary)
         */
        letIt<T, R>(this: T, block: (it: T) => R): R;

        /**
         * Calls the specified function block with this value as its argument and returns this value.
         *
         * @param block The function block to be called with this value as its argument.
         * @returns This value.
         *
         * @example
         * const person = { name: "John", age: 30 };
         * const result = person.also((it) => {
         *     console.log(`Name: ${it.name}, Age: ${it.age}`);
         * });
         * console.log(result === person); // Output: true (Example output; actual output will vary)
         */
        also<T>(this: T, block: (it: T) => void): T;

        /**
         * Calls the specified function block with this value as its receiver and returns its result.
         *
         * @param block The function block to be called with this value as its receiver.
         * @returns The result of the function block.
         *
         * @example
         * const result = "Hello".runIt(function (this: string) {
         *     console.log(this.toUpperCase());
         *     return this.length;
         * });
         * console.log(result); // Output: HELLO\n5 (Example output; actual output will vary)
         */
        runIt<T, R>(this: T, block: (this: T) => R): R;

        /**
         * Calls the specified function block with this value as its receiver and returns this value.
         *
         * @param block The function block to be called with this value as its receiver.
         * @returns The original receiver.
         *
         * @example
         * const obj = { prop1: 'value1', prop2: 'value2' };
         * const result = obj.apply(function(this: typeof obj) {
         *     // Access and modify the receiver using 'this'
         *     console.log(this.prop1);
         *     this.prop2 = 'modifiedValue';
         * });
         * console.log(result === obj); // Output: true (Example output; actual output will vary)
         */
        apply<T>(this: T, block: (this: T) => void): T;

        /**
         * Returns `this` value if it satisfies the given predicate or `undefined` if it doesn't
         * @param predicate - The function to be executed with `this` as argument and returns a truthy or falsy value
         * @returns `this` or `undefined`
         */
        takeIf<T>(this: T, predicate: (it: T) => boolean): T | undefined;

        /**
         * Returns `this` value if it does not satisfy the given predicate or `undefined` if it does
         * @param predicate - The function to be executed with `this` as argument and returns a truthy or falsy value
         * @returns `this` or `undefined`
         */
        takeUnless<T>(this: T, predicate: (it: T) => boolean): T | undefined;
    }
}

// Global extensions
const _global = (window /* browser */ || globalThis /* node */);

_global.optional = function <T>(value: T | undefined | null): Optional<T> {
    return Optional.of(value);
}

_global.runIt = function <R>(block: () => R): R {
    return block();
}

_global.withIt = function <T, R>(receiver: T, block: (this: T) => R): R {
    return block.call(receiver);
}

// Object extensions
Object.prototype.letIt = function <T, R>(this: T, block: (it: T) => R): R {
    return block(this);
}

Object.prototype.runIt = function <T, R>(this: T, block: (this: T) => R): R {
    return block.call(this);
}

Object.prototype.also = function <T>(this: T, block: (it: T) => void): T {
    block(this);
    return this;
};

Object.prototype.apply = function <T>(this: T, block: (this: T) => void): T {
    block.call(this);
    return this;
}

Object.prototype.takeIf = function <T>(this: T, predicate: (it: T) => boolean): T | undefined {
    return predicate(this as T) ? this : undefined;
}

Object.prototype.takeUnless = function <T>(this: T, predicate: (it: T) => boolean): T | undefined {
    return predicate(this) ? undefined : this;
}

// String extensions
String.prototype.letIt = function <T, R>(this: T, block: (it: T) => R): R {
    return block(this);
}

String.prototype.runIt = function <T, R>(this: T, block: (this: T) => R): R {
    return block.call(this);
}

String.prototype.also = function <T>(this: T, block: (it: T) => void): T {
    block(this);
    return this;
};

String.prototype.apply = function <T>(this: T, block: (this: T) => void): T {
    block.call(this);
    return this;
}

String.prototype.takeIf = function <T>(this: T, predicate: (it: T) => boolean): T | undefined {
    return predicate(this as T) ? this : undefined;
}

String.prototype.takeUnless = function <T>(this: T, predicate: (it: T) => boolean): T | undefined {
    return predicate(this) ? undefined : this;
}

String.prototype.asCharSequence = function <T>(this: T): Sequence<T> {
    return Sequence.fromString(this as string) as Sequence<T>;
}

String.prototype.asWordSequence = function <T>(this: T): Sequence<T> {
    return Sequence.fromPhrase(this as string) as Sequence<T>;
}

// Number extensions
Number.prototype.letIt = function <T, R>(this: T, block: (it: T) => R): R {
    return block(this);
}

Number.prototype.runIt = function <T, R>(this: T, block: (this: T) => R): R {
    return block.call(this);
}

Number.prototype.also = function <T>(this: T, block: (it: T) => void): T {
    block(this);
    return this;
};

Number.prototype.apply = function <T>(this: T, block: (this: T) => void): T {
    block.call(this);
    return this;
}

Number.prototype.takeIf = function <T>(this: T, predicate: (it: T) => boolean): T | undefined {
    return predicate(this as T) ? this : undefined;
}

Number.prototype.takeUnless = function <T>(this: T, predicate: (it: T) => boolean): T | undefined {
    return predicate(this) ? undefined : this;
}

// Boolean extensions
Boolean.prototype.letIt = function <T, R>(this: T, block: (it: T) => R): R {
    return block(this);
}

Boolean.prototype.runIt = function <T, R>(this: T, block: (this: T) => R): R {
    return block.call(this);
}

Boolean.prototype.also = function <T>(this: T, block: (it: T) => void): T {
    block(this);
    return this;
};

Boolean.prototype.apply = function <T>(this: T, block: (this: T) => void): T {
    block.call(this);
    return this;
}

Boolean.prototype.takeIf = function <T>(this: T, predicate: (it: T) => boolean): T | undefined {
    return predicate(this as T) ? this : undefined;
}

Boolean.prototype.takeUnless = function <T>(this: T, predicate: (it: T) => boolean): T | undefined {
    return predicate(this) ? undefined : this;
}