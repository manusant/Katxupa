import {Optional} from "./optional";
import {NoSuchElementError} from "./errors";

/**
 * Represents an array of elements with additional utility functions.
 * @template T - The type of elements in the array.
 *
 * @since version 1.5.0
 * @author Manuel Santos <ney.br.santos@gmail.com>
 */
declare global {

    /**
     * Creates an immutable list from the provided elements.
     * @param elements - The elements to include in the list.
     * @returns An immutable array representing the list.
     */
    function listOf<T>(...elements: T[]): ReadonlyArray<T>;

    /**
     * Creates a mutable list from the provided elements.
     * @param elements - The elements to include in the list.
     * @returns A new array representing the list.
     */
    function mutableListOf<T>(...elements: T[]): T[];

    /**
     * Creates an empty list.
     * @returns An empty array representing the list.
     */
    function emptyList<T>(): ReadonlyArray<T>;

    interface Array<T> {

        /**
         * Associates each element with a key-value pair based on the provided selectors.
         * @template K - The type of keys.
         * @template V - The type of values.
         * @param {function(T): K} keySelector - The function to extract keys from elements.
         * @param {function(T): V} valueSelector - The function to extract values from elements.
         * @returns {Record<string, V>} - A record associating keys with their corresponding values.
         * @example
         * const elements = [{ id: 1, value: 'a' }, { id: 2, value: 'b' }];
         * const keyValuePairs = collection.associateWith(
         *   (element) => element.id,
         *   (element) => element.value
         * );
         */
        associateWith<K, V>(
            keySelector: (element: T) => K,
            valueSelector: (element: T) => V,
        ): Record<string, V>;

        /**
         * Maps each element to a new value using the provided transformation function.
         * @template U - The type of the resulting elements.
         * @param {function(T, number): U} transform - The function to transform each element.
         * @returns {ReadonlyArray<U>} - A readonly array containing the transformed elements.
         * @example
         * const numbers = [1, 2, 3];
         * const squaredNumbers = collection.mapIndexed((num, index) => num * num + index);
         */
        mapIndexed<U>(transform: (element: T, index: number) => U): ReadonlyArray<U>;

        /**
         * Sorts the collection using the provided comparator function.
         *
         * @param {function(T, T): number} comparator - The function to compare elements.
         * @return this - reference of the sorted array
         *
         * @example
         * const users = [
         *   { name: 'John', age: 30 },
         *   { name: 'Alice', age: 25 },
         *   { name: 'Bob', age: 35 },
         * ];
         * collection.sortBy((a, b) => a.age - b.age);
         * // users is now sorted by age: [{ name: 'Alice', age: 25 }, { name: 'John', age: 30 }, { name: 'Bob', age: 35 }]
         */
        sortBy(comparator: (a: T, b: T) => number): T[];

        /**
         * Concatenates the collection with another array.
         * @param {T[]} other - The array to concatenate with the current collection.
         * @returns {T[]} - A new array containing elements from both the current collection and the provided array.
         * @example
         * const collection = new Collection(1, 2, 3);
         * const otherArray = [4, 5, 6];
         * const result = collection.plus(otherArray);
         * // result is [1, 2, 3, 4, 5, 6]
         */
        plus(other: T[]): T[];

        /**
         * Removes elements from the collection that are present in another array.
         * @param {T[]} other - The array containing elements to be removed from the current collection.
         * @returns {T[]} - A new array with elements not present in the provided array.
         * @example
         * const collection = new Collection(1, 2, 3, 4, 5);
         * const elementsToRemove = [3, 5];
         * const result = collection.minus(elementsToRemove);
         * // result is [1, 2, 4]
         */
        minus(other: T[]): T[];

        /**
         * Removes elements from the collection that are present in another array (mutates the collection).
         *
         * @param {T[]} collection - The array containing elements to be removed from the current collection.
         * @return this - reference to affected array
         *
         * @example
         * const collection = new Collection(1, 2, 3, 4, 5);
         * const elementsToRemove = [3, 5];
         * collection.minusAssign(elementsToRemove);
         * // collection is now [1, 2, 4]
         */
        minusAssign(collection: T[]): T[];

        /**
         * Appends elements from another array to the collection (mutates the collection).
         *
         * @param {T[]} other - The array containing elements to be added to the current collection.
         * @return this - reference to affected array
         *
         * @example
         * const collection = new Collection(1, 2, 3);
         * const additionalElements = [4, 5, 6];
         * collection.plusAssign(additionalElements);
         * // collection is now [1, 2, 3, 4, 5, 6]
         */
        plusAssign(other: T[]): T[];

        /**
         * Returns the number of elements in the collection.
         * @returns {number} - The number of elements in the collection.
         * @example
         * const collection = new Collection(1, 2, 3, 4, 5);
         * const count = collection.count();
         * // count is 5
         */
        count(): number;

        /**
         * Removes elements from the collection based on a predicate or a collection of elements.
         * @param {((item: T) => boolean) | T[]} predicate - The predicate function or collection of elements to remove.
         * @returns {T[]} - A new array with elements removed based on the provided predicate or collection.
         * @example
         * const collection = new Collection(1, 2, 3, 4, 5);
         * const elementsToRemove = [3, 5];
         * const result = collection.removeAll(elementsToRemove);
         * // result is [1, 2, 4]
         */
        removeAll(predicate: ((item: T) => boolean) | T[]): T[];

        /**
         * Retains only the elements in the collection that are present in another array.
         * @param {((item: T) => boolean) | T[]} predicate - The predicate function or collection of elements to retain.
         * @returns {T[]} - A new array containing only the elements that satisfy the provided predicate or are present in the provided collection.
         * @example
         * const collection = mutableListOf(1, 2, 3, 4, 5);
         * const elementsToRetain = [3, 5];
         * const result = collection.retainAll(elementsToRetain);
         * // result is [3, 5]
         */
        retainAll(predicate: ((item: T) => boolean) | T[]): T[];

        /**
         * Returns the first element in the collection.
         * @returns {T} - The first element in the collection.
         * @throws {NoSuchElementError} - If the collection is empty.
         * @example
         * const collection = mutableListOf(1, 2, 3);
         * const firstElement = collection.first();
         * // firstElement is 1
         */
        first(): T;

        /**
         * Returns the last element in the collection.
         * @returns {T} - The last element in the collection.
         * @throws {NoSuchElementError} - If the collection is empty.
         * @example
         * const collection = mutableListOf(1, 2, 3);
         * const lastElement = collection.last();
         * // lastElement is 3
         */
        last(): T;

        /**
         * Gets the element at the specified index or provides a default value if the index is out of bounds.
         * @param {number} index - The index of the element to retrieve.
         * @param {() => T} defaultValueProvider - A function providing the default value.
         * @returns {T} - The element at the specified index or the default value if the index is out of bounds.
         * @example
         * const collection = mutableListOf(1, 2, 3, 4, 5);
         * const element = collection.getOrElse(2, () => 10);
         * // element is 3
         */
        getOrElse(index: number, defaultValueProvider: () => T): T;

        /**
         * Gets an optional containing the element at the specified index.
         * @param {number} index - The index of the element.
         * @returns {Optional<T>} - An optional containing the element if it exists, otherwise an empty optional.
         * @example
         * const collection = mutableListOf(1, 2, 3, 4, 5);
         * const optionalElement = collection.getOrEmpty(2);
         * // optionalElement contains the value Optional.of(3)
         */
        getOrEmpty(index: number): Optional<T>;

        /**
         * Shuffles the elements in the collection randomly.
         *
         * @return this - reference to affected array
         * @example
         * const collection = mutableListOf(1, 2, 3, 4, 5);
         * collection.shuffle();
         * // collection is now shuffled randomly, e.g., [3, 1, 5, 2, 4]
         */
        shuffle(): T[];
    }
}

