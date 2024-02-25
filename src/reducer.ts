import {NoSuchElementError} from "./errors";
import {Comparable, Comparator} from "./compare";
import {Optional} from "./optional";

/**
 * A class representing a generic reducer for aggregating elements using a specified comparator.
 *
 * @template T - The type of elements to reduce.
 *
 * @since version 1.4.0
 * @author Manuel Santos <ney.br.santos@gmail.com>
 */
export class Reducer<T> {

    /**
     * Private constructor to initialize the Reducer with an array of items.
     * @param {T[]} items - The array of items to be reduced.
     */
    private constructor(private readonly items: T[]) {
    }

    /**
     * Creates a new Reducer instance from an array of items and a comparator function.
     *
     * @static
     * @template T - The type of elements to reduce.
     * @param {T[]} items - An array of items to be reduced.
     * @returns {Reducer<T>} A new Reducer instance.
     *
     * @example
     * const numbers = [3, 1, 4, 1, 5, 9, 2];
     * const numberReducer = Reducer.of(numbers);
     */
    static of<T>(items: T[]): Reducer<T> {
        return new Reducer<T>(items);
    }

    /**
     * Sums the values by applying a selector function to each element in the array.
     *
     * @param selector A function to extract a numeric value from each element.
     * @returns The sum of the numeric values obtained by applying the selector function to each element.
     *
     * @example
     * const numbers = [1, 2, 3, 4, 5];
     * const sum = numbers.reducer().sumOf((num) => num);
     * console.log(sum); // Output: 15
     */
    sumOf(selector: (item: T) => number): number {
        return this.items.reduce((sum, current) => sum + selector(current), 0);
    }

    /**
     * Finds the minimum element in an array by using a comparator function to determine the order of the elements.
     *
     * @returns An Optional object that either contains the minimum element or is empty if the array is empty
     *
     * @example
     * const numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
     * const reducer = Reducer.of(numbers);
     * const minResult = reducer.min((a, b) => a - b);
     * console.log(minResult); // Output: 1
     */
    min(comparator: (a: T, b: T) => number): Optional<T | undefined> {
        if (this.items.length === 0) {
            return Optional.empty();
        }
        return Optional.of(
            this.items.reduce((min, current) => (comparator(current, min) < 0 ? current : min), this.items[0])
        );
    }

    /**
     * Finds the maximum element in an array by using a comparator function to determine the order of the elements.
     *
     * @returns An Optional object that either contains the maximum element or is empty if the array is empty.
     *
     * @example
     * const numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
     * const reducer = Reducer.of(numbers);
     * const maxResult = reducer.max((a, b) => a - b);
     * console.log(maxResult); // Output: 9
     */
    max(comparator: (a: T, b: T) => number): Optional<T | undefined> {
        if (this.items.length === 0) {
            return Optional.empty();
        }
        return Optional.of(
            this.items.reduce((max, current) => (comparator(current, max) > 0 ? current : max), this.items[0])
        );
    }

    /**
     * Finds the maximum element in an array by comparing the results of a given selector function.
     *
     * @param selector A function to extract a numeric value from each element.
     * @returns An Optional containing the element with the maximum numeric value, or an empty Optional if the array is empty.
     *
     * @example
     * const people = [
     *   { name: 'Alice', age: 30 },
     *   { name: 'Bob', age: 25 },
     *   { name: 'Charlie', age: 35 }
     * ];
     * const reducer = Reducer.of(people);
     * const maxByAge = reducer.maxBy((person) => person.age);
     * console.log(maxByAge); // Output: { name: 'Charlie', age: 35 }
     */
    maxBy(selector: (item: T) => number): Optional<T | undefined> {
        if (this.items.length === 0) {
            return Optional.empty();
        }
        return Optional.of(
            this.items.reduce((max, current) => (selector(current) > selector(max) ? current : max), this.items[0])
        );
    }

