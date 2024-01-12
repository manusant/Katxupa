/**
 * Represents a Map with additional utility functions.
 * @template K - The type of keys in the map.
 * @template V - The type of values in the map.
 *
 * @since version 1.6.0
 * @author Manuel Santos <ney.br.santos@gmail.com>
 */
class ExtendedMap<K, V> extends Map<K, V> {

    /**
     * Creates a new Map containing entries whose values satisfy the provided predicate.
     * @param {function(V, K): boolean} predicate - The predicate function.
     * @returns {ExtendedMap<K, V>} - A new ExtendedMap with entries that satisfy the predicate.
     * @example
     * const map = new ExtendedMap([
     *   ['a', 1],
     *   ['b', 2],
     *   ['c', 3],
     * ]);
     * const filteredMap = map.filter((value, key) => value % 2 === 0);
     * // Result: ExtendedMap([['b', 2]])
     */
    filter(predicate: (value: V, key: K) => boolean): ExtendedMap<K, V> {
        const filteredMap = new ExtendedMap<K, V>();
        for (const [key, value] of this.entries()) {
            if (predicate(value, key)) {
                filteredMap.set(key, value);
            }
        }
        return filteredMap;
    }

    /**
     * Checks if the map is empty.
     * @returns {boolean} - True if the map is empty, false otherwise.
     * @example
     * const emptyMap = new ExtendedMap();
     * const nonEmptyMap = new ExtendedMap([[1, 'a']]);
     * emptyMap.isEmpty(); // true
     * nonEmptyMap.isEmpty(); // false
     */
    isEmpty(): boolean {
        return this.size === 0;
    }

    /**
     * Converts the map entries into an array of key-value pairs.
     * @returns {[K, V][]} - An array of key-value pairs.
     * @example
     * const map = new ExtendedMap([
     *   ['a', 1],
     *   ['b', 2],
     *   ['c', 3],
     * ]);
     * const entriesArray = map.toArray();
     * // Result: [['a', 1], ['b', 2], ['c', 3]]
     */
    toArray(): [K, V][] {
        return Array.from(this.entries());
    }

    /**
     * Maps each value in the map to a new value using the provided transformation function.
     * @template U - The type of the resulting values.
     * @param {function(V, K): U} transform - The function to transform each value.
     * @returns {ExtendedMap<K, U>} - A new ExtendedMap containing the transformed values.
     * @example
     * const map = new ExtendedMap([
     *   ['a', 1],
     *   ['b', 2],
     *   ['c', 3],
     * ]);
     * const transformedMap = map.map((value, key) => value * 2);
     * // Result: ExtendedMap([['a', 2], ['b', 4], ['c', 6]])
     */
    map<U>(transform: (value: V, key: K) => U): ExtendedMap<K, U> {
        const mappedMap = new ExtendedMap<K, U>();
        for (const [key, value] of this.entries()) {
            mappedMap.set(key, transform(value, key));
        }
        return mappedMap;
    }
}

// Example usage:
const extendedMap = new ExtendedMap<number, string>([
    [1, 'one'],
    [2, 'two'],
    [3, 'three'],
]);

const filteredMap = extendedMap.filter((value, key) => key % 2 === 0);
console.log(filteredMap); // ExtendedMap([[2, 'two']])

console.log(extendedMap.isEmpty()); // false

const entriesArray = extendedMap.toArray();
console.log(entriesArray); // [['1', 'one'], ['2', 'two'], ['3', 'three']]

const mappedValues = extendedMap.map((value, key) => value.toUpperCase());
console.log(mappedValues); // ExtendedMap([[1, 'ONE'], [2, 'TWO'], [3, 'THREE']])
