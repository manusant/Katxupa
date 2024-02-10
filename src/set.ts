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
         * Returns a new Set containing elements that are common between the current Set and another Set.
         * @param {Set<T>} other - The Set to intersect with.
         * @returns {Set<T>} - A new Set with common elements.
         * @example
         * const set1 = setOf([1, 2, 3]);
         * const set2 = setOf([2, 3, 4]);
         * const intersectionSet = set1.intersection(set2);
         * // Result: Set([2, 3])
         */
        intersection(other: Set<T>): Set<T>;

        /**
         * Returns a new Set containing all unique elements from both the current Set and another Set.
         * @param {Set<T>} other - The Set to union with.
         * @returns {Set<T>} - A new Set with elements from both Sets.
         * @example
         * const set1 = setOf([1, 2, 3]);
         * const set2 = setOf([3, 4, 5]);
         * const unionSet = set1.union(set2);
         * // Result: Set([1, 2, 3, 4, 5])
         */
        union(other: Set<T>): Set<T>;

        /**
         * Returns a new Set containing elements that are in the current Set but not in another Set.
         * @param {Set<T>} other - The Set to subtract from the current Set.
         * @returns {Set<T>} - A new Set with elements not present in the other Set.
         * @example
         * const set1 = setOf([1, 2, 3]);
         * const set2 = setOf([2, 3, 4]);
         * const differenceSet = set1.difference(set2);
         * // Result: Set([1])
         */
        difference(other: Set<T>): Set<T>;

        /**
         * Checks if the current Set is a subset of another Set.
         * @param {Set<T>} other - The Set to check against.
         * @returns {boolean} - true if the current Set is a subset, otherwise false.
         * @example
         * const set1 = setOf([1, 2]);
         * const set2 = setOf([1, 2, 3, 4]);
         * const isSubset = set1.isSubsetOf(set2);
         * // Result: true
         */
        isSubsetOf(other: Set<T>): boolean;

        /**
         * Checks if the current Set is a superset of another Set.
         * @param {Set<T>} other - The Set to check against.
         * @returns {boolean} - true if the current Set is a superset, otherwise false.
         * @example
         * const set1 = setOf([1, 2, 3, 4]);
         * const set2 = setOf([1, 2]);
         * const isSuperset = set1.isSupersetOf(set2);
         * // Result: true
         */
        isSupersetOf(other: Set<T>): boolean;

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
Object.defineProperty(Set.prototype, 'intersection', {
    value: function <T>(this: Set<T>, other: Set<T>): Set<T> {
        return new Set([...this].filter((element) => other.has(element)));
    },
    enumerable: false,
    writable: false,
    configurable: false
});

Object.defineProperty(Set.prototype, 'union', {
    value: function <T>(this: Set<T>, other: Set<T>): Set<T> {
        return new Set([...this, ...other]);
    },
    enumerable: false,
    writable: false,
    configurable: false
});

Object.defineProperty(Set.prototype, 'difference', {
    value: function <T>(this: Set<T>, other: Set<T>): Set<T> {
        return new Set([...this].filter((element) => !other.has(element)));
    },
    enumerable: false,
    writable: false,
    configurable: false
});

Object.defineProperty(Set.prototype, 'isSubsetOf', {
    value: function <T>(this: Set<T>, other: Set<T>): boolean {
        return [...this].every((element) => other.has(element));
    },
    enumerable: false,
    writable: false,
    configurable: false
});

Object.defineProperty(Set.prototype, 'isSupersetOf', {
    value: function <T>(this: Set<T>, other: Set<T>): boolean {
        return [...other].every((element) => this.has(element));
    },
    enumerable: false,
    writable: false,
    configurable: false
});

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