    /**
     * Finds the minimum element in an array by comparing the results of a given selector function.
     *
     * @param selector A function to extract a numeric value from each element.
     * @returns An Optional containing the element with the minimum numeric value, or an empty Optional if the array is empty.
     *
     * @example
     * const people = [
     *   { name: 'Alice', age: 30 },
     *   { name: 'Bob', age: 25 },
     *   { name: 'Charlie', age: 35 }
     * ];
     * const reducer = Reducer.of(people);
     * const minByAge = reducer.minBy((person) => person.age);
     * console.log(minByAge); // Output: { name: 'Bob', age: 25 }
     */
    minBy(selector: (item: T) => number): Optional<T | undefined> {
        if (this.items.length === 0) {
            return Optional.empty();
        }
        return Optional.of(
            this.items.reduce((min, current) => (selector(current) < selector(min) ? current : min), this.items[0])
        );
    }

    /**
     * Finds the minimum element in an array by applying a selector function to each element and comparing the results.
     *
     * @param selector A function to extract a comparable value from each element.
     * @returns An Optional containing the element with the minimum comparable value, or an empty Optional if the array is empty.
     *
     * @example
     * const people = [
     *   { name: 'Alice', age: 30 },
     *   { name: 'Bob', age: 25 },
     *   { name: 'Charlie', age: 35 }
     * ];
     * const reducer = Reducer.of(people);
     * const minOfAge = reducer.minOf((person) => person.age);
     * console.log(minOfAge); // Output: { name: 'Bob', age: 25 }
     */
    minOf<R extends Comparable<R>>(selector: (item: T) => R): Optional<T | undefined> {
        if (this.items.length === 0) {
            return Optional.empty();
        }
        return Optional.of(
            this.items.reduce((min, current) => (selector(current).compareTo(selector(min)) < 0 ? current : min), this.items[0])
        );
    }

    /**
     * Finds the maximum element in an array by applying a selector function to each element and comparing the results.
     *
     * @param selector A function to extract a comparable value from each element.
     * @returns An Optional containing the element with the maximum comparable value, or an empty Optional if the array is empty.
     *
     * @example
     * const people = [
     *   { name: 'Alice', age: 30 },
     *   { name: 'Bob', age: 25 },
     *   { name: 'Charlie', age: 35 }
     * ];
     * const reducer = Reducer.of(people);
     * const maxOfAge = reducer.maxOf((person) => person.age);
     * console.log(maxOfAge); // Output: { name: 'Charlie', age: 35 }
     */
    maxOf<R extends Comparable<R>>(selector: (item: T) => R): Optional<T | undefined> {
        if (this.items.length === 0) {
            return Optional.empty();
        }
        return Optional.of(
            this.items.reduce((max, current) => (selector(current).compareTo(selector(max)) > 0 ? current : max), this.items[0])
        );
    }

    /**
     * Finds the minimum element in an array by applying a custom comparator function to the results of a selector function.
     *
     * @param selector A function to extract a comparable value from each element.
     * @param comparator A function that compares two elements. Should return a negative value if the first element is smaller,
     *                  a positive value if the first element is larger, or zero if they are equal.
     * @returns An Optional containing the element with the minimum comparable value, or an empty Optional if the array is empty
     *
     * @example
     * const people = [
     *   { name: 'Alice', age: 30 },
     *   { name: 'Bob', age: 25 },
     *   { name: 'Charlie', age: 35 }
     * ];
     * const reducer = Reducer.of(people);
     * const minOfAge = reducer.minOfWith((person) => person.age, (a, b) => a - b);
     * console.log(minOfAge); // Output: { name: 'Bob', age: 25 }
     */
    minOfWith<R>(selector: (item: T) => R, comparator: (a: R, b: R) => number): Optional<T | undefined> {
        if (this.items.length === 0) {
            return Optional.empty();
        }
        return Optional.of(
            this.items.reduce((min, current) => (comparator(selector(current), selector(min!)) < 0 ? current : min), this.items[0])
        );
    }

    /**
     * Finds the maximum element in an array by applying a custom comparator function to the results of a selector function.
     *
     * @param selector A function to extract a comparable value from each element.
     * @param comparator A function that compares two elements. Should return a negative value if the first element is smaller,
     *                  a positive value if the first element is larger, or zero if they are equal.
     * @returns An Optional containing the element with the maximum comparable value, or an empty Optional if the array is empty.
     *
     * @example
     * const people = [
     *   { name: 'Alice', age: 30 },
     *   { name: 'Bob', age: 25 },
     *   { name: 'Charlie', age: 35 }
     * ];
     * const reducer = Reducer.of(people);
     * const maxOfAge = reducer.maxOfWith((person) => person.age, (a, b) => a - b);
     * console.log(maxOfAge); // Output: { name: 'Charlie', age: 35 }
     */
    maxOfWith<R>(selector: (item: T) => R, comparator: (a: R, b: R) => number): Optional<T | undefined> {
        if (this.items.length === 0) {
            return Optional.empty();
        }
        return Optional.of(
            this.items.reduce((max, current) => (comparator(selector(current), selector(max!)) > 0 ? current : max), this.items[0])
        );
    }

