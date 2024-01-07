/**
 * Represents a lazy sequence using a generator function.
 * @template T - The type of elements in the sequence.
 *
 * @example
 * // Example 1: Creating a sequence of numbers and performing operations
 * const numberSequence = new Sequence(function* () {
 *     for (let i = 1; i <= 5; i++) {
 *         yield i;
 *     }
 * });
 *
 * console.log(numberSequence.toList()); // Output: [1, 2, 3, 4, 5]
 *
 * const sumResult = numberSequence.sum();
 * console.log(sumResult); // Output: 15
 *
 * const squaredNumbers = numberSequence.map(x => x * x);
 * console.log(squaredNumbers.toList()); // Output: [1, 4, 9, 16, 25]
 *
 * // Example 2: Filtering elements in a sequence
 * const evenNumbers = numberSequence.filter(x => x % 2 === 0);
 * console.log(evenNumbers.toList()); // Output: [2, 4]
 *
 * // Example 3: Taking and dropping elements from a sequence
 * const takenNumbers = numberSequence.take(3);
 * console.log(takenNumbers.toList()); // Output: [1, 2, 3]
 *
 * const droppedNumbers = numberSequence.drop(2);
 * console.log(droppedNumbers.toList()); // Output: [3, 4, 5]
 *
 * // Example 4: Combining operations
 * const combinedSequence = numberSequence
 *     .filter(x => x % 2 !== 0) // Filter out even numbers
 *     .map(x => x * 3); // Multiply each remaining number by 3
 *
 * console.log(combinedSequence.toList()); // Output: [3, 9, 15]
 *
 * // Example 5: Chaining operations
 * const chainedSequence = numberSequence
 *     .filter(x => x > 2)
 *     .map(x => x * 2)
 *     .take(2);
 *
 * console.log(chainedSequence.toList()); // Output: [6, 8]
 *
 * @since version 1.0.3
 * @author Manuel Santos <ney.br.santos@gmail.com>
 */
export class Sequence<T> {
    private generator: Generator<T, void, unknown>;

    /**
     * Creates a Sequence with the provided generator function.
     * @param generator - A generator function that produces elements of the sequence.
     */
    constructor(generator: () => Generator<T, void, unknown>) {
        this.generator = generator();
    }

    /**
     * Converts an iterable into a lazy sequence.
     * @template T - The type of elements in the sequence.
     * @param {Iterable<T>} iterable - The iterable to convert.
     * @returns {Sequence<T>} A lazy sequence representing the elements of the iterable.
     * @example
     * const array = [1, 2, 3];
     * const sequence = Sequence.fromIterable(array);
     * const result = sequence.toArray(); // [1, 2, 3]
     */
    static fromIterable<T>(iterable: Iterable<T>): Sequence<T> {
        return new Sequence(function* () {
            for (const element of iterable) {
                yield element;
            }
        });
    }

    /**
     * Converts a string into a lazy sequence of its characters.
     * @param {string} input - The string to convert.
     * @returns {Sequence<string>} A lazy sequence representing the characters of the string.
     *
     * @example
     * const text = "Hello, world!";
     * const charSequence = Sequence.fromString(text);
     * const result = charSequence.toArray(); // ['H', 'e', 'l', 'l', 'o', ',', ' ', 'w', 'o', 'r', 'l', 'd', '!']
     */
    static fromString(input: string): Sequence<string> {
        return Sequence.fromIterable(input[Symbol.iterator]());
    }

    /**
     * Converts a string into a lazy sequence of its words using Intl.Segmenter.
     * @param {string} input - The string to convert.
     * @returns {Sequence<string>} A lazy sequence representing the words of the string.
     *
     * @example
     * // Example 1: as words and convert to an array
     * const phrase = "This is a sample phrase.";
     * const wordSequence = Sequence.fromPhrase(phrase);
     * const result = wordSequence.toArray(); // ['This', 'is', 'a', 'sample', 'phrase.']
     *
     * // Example 2: Chaining
     * const wordSequence = Sequence.fromPhrase(phrase);
     * const transformedSequence = wordSequence
     *     .map(word => word.toUpperCase()) // Convert words to uppercase
     *     .filter(word => word.length > 2) // Filter out short words
     *     .take(3); // Take the first 3 words
     *
     * const result = transformedSequence.toArray();
     * console.log(result); // Output: ['THIS', 'SAMPLE', 'PHRASE.']
     */
    static fromPhrase(input: string): Sequence<string> {
        const segmenter = new Intl.Segmenter('en', { granularity: 'word' });
        const iterator = segmenter.segment(input)[Symbol.iterator]();
        const words = Array.from(iterator, segment => segment.segment);
        return Sequence.fromIterable<string>(words);
    }