// Global extensions
const _global = typeof window !== 'undefined' ? window : globalThis;

_global.listOf = function <T>(...elements: T[]): ReadonlyArray<T> {
    return elements;
}

_global.mutableListOf = function <T>(...elements: T[]): T[] {
    return [...elements];
}

_global.emptyList = function <T>(): ReadonlyArray<T> {
    return [];
}

// Array extensions
Object.defineProperty(Array.prototype, 'associateWith', {
    value: function <T, K, V>(
        this: Array<T>,
        keySelector: (element: T) => K,
        valueSelector: (element: T) => V,
    ): Record<string, V> {
        return this.reduce((result, element) => {
            const key = keySelector(element);
            result[key as string] = valueSelector(element);
            return result;
        }, {} as Record<string, V>);
    },
    enumerable: false,
    writable: false,
    configurable: false
});

Object.defineProperty(Array.prototype, 'mapIndexed', {
    value: function <T, U>(
        this: Array<T>,
        transform: (element: T, index: number) => U
    ): ReadonlyArray<U> {
        return this.map((element, index) => transform(element, index));
    },
    enumerable: false,
    writable: false,
    configurable: false
});

Object.defineProperty(Array.prototype, 'sortBy', {
    value: function <T>(
        this: Array<T>,
        comparator: (a: T, b: T) => number
    ): T[] {
        return this.sort(comparator);
    },
    enumerable: false,
    writable: false,
    configurable: false
});