    /**
     * Folds the elements of the array to a single value by applying a folder function.
     * Similar to `reduce`, but the folder function is curried.
     *
     * @param folder A curried function that takes the current element and returns a function to apply to the next element.
     * @param initialValue The initial value for the folder function.
     * @returns The result of the folding.
     *
     * @example
     * const numbers = [1, 2, 3, 4, 5];
     * const reducer = Reducer.of(numbers);
     * const product = reducer.fold((num) => (acc) => acc * num, 1);
     * console.log(product); // Output: 120
     */
    fold(folder: (current: T) => (accumulator: T) => T, initialValue?: T): T {
        return this.reduce((acc, current) => folder(current)(acc), initialValue);
    }

    /**
     * Folds the elements of the array from right to left to a single value by applying a folder function.
     *
     * @param folder A curried function that takes the current element and returns a function to apply to the next element.
     * @param initialValue The initial value for the folder function.
     * @returns The result of the folding from right to left.
     *
     * @example
     * const numbers = [1, 2, 3, 4, 5];
     * const reducer = Reducer.of(numbers);
     * const result = reducer.foldRight((num) => (acc) => acc - num, 0);
     * console.log(result); // Output: -5 (0 - 1 - 2 - 3 - 4 - 5)
     */
    foldRight(folder: (current: T) => (accumulator: T) => T, initialValue?: T): T {
        const reversedItems = [...this.items].reverse();
        return Reducer.of(reversedItems).fold(folder, initialValue);
    }

    /**
     * Reduces the elements of an array to a single value by applying a reducer function that takes an accumulator, the current element, and the current index. It allows for index-based operations during the reduction process.
     *
     * @param reducer A function that takes an accumulator, the current element, and the current index, and returns a new accumulator.
     * @param initialValue The initial value of the accumulator.
     * @returns The result of the reduction with index information.
     *
     * @example
     * const numbers = [1, 2, 3, 4, 5];
     * const reducer = Reducer.of(numbers);
     * const product = reducer.reduceIndexed((acc, num, index) => acc * (num + index), 1);
     * console.log(product); // Output: 120 (1 * (1 + 0) * (2 + 1) * (3 + 2) * (4 + 3) * (5 + 4))
     *
     */
    reduceIndexed(reducer: (accumulator: T, current: T, index: number) => T, initialValue?: T): T {
        return this.reduce((acc, current, index) => reducer(acc, current, index), initialValue);
    }

    /**
     *  Folds the elements of an array into a single value by applying a curried folder function with index information.
     *
     * @param folder A curried function that takes the current element, the current index, and returns a function to apply to the next element.
     * @param initialValue The initial value for the folder function.
     * @returns The result of the folding with index information.
     *
     * @example
     * const numbers = [1, 2, 3, 4, 5];
     * const reducer = Reducer.of(numbers);
     * const product = reducer.foldIndexed((num, index) => (acc) => acc * (num + index), 1);
     * console.log(product); // Output: 120 (1 * (1 + 0) * (2 + 1) * (3 + 2) * (4 + 3) * (5 + 4))
     */
    foldIndexed(folder: (current: T, index: number) => (accumulator: T) => T, initialValue?: T): T {
        return this.reduce((acc, current, index) => folder(current, index)(acc), initialValue);
    }

    /**
     * Reduces the items in the array to a single value using the specified reducer function.
     *
     * @param  reducerFunction - A function that takes an accumulator and the current item and produces a new accumulator value.
     * @param  initialValue - The initial value of the accumulator.
     * @returns  The final accumulated result.
     *
     * @example
     * const numbers = [3, 1, 4, 1, 5, 9, 2];
     * const numberReducer = Reducer.of(numbers);
     *
     * const sum = numberReducer.reduce((acc, num) => acc + num);
     * // sum = 25
     *
     * const product = numberReducer.reduce((acc, num) => acc * num, 1);
     * // product = 1080
     */
    reduce(reducerFunction: (accumulator: T, current: T, index: number) => T, initialValue?: T): T {
        if (initialValue) {
            return this.items.reduce(reducerFunction, initialValue);
        }
        return this.items.reduce(reducerFunction);
    }