    /**
     * Returns the next element in the sequence.
     * @returns An object with `value` property representing the next element in the sequence.
     */
    next(): IteratorResult<T, void> {
        return this.generator.next();
    }

    /**
     * Converts the lazy sequence to an array.
     * @returns An array containing all elements of the sequence.
     */
    toArray(): T[] {
        const result: T[] = [];
        let next = this.next();
        while (!next.done) {
            result.push(next.value);
            next = this.next();
        }
        return result;
    }

    /**
     * Converts the lazy sequence to an array.
     * @returns An array containing all elements of the sequence.
     */
    toList(): T[] {
        const result: T[] = [];
        let next = this.next();
        while (!next.done) {
            result.push(next.value);
            next = this.next();
        }
        return result;
    }

    /**
     * Returns the sum of all elements in the lazy sequence.
     * @returns The sum of all elements in the sequence.
     */
    sum(): number {
        let total = 0;
        let next = this.next();
        while (!next.done) {
            total += next.value as number;
            next = this.next();
        }
        return total;
    }

    /**
     * Drops the specified number of elements from the lazy sequence.
     * @param count - The number of elements to drop from the sequence.
     * @returns A new LazySequence with the remaining elements.
     */
    drop(count: number): Sequence<T> {
        return new Sequence<T>(function* (this:Generator<T>) {
            for (let i = 0; i < count; i++) {
                const next = this.next();
                if (next.done) break;
            }
            yield* this;
        });
    }

    /**
     * Takes the specified number of elements from the lazy sequence.
     * @param count - The number of elements to take from the sequence.
     * @returns A new Sequence with the taken elements.
     */
    take(count: number): Sequence<T> {
        return new Sequence<T>(function* (this:Generator<T>) {
            for (let i = 0; i < count; i++) {
                const next = this.next();
                if (next.done) break;
                yield next.value;
            }
        });
    }

    /**
     * Returns the number of elements in the lazy sequence.
     * @returns The count of elements in the sequence.
     */
    count(): number {
        let count = 0;
        while (!this.next().done) {
            count++;
        }
        return count;
    }

    /**
     * Filters the lazy sequence based on a given predicate.
     * @param {function(T): boolean} predicate - The predicate function to filter elements.
     * @returns {Sequence<T>} - A new lazy sequence with filtered elements.
     * @example
     * const result = sequence.filter(x => x > 5);
     */
    filter(predicate: (value: T) => boolean): Sequence<T> {
        return new Sequence<T>(function* (this:Generator<T>) {
            let next = this.next();
            while (!next.done) {
                if (predicate(next.value)) {
                    yield next.value;
                }
                next = this.next();
            }
        });
    }

    /**
     * Maps each element in the lazy sequence using a provided mapping function.
     * @template U - The type of the resulting elements after mapping.
     * @param {function(T): U} mapper - The mapping function.
     * @returns {Sequence<U>} - A new lazy sequence with mapped elements.
     * @example
     * const result = sequence.map(x => x * 2);
     */
    map<U>(mapper: (value: T) => U): Sequence<U> {
        return new Sequence<U>(function* (this:Generator<T>) {
            let next = this.next();
            while (!next.done) {
                yield mapper(next.value);
                next = this.next();
            }
        });
    }

    /**
     * Reduces the lazy sequence to a single result using a reducer function.
     * @template U - The type of the result after reduction.
     * @param {function(U, T): U} reducer - The reducer function.
     * @param {U} initialValue - The initial value for reduction.
     * @returns {U} - The result after reducing the sequence.
     * @example
     * const result = sequence.reduce((acc, x) => acc + x, 0);
     */
    reduce<U>(reducer: (accumulator: U, value: T) => U, initialValue: U): U {
        let result = initialValue;
        let next = this.next();
        while (!next.done) {
            result = reducer(result, next.value);
            next = this.next();
        }
        return result;
    }

    /**
     * Executes a provided function for each element in the lazy sequence.
     * @param {function(T): void} action - The function to execute for each element.
     * @example
     * sequence.forEach(x => console.log(x));
     */
    forEach(action: (value: T) => void): void {
        let next = this.next();
        while (!next.done) {
            action(next.value);
            next = this.next();
        }
    }
}