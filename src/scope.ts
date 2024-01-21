
export {};

/**
 * Kachupa scope functions plus TypeScript type extensions
 *
 * @since version 1.0.0
 * @author Manuel Santos <ney.br.santos@gmail.com>
 * */
declare global {

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
     * const result = withIt({ x: 5, y: 10 }, function (this) {
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
         * const result = "Hello".letIt( it => {
         *     console.log(it.toUpperCase());
         *     return it.length;
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
         * const result = person.alsoIt((it) => {
         *     console.log(`Name: ${it.name}, Age: ${it.age}`);
         * });
         * console.log(result === person); // Output: true (Example output; actual output will vary)
         */
        alsoIt<T>(this: T, block: (it: T) => void): T;

        /**
         * Calls the specified function block with this value as its receiver and returns its result.
         *
         * @param block The function block to be called with this value as its receiver.
         * @returns The result of the function block.
         *
         * @example
         * const result = "Hello".runIt(function (this) {
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
         * const result = obj.applyIt(function(this) {
         *     // Access and modify the receiver using 'this'
         *     console.log(this.prop1);
         *     this.prop2 = 'modifiedValue';
         * });
         * console.log(result === obj); // Output: true (Example output; actual output will vary)
         */
        applyIt<T>(this: T, block: (this: T) => void): T;

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
         * const result = "Hello".letIt( it => {
         *     console.log(it.toUpperCase());
         *     return it.length;
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
         * const result = person.alsoIt((it) => {
         *     console.log(`Name: ${it.name}, Age: ${it.age}`);
         * });
         * console.log(result === person); // Output: true (Example output; actual output will vary)
         */
        alsoIt<T>(this: T, block: (it: T) => void): T;

        /**
         * Calls the specified function block with this value as its receiver and returns its result.
         *
         * @param block The function block to be called with this value as its receiver.
         * @returns The result of the function block.
         *
         * @example
         * const result = "Hello".runIt(function (this) {
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
         * const result = obj.applyIt(function(this) {
         *     // Access and modify the receiver using 'this'
         *     console.log(this.prop1);
         *     this.prop2 = 'modifiedValue';
         * });
         * console.log(result === obj); // Output: true (Example output; actual output will vary)
         */
        applyIt<T>(this: T, block: (this: T) => void): T;

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
         * const result = person.alsoIt((it) => {
         *     console.log(`Name: ${it.name}, Age: ${it.age}`);
         * });
         * console.log(result === person); // Output: true (Example output; actual output will vary)
         */
        alsoIt<T>(this: T, block: (it: T) => void): T;

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
         * const result = obj.applyIt(function(this: typeof obj) {
         *     // Access and modify the receiver using 'this'
         *     console.log(this.prop1);
         *     this.prop2 = 'modifiedValue';
         * });
         * console.log(result === obj); // Output: true (Example output; actual output will vary)
         */
        applyIt<T>(this: T, block: (this: T) => void): T;

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
         * const result = person.alsoIt((it) => {
         *     console.log(`Name: ${it.name}, Age: ${it.age}`);
         * });
         * console.log(result === person); // Output: true (Example output; actual output will vary)
         */
        alsoIt<T>(this: T, block: (it: T) => void): T;

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
         * const result = obj.applyIt(function(this: typeof obj) {
         *     // Access and modify the receiver using 'this'
         *     console.log(this.prop1);
         *     this.prop2 = 'modifiedValue';
         * });
         * console.log(result === obj); // Output: true (Example output; actual output will vary)
         */
        applyIt<T>(this: T, block: (this: T) => void): T;

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
const _global = typeof window !== 'undefined' ? window : globalThis;

_global.runIt = function <R>(block: () => R): R {
    return block();
}

_global.withIt = function <T, R>(receiver: T, block: (this: T) => R): R {
    return block.call(receiver);
}

// Object extensions
Object.defineProperty(Object.prototype, 'letIt', {
    value: function <T, R>(this: T, block: (it: T) => R): R {
        return block(this);
    },
    enumerable: false,
    writable: false,
    configurable: false
});

Object.defineProperty(Object.prototype, 'runIt', {
    value: function <T, R>(this: T, block: (this: T) => R): R {
        return block.call(this);
    },
    enumerable: false,
    writable: false,
    configurable: false
});

Object.defineProperty(Object.prototype, 'alsoIt', {
    value: function <T>(this: T, block: (it: T) => void): T {
        block(this);
        return this;
    },
    enumerable: false,
    writable: false,
    configurable: false
});

Object.defineProperty(Object.prototype, 'applyIt', {
    value: function <T>(this: T, block: (this: T) => void): T {
        block.call(this);
        return this;
    },
    enumerable: false,
    writable: false,
    configurable: false
});

Object.defineProperty(Object.prototype, 'takeIf', {
    value: function <T>(this: T, predicate: (it: T) => boolean): T | undefined {
        return predicate(this as T) ? this : undefined;
    },
    enumerable: false,
    writable: false,
    configurable: false
});

Object.defineProperty(Object.prototype, 'takeUnless', {
    value: function <T>(this: T, predicate: (it: T) => boolean): T | undefined {
        return predicate(this) ? undefined : this;
    },
    enumerable: false,
    writable: false,
    configurable: false
});

// String extensions
Object.defineProperty(String.prototype, 'letIt', {
    value: function <T, R>(this: T, block: (it: T) => R): R {
        return block(this);
    },
    enumerable: false,
    writable: false,
    configurable: false
});

Object.defineProperty(String.prototype, 'runIt', {
    value: function <T, R>(this: T, block: (this: T) => R): R {
        return block.call(this);
    },
    enumerable: false,
    writable: false,
    configurable: false
});

Object.defineProperty(String.prototype, 'alsoIt', {
    value: function <T>(this: T, block: (it: T) => void): T {
        block(this);
        return this;
    },
    enumerable: false,
    writable: false,
    configurable: false
});

Object.defineProperty(String.prototype, 'applyIt', {
    value: function <T>(this: T, block: (this: T) => void): T {
        block.call(this);
        return this;
    },
    enumerable: false,
    writable: false,
    configurable: false
});

Object.defineProperty(String.prototype, 'takeIf', {
    value: function <T>(this: T, predicate: (it: T) => boolean): T | undefined {
        return predicate(this as T) ? this : undefined;
    },
    enumerable: false,
    writable: false,
    configurable: false
});

Object.defineProperty(String.prototype, 'takeUnless', {
    value: function <T>(this: T, predicate: (it: T) => boolean): T | undefined {
        return predicate(this) ? undefined : this;
    },
    enumerable: false,
    writable: false,
    configurable: false
});


// Number extensions
Object.defineProperty(Number.prototype, 'letIt', {
    value: function <T, R>(this: T, block: (it: T) => R): R {
        return block(this);
    },
    enumerable: false,
    writable: false,
    configurable: false
});

Object.defineProperty(Number.prototype, 'runIt', {
    value: function <T, R>(this: T, block: (this: T) => R): R {
        return block.call(this);
    },
    enumerable: false,
    writable: false,
    configurable: false
});

Object.defineProperty(Number.prototype, 'alsoIt', {
    value: function <T>(this: T, block: (it: T) => void): T {
        block(this);
        return this;
    },
    enumerable: false,
    writable: false,
    configurable: false
});

Object.defineProperty(Number.prototype, 'applyIt', {
    value: function <T>(this: T, block: (this: T) => void): T {
        block.call(this);
        return this;
    },
    enumerable: false,
    writable: false,
    configurable: false
});

Object.defineProperty(Number.prototype, 'takeIf', {
    value: function <T>(this: T, predicate: (it: T) => boolean): T | undefined {
        return predicate(this as T) ? this : undefined;
    },
    enumerable: false,
    writable: false,
    configurable: false
});

Object.defineProperty(Number.prototype, 'takeUnless', {
    value: function <T>(this: T, predicate: (it: T) => boolean): T | undefined {
        return predicate(this) ? undefined : this;
    },
    enumerable: false,
    writable: false,
    configurable: false
});

// Boolean extensions
Object.defineProperty(Boolean.prototype, 'letIt', {
    value: function <T, R>(this: T, block: (it: T) => R): R {
        return block(this);
    },
    enumerable: false,
    writable: false,
    configurable: false
});

Object.defineProperty(Boolean.prototype, 'runIt', {
    value: function <T, R>(this: T, block: (this: T) => R): R {
        return block.call(this);
    },
    enumerable: false,
    writable: false,
    configurable: false
});

Object.defineProperty(Boolean.prototype, 'alsoIt', {
    value: function <T>(this: T, block: (it: T) => void): T {
        block(this);
        return this;
    },
    enumerable: false,
    writable: false,
    configurable: false
});

Object.defineProperty(Boolean.prototype, 'applyIt', {
    value: function <T>(this: T, block: (this: T) => void): T {
        block.call(this);
        return this;
    },
    enumerable: false,
    writable: false,
    configurable: false
});

Object.defineProperty(Boolean.prototype, 'takeIf', {
    value: function <T>(this: T, predicate: (it: T) => boolean): T | undefined {
        return predicate(this as T) ? this : undefined;
    },
    enumerable: false,
    writable: false,
    configurable: false
});

Object.defineProperty(Boolean.prototype, 'takeUnless', {
    value: function <T>(this: T, predicate: (it: T) => boolean): T | undefined {
        return predicate(this) ? undefined : this;
    },
    enumerable: false,
    writable: false,
    configurable: false
});