    /**
     * Reduces the elements of the array from right to left to a single value by applying a reducer function with index information.
     *
     * @param reducer A function that takes an accumulator, the current element, and the current index, and returns a new accumulator.
     * @param initialValue The initial value of the accumulator.
     * @returns The result of the reduction from right to left with index information.
     *
     * @example
     * const numbers = [1, 2, 3, 4, 5];
     * const reducer = (acc, num, index) => acc - (num + index);
     * const result = Reducer.of(numbers).reduceRightIndexed(reducer);
     * console.log(result); // Output: -9
     *
     * In this example, we have an array of numbers [1, 2, 3, 4, 5]. The reducer function subtracts each number from the
     * accumulator, where the accumulator is initially set to the last element of the array. The index of each element
     * is also subtracted from the accumulator. The result is -9, which is obtained by performing the following
     * calculations: 5 - (4 + 3) - (3 + 2) - (2 + 1) - (1 + 0).
     */
    reduceRightIndexed(reducer: (accumulator: T, current: T, index: number) => T, initialValue?: T): T {
        const reversedItems = [...this.items].reverse();
        return Reducer.of(reversedItems).reduceIndexed(reducer, initialValue);
    }

    /**
     * Folds the elements of the array from right to left to a single value by applying a folder function with index information.
     *
     * @param folder A curried function that takes the current element, the current index, and returns a function to apply to the next element.
     * @param initialValue The initial value for the folder function.
     * @returns The result of the folding from right to left with index information.
     *
     * @example
     * const numbers = [1, 2, 3, 4, 5];
     * const result = Reducer.of(numbers).foldRightIndexed((num, index) => (acc) => acc - (num + index), 0);
     * console.log(result); // Output: -9 (0 - (5 + 4) - (4 + 3) - (3 + 2) - (2 + 1) - (1 + 0))
     */
    foldRightIndexed(folder: (current: T, index: number) => (accumulator: T) => T, initialValue?: T): T {
        const reversedItems = [...this.items].reverse();
        return Reducer.of(reversedItems).foldIndexed(folder, initialValue);
    }

    /**
     * Performs a running fold (scan) on the elements of the array from left to right.
     *
     * @param folder A curried function that takes the current element and returns a function to apply to the next element.
     * @param initialValue The initial value for the folder function.
     * @returns An array of intermediate results from the running fold.
     *
     * @example
     * const numbers = [1, 2, 3, 4, 5];
     * const result = Reducer.of(numbers).runningFold((num) => (acc) => acc + num);
     * console.log(result); // Output: [0, 1, 3, 6, 10, 15] (0, 0 + 1, (0 + 1) + 2, ((0 + 1) + 2) + 3, (((0 + 1) + 2) + 3) + 4, ((((0 + 1) + 2) + 3) + 4) + 5)
     */
    runningFold(folder: (current: T) => (accumulator: T) => T, initialValue?: T): T[] {
        return this.items.reduce((acc, current) => {
            const newAcc = folder(current)(acc[acc.length - 1]);
            return [...acc, newAcc];
        }, initialValue ? [initialValue] : [this.items[0]]);
    }

    /**
     * Performs a running reduce on the elements of the array from left to right.
     *
     * @param reducer A function that takes an accumulator and the current element and returns a new accumulator.
     * @param initialValue The initial value of the accumulator.
     * @returns An array of intermediate results from the running reduce.
     *
     * @example
     * const numbers = [1, 2, 3, 4, 5];
     * const reducer = Reducer.of(numbers);
     * const result = reducer.runningReduce((acc, num) => acc + num);
     * console.log(result); // Output: [1, 3, 6, 10, 15] (1, 1 + 2, (1 + 2) + 3, ((1 + 2) + 3) + 4, (((1 + 2) + 3) + 4) + 5)
     */
    runningReduce(reducer: (accumulator: T, current: T) => T, initialValue?: T): T[] {
        return this.items.reduce((acc, current) => {
            const newAcc = reducer(acc[acc.length - 1], current);
            return [...acc, newAcc];
        }, initialValue ? [initialValue] : [this.items[0]]);
    }