Object.defineProperty(Array.prototype, 'plus', {
    value: function <T>(this: Array<T>, other: T[]): T[] {
        return this.concat(other);
    },
    enumerable: false,
    writable: false,
    configurable: false
});

Object.defineProperty(Array.prototype, 'minus', {
    value: function <T>(this: Array<T>, other: T[]): T[] {
        return this.filter((element) => !other.includes(element));
    },
    enumerable: false,
    writable: false,
    configurable: false
});

Object.defineProperty(Array.prototype, 'minusAssign', {
    value: function <T>(this: Array<T>, collection: T[]): T[] {
        // Create a new array by filtering out elements from the collection
        const resultArray = this.filter((element) => !collection.includes(element));

        // Clear the existing array and copy the elements from the resultArray
        this.length = 0;
        this.push(...resultArray);

        return this;
    },
    enumerable: false,
    writable: false,
    configurable: false
});

Object.defineProperty(Array.prototype, 'plusAssign', {
    value: function <T>(this: Array<T>, other: T[]): T[] {
        this.push(...other);
        return this;
    },
    enumerable: false,
    writable: false,
    configurable: false
});

Object.defineProperty(Array.prototype, 'count', {
    value: function <T>(this: Array<T>): number {
        return this.length;
    },
    enumerable: false,
    writable: false,
    configurable: false
});

Object.defineProperty(Array.prototype, 'removeAll', {
    value: function <T>(this: Array<T>, predicate: ((item: T) => boolean) | T[]): T[] {
        if (Array.isArray(predicate)) {
            // Remove elements based on a collection
            return this.filter(item => !predicate.includes(item));
        } else {
            // Remove elements based on a predicate
            return this.filter(item => !predicate(item));
        }
    },
    enumerable: false,
    writable: false,
    configurable: false
});

Object.defineProperty(Array.prototype, 'retainAll', {
    value: function <T>(this: Array<T>, predicate: ((item: T) => boolean) | T[]): T[] {
        if (Array.isArray(predicate)) {
            // Retain elements based on a collection
            return this.filter(item => predicate.includes(item));
        } else {
            // Retain elements based on a predicate
            return this.filter(item => predicate(item));
        }
    },
    enumerable: false,
    writable: false,
    configurable: false
});

Object.defineProperty(Array.prototype, 'first', {
    value: function <T>(this: Array<T>): T {
        if (this.length === 0) {
            throw new NoSuchElementError("Array is empty");
        }
        return this[0];
    },
    enumerable: false,
    writable: false,
    configurable: false
});

Object.defineProperty(Array.prototype, 'last', {
    value: function <T>(this: Array<T>): T {
        if (this.length === 0) {
            throw new NoSuchElementError("Array is empty");
        }
        return this[this.length - 1];
    },
    enumerable: false,
    writable: false,
    configurable: false
});

Object.defineProperty(Array.prototype, 'getOrElse', {
    value: function <T>(this: Array<T>, index: number, defaultValueProvider: () => T): T {
        return index >= 0 && index < this.length ? this[index]! : defaultValueProvider();
    },
    enumerable: false,
    writable: false,
    configurable: false
});

Object.defineProperty(Array.prototype, 'getOrEmpty', {
    value: function <T>(this: Array<T>, index: number): Optional<T | undefined> {
        return index >= 0 && index < this.length ? Optional.of(this[index]) : Optional.empty();
    },
    enumerable: false,
    writable: false,
    configurable: false
});

Object.defineProperty(Array.prototype, 'shuffle', {
    value: function <T>(this: Array<T>): T[] {
        for (let i = this.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this[i], this[j]] = [this[j]!, this[i]!];
        }
        return this;
    },
    enumerable: false,
    writable: false,
    configurable: false
});


