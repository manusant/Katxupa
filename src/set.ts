export {};

/**
 * Represents a set of elements with additional utility functions.
 * @template T - The type of elements in the set.
 *
 * @since version 1.5.0
 * @author Manuel Santos <ney.br.santos@gmail.com>
 */
declare global {

    /**
     * Creates a readonly set with the provided elements.
     * @param {...T} elements - The elements to include in the set.
     * @returns {ReadonlySet<T>} - The readonly set containing the provided elements.
     * @example
     * const readOnlySet = collection.setOf(1, 2, 3);
     */
    function setOf<T>(...elements: T[]): ReadonlySet<T>;

    /**
     * Creates a mutable set with the provided elements.
     * @param {...T} elements - The elements to include in the set.
     * @returns {Set<T>} - The mutable set containing the provided elements.
     * @example
     * const mutableSet = collection.mutableSetOf(1, 2, 3);
     */
    function mutableSetOf<T>(...elements: T[]): Set<T>;

    /**
     * Creates an empty set.
     * @returns An empty set.
     */
    function emptySet<T>(): ReadonlySet<T>;

    interface Set<T> {
        /**
         * Maps each element to a new value using the provided transformation function.
         * @template U - The type of the resulting elements.
         * @param {function(T): U} transform - The function to transform each element.
         * @returns {Set<U>} - A new Set containing the transformed elements.
         * @example
         * const set = setOf([1, 2, 3]);
         * const squaredSet = set.map((num) => num * num);
         * // Result: Set([1, 4, 9])
         */
        map<U>(transform: (element: T) => U): Set<U>;

        /**
         * Returns a new Set containing elements that satisfy the provided predicate.
         * @param {function(T): boolean} predicate - The predicate function.
         * @returns {Set<T>} - A new Set with elements that satisfy the predicate.
         * @example
         * const set = setOf([1, 2, 3, 4, 5]);
         * const filteredSet = set.filter((num) => num % 2 === 0);
         * // Result: Set([2, 4])
         */
        filter(predicate: (element: T) => boolean): Set<T>;
    }
}

// Global extensions
const _global = typeof window !== 'undefined' ? window : globalThis;

_global.setOf = function <T>(...elements: T[]): ReadonlySet<T> {
    return new Set(elements);
}

_global.mutableSetOf = function <T>(...elements: T[]): Set<T> {
    return new Set(elements);
}

_global.emptySet = function <T>(): ReadonlySet<T> {
    return new Set();
}

// Set Extension
Object.defineProperty(Set.prototype, 'map', {
    value: function <T, U>(this: Set<T>, transform: (element: T) => U): Set<U> {
        return new Set([...this].map(transform));
    },
    enumerable: false,
    writable: false,
    configurable: false
});

Object.defineProperty(Set.prototype, 'filter', {
    value: function <T>(this: Set<T>, predicate: (element: T) => boolean): Set<T> {
        return new Set([...this].filter(predicate));
    },
    enumerable: false,
    writable: false,
    configurable: false
});