    /**
     * Performs a running fold (scan) on the elements of the array from left to right with index information.
     *
     * @param folder A curried function that takes the current element, the current index, and returns a function to apply to the next element.
     * @param initialValue The initial value for the folder function.
     * @returns An array of intermediate results from the running fold with index information.
     *
     * @example
     * const numbers = [1, 2, 3, 4, 5];
     * const reducer = Reducer.of(numbers);
     * const result = reducer.runningFoldIndexed((num, index) => (acc) => acc + (num + index), 0);
     * console.log(result); // Output: [0, 1, 4, 9, 16, 25] (0, 0 + (1 + 0), (0 + (1 + 0)) + (2 + 1), ((0 + (1 + 0)) + (2 + 1)) + (3 + 2), (((0 + (1 + 0)) + (2 + 1)) + (3 + 2)) + (4 + 3), ((((0 + (1 + 0)) + (2 + 1)) + (3 + 2)) + (4 + 3)) + (5 + 4))
     */
    runningFoldIndexed(folder: (current: T, index: number) => (accumulator: T) => T, initialValue?: T): T[] {
        return this.items.reduce((acc, current, index) => {
            const newAcc = folder(current, index)(acc[acc.length - 1]);
            return [...acc, newAcc];
        }, initialValue ? [initialValue] : [this.items[0]]);
    }

    /**
     * Performs a running reduce operation on the elements of an array from left to right, while also providing the index information.
     * It takes a reducer function, which takes an accumulator, the current element, and the current index, and returns
     * a new accumulator. The method returns an array of intermediate results from the running reduce operation.
     *
     * @param reducer A function that takes an accumulator, the current element, and the current index and returns a new accumulator.
     * @param initialValue The initial value of the accumulator.
     * @returns An array of intermediate results from the running reduce with index information.
     *
     * @example
     * const numbers = [1, 2, 3, 4, 5];
     * const reducer = (acc, num, index) => acc + (num + index);
     * const result = Reducer.of(numbers).runningReduceIndexed(reducer, 0);
     * console.log(result); // Output: [1, 4, 9, 16, 25] (1, 1 + (2 + 1), (1 + (2 + 1)) + (3 + 2), ((1 + (2 + 1)) + (3 + 2)) + (4 + 3), (((1 + (2 + 1)) + (3 + 2)) + (4 + 3)) + (5 + 4))
     */
    runningReduceIndexed(reducer: (accumulator: T, current: T, index: number) => T, initialValue?: T): T[] {
        return this.items.reduce((acc, current, index) => {
            const newAcc = reducer(acc[acc.length - 1], current, index);
            return [...acc, newAcc];
        }, initialValue ? [initialValue] : [this.items[0]]);
    }
}

declare global {

    /**
     * Creates a new instance of the Reducer class from an array of items.
     *
     * @function
     * @template T - The type of elements to reduce.
     * @param {T[]} items - An array of items to be reduced.
     * @returns {Reducer<T>} A new Reducer instance.
     *
     * @example
     * const numbers = [3, 1, 4, 1, 5, 9, 2];
     * const numberReducer = reducerOf(numbers);
     * console.log(numberReducer.sumOf(item => item)); // Output: 25
     */
    function reducerOf<T>(items: T[]): Reducer<T>;

    interface Array<T> {

        /**
         * Creates a new Reducer instance using the provided comparator.
         *
         * @returns {Reducer<T>} A new Reducer instance.
         *
         * @example
         * const numberReducer = [3, 1, 4, 1, 5, 9, 2].reducer();
         * console.log(numberReducer.sumOf(item => item)); // Output: 25
         */
        reducer(): Reducer<T>;
    }
}

// Global extensions
const _global = typeof window !== 'undefined' ? window : globalThis;

_global.reducerOf = function <T>(items: T[]): Reducer<T> {
    return Reducer.of(items);
}

Object.defineProperty(Array.prototype, 'reducer', {
    value: function <T>(this: Array<T>) {
        return reducerOf(this);
    },
    enumerable: false,
    writable: false,
    configurable: false
});