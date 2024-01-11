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
}

// Global extensions
const _global = (window /* browser */ || globalThis /* node */);

_global.setOf = function <T>(...elements: T[]): ReadonlySet<T> {
    return new Set(elements);
}

_global.mutableSetOf = function <T>(...elements: T[]): Set<T> {
    return new Set(elements);
}

_global.emptySet = function <T>(): ReadonlySet<T> {
    return new Set();
}

