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
     * Creates a lazy sequence of either characters or words from the provided string.
     *
     * @param {string} input - The input string to create a sequence from.
     * @param {"char" | "word"} [output="word"] - The output type, either "char" for characters or "word" for words.
     * @returns {Sequence<string>} A lazy sequence representing characters or words from the input string.
     *
     * @example
     * // Example 1: Sequence of Words (default)
     * const wordsSequence = Sequence.fromString("Hello world! This is a test.");
     * const wordArray = wordsSequence.toArray();
     * console.log(wordArray); // Output: ["Hello", "world", "This", "is", "a", "test"]
     *
     * @example
     * // Example 2: Sequence of Characters
     * const charSequence = Sequence.fromString("Hello world!", "char");
     * const charArray = charSequence.toArray();
     * console.log(charArray); // Output: ["H", "e", "l", "l", "o", " ", "w", "o", "r", "l", "d", "!"]
     */
    static fromString(input: string, output?: "char"|"word"): Sequence<string> {
        if (!output || output === "word"){
            // Sequence of Words
            const segmenter = new Intl.Segmenter('en', { granularity: 'word' });
            const iterator = segmenter.segment(input)[Symbol.iterator]();
            const words = Array.from(iterator, segment => segment.segment);
            return Sequence.fromIterable<string>(words);
        }else {
            // Sequence of Chars
            return Sequence.fromIterable(input[Symbol.iterator]());
        }
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
            result.push(next.value as T);
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
            result.push(next.value as T);
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
            result = reducer(result, next.value as T);
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
            action(next.value as T);
            next = this.next();
        }
    }
}

declare global {

    /**
     * Creates a lazy sequence using the provided generator function or iterable.
     * @param {(() => Generator<T, void, unknown>) | Iterable<T>} source - A generator function or iterable that produces elements of the sequence.
     * @returns {Sequence<T>} A lazy sequence representing the elements generated by the provided source.
     * @template T
     *
     * @example
     * // Example with a generator function:
     * const numbersSequence = sequenceOf(function* () {
     *     yield 1;
     *     yield 2;
     *     yield 3;
     * });
     *
     * // Example with an iterable:
     * const iterableSequence = sequenceOf([4, 5, 6]);
     *
     * // Using methods from the Sequence class on both sequences
     * const resultArray1 = numbersSequence.toArray();
     * const resultArray2 = iterableSequence.map(num => num * num).toArray();
     *
     * console.log(resultArray1); // Output: [1, 4, 9]
     * console.log(resultArray2); // Output: [16, 25, 36]
     */
    function sequenceOf<T>(source: (() => Generator<T, void, unknown>) | Iterable<T>): Sequence<T>;
}

// Global extensions
const _global = typeof window !== 'undefined' ? window : globalThis;

_global.sequenceOf = function <T>(source: (() => Generator<T, void, unknown>) | Iterable<T>): Sequence<T> {
    if (typeof source === 'function') {
        return new Sequence(source as () => Generator<T, void, unknown>);
    } else {
        return Sequence.fromIterable(source as Iterable<T>);
    }
}