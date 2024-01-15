import {NoSuchElementError} from "./errors";
import {Comparable, Comparator} from "./compare";

/**
 * A class representing a generic reducer for aggregating elements using a specified comparator.
 *
 * @template T - The type of elements to reduce.
 *
 * @since version 1.4.0
 * @author Manuel Santos <ney.br.santos@gmail.com>
 */
export class Reducer<T> {

    private constructor(private readonly items: T[], private readonly comparator: Comparator<T>) {
    }

    /**
     * Creates a new Reducer instance from an array of items and a comparator function.
     *
     * @static
     * @template T - The type of elements to reduce.
     * @param {T[]} items - An array of items to be reduced.
     * @param {Comparator<T>} comparator - The comparator function for defining the reduction order.
     * @returns {Reducer<T>} A new Reducer instance.
     *
     * @example
     * const numbers = [3, 1, 4, 1, 5, 9, 2];
     * const compareNumbers = (a, b) => a - b;
     * const numberReducer = Reducer.of(numbers, { compare: compareNumbers });
     * console.log(numberReducer.reduce()); // Output: [1, 1, 2, 3, 4, 5, 9]
     *
     * @example
     * const words = ["apple", "banana", "orange"];
     * const compareStrings = (a, b) => a.localeCompare(b);
     * const stringReducer = Reducer.of(words, { compare: compareStrings });
     * console.log(stringReducer.reduce()); // Output: ["apple", "banana", "orange"]
     */
    static of<T>(items: T[], comparator: Comparator<T>): Reducer<T> {
        return new Reducer<T>(items, comparator);
    }

    /**
     * Sums the values by applying a selector function to each element in the array.
     *
     * @param selector A function to extract a numeric value from each element.
     * @returns The sum of the numeric values obtained by applying the selector function to each element.
     *
     * @example
     * const numbers = [1, 2, 3, 4, 5];
     * const sum = Collections.sumOf(numbers, (num) => num);
     * console.log(sum); // Output: 15
     */
    sumOf(selector: (item: T) => number): number {
        return this.items.reduce((sum, current) => sum + selector(current), 0);
    }

    /**
     * Finds the minimum element in the array.
     *
     * @returns The minimum element, or undefined if the array is empty.
     *
     * @example
     * const numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
     * const minResult = Collections.minOrNull(numbers);
     * console.log(minResult); // Output: 1
     */
    minOrNull(): T | undefined {
        if (this.items.length === 0) {
            return undefined;
        }

        return this.items.reduce((min, current) => (this.comparator.compare(current, min) < 0 ? current : min), this.items[0]);
    }

    /**
     * Finds the maximum element in the array.
     *
     * @returns The maximum element, or undefined if the array is empty.
     *
     * @example
     * const numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
     * const maxResult = Collections.maxOrNull(numbers);
     * console.log(maxResult); // Output: 9
     */
    maxOrNull(): T | undefined {
        if (this.items.length === 0) {
            return undefined;
        }

        return this.items.reduce((max, current) => (this.comparator.compare(current, max) > 0 ? current : max), this.items[0]);
    }

    /**
     * Finds the maximum element by comparing the results of the given selector function.
     *
     * @param selector A function to extract a numeric value from each element.
     * @returns The element with the maximum numeric value, or undefined if the array is empty.
     *
     * @example
     * const people = [
     *   { name: 'Alice', age: 30 },
     *   { name: 'Bob', age: 25 },
     *   { name: 'Charlie', age: 35 }
     * ];
     * const maxByAge = Collections.maxByOrNull(people, (person) => person.age);
     * console.log(maxByAge); // Output: { name: 'Charlie', age: 35 }
     */
    maxByOrNull(selector: (item: T) => number): T | undefined {
        if (this.items.length === 0) {
            return undefined;
        }

        return this.items.reduce((max, current) => (selector(current) > selector(max) ? current : max), this.items[0]);
    }

    /**
     * Finds the minimum element by comparing the results of the given selector function.
     *
     * @param selector A function to extract a numeric value from each element.
     * @returns The element with the minimum numeric value, or undefined if the array is empty.
     *
     * @example
     * const people = [
     *   { name: 'Alice', age: 30 },
     *   { name: 'Bob', age: 25 },
     *   { name: 'Charlie', age: 35 }
     * ];
     * const minByAge = Collections.minByOrNull(people, (person) => person.age);
     * console.log(minByAge); // Output: { name: 'Bob', age: 25 }
     */
    minByOrNull(selector: (item: T) => number): T | undefined {
        if (this.items.length === 0) {
            return undefined;
        }

        return this.items.reduce((min, current) => (selector(current) < selector(min) ? current : min), this.items[0]);
    }

    /**
     * Finds the minimum element by using a custom comparator function.
     *
     * @param comparator A function that compares two elements. Should return a negative value if the first element is smaller,
     *                  a positive value if the first element is larger, or zero if they are equal.
     * @returns The minimum element, or undefined if the array is empty.
     *
     * @example
     * const numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
     * const minResult = Collections.minWithOrNull(numbers, (a, b) => a - b);
     * console.log(minResult); // Output: 1
     */
    minWithOrNull(comparator: (a: T, b: T) => number): T | undefined {
        if (this.items.length === 0) {
            return undefined;
        }

        return this.items.reduce((min, current) => (comparator(current, min) < 0 ? current : min), this.items[0]);
    }

    /**
     * Finds the maximum element by using a custom comparator function.
     *
     * @param comparator A function that compares two elements. Should return a negative value if the first element is smaller,
     *                  a positive value if the first element is larger, or zero if they are equal.
     * @returns The maximum element, or undefined if the array is empty.
     *
     * @example
     * const numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
     * const maxResult = Collections.maxWithOrNull(numbers, (a, b) => a - b);
     * console.log(maxResult); // Output: 9
     */
    maxWithOrNull(comparator: (a: T, b: T) => number): T | undefined {
        if (this.items.length === 0) {
            return undefined;
        }

        return this.items.reduce((max, current) => (comparator(current, max) > 0 ? current : max), this.items[0]);
    }

    /**
     * Finds the minimum element by applying a selector function to each element and comparing the results.
     *
     * @param selector A function to extract a comparable value from each element.
     * @returns The element with the minimum comparable value, or undefined if the array is empty.
     *
     * @example
     * const people = [
     *   { name: 'Alice', age: 30 },
     *   { name: 'Bob', age: 25 },
     *   { name: 'Charlie', age: 35 }
     * ];
     * const minOfAge = Collections.minOfOrNull(people, (person) => person.age);
     * console.log(minOfAge); // Output: { name: 'Bob', age: 25 }
     */
    minOfOrNull<R extends Comparable<R>>(selector: (item: T) => R): T | undefined {
        if (this.items.length === 0) {
            return undefined;
        }

        return this.items.reduce((min, current) => (selector(current).compareTo(selector(min)) < 0 ? current : min), this.items[0]);
    }

    /**
     * Finds the maximum element by applying a selector function to each element and comparing the results.
     *
     * @param selector A function to extract a comparable value from each element.
     * @returns The element with the maximum comparable value, or undefined if the array is empty.
     *
     * @example
     * const people = [
     *   { name: 'Alice', age: 30 },
     *   { name: 'Bob', age: 25 },
     *   { name: 'Charlie', age: 35 }
     * ];
     * const maxOfAge = Collections.maxOfOrNull(people, (person) => person.age);
     * console.log(maxOfAge); // Output: { name: 'Charlie', age: 35 }
     */
    maxOfOrNull<R extends Comparable<R>>(selector: (item: T) => R): T | undefined {
        if (this.items.length === 0) {
            return undefined;
        }

        return this.items.reduce((max, current) => (selector(current).compareTo(selector(max)) > 0 ? current : max), this.items[0]);
    }

    /**
     * Finds the minimum element by applying a custom comparator function to the results of a selector function.
     *
     * @param selector A function to extract a comparable value from each element.
     * @param comparator A function that compares two elements. Should return a negative value if the first element is smaller,
     *                  a positive value if the first element is larger, or zero if they are equal.
     * @returns The element with the minimum comparable value, or undefined if the array is empty.
     *
     * @example
     * const people = [
     *   { name: 'Alice', age: 30 },
     *   { name: 'Bob', age: 25 },
     *   { name: 'Charlie', age: 35 }
     * ];
     * const minOfAge = Collections.minOfWithOrNull(people, (person) => person.age, (a, b) => a - b);
     * console.log(minOfAge); // Output: { name: 'Bob', age: 25 }
     */
    minOfWithOrNull<R>(selector: (item: T) => R, comparator: (a: R, b: R) => number): T | undefined {
        if (this.items.length === 0) {
            return undefined;
        }

        return this.items.reduce((min, current) => (comparator(selector(current), selector(min!)) < 0 ? current : min), this.items[0]);
    }

    /**
     * Finds the maximum element by applying a custom comparator function to the results of a selector function.
     *
     * @param selector A function to extract a comparable value from each element.
     * @param comparator A function that compares two elements. Should return a negative value if the first element is smaller,
     *                  a positive value if the first element is larger, or zero if they are equal.
     * @returns The element with the maximum comparable value, or undefined if the array is empty.
     *
     * @example
     * const people = [
     *   { name: 'Alice', age: 30 },
     *   { name: 'Bob', age: 25 },
     *   { name: 'Charlie', age: 35 }
     * ];
     * const maxOfAge = Collections.maxOfWithOrNull(people, (person) => person.age, (a, b) => a - b);
     * console.log(maxOfAge); // Output: { name: 'Charlie', age: 35 }
     */
    maxOfWithOrNull<R>(selector: (item: T) => R, comparator: (a: R, b: R) => number): T | undefined {
        if (this.items.length === 0) {
            return undefined;
        }

        return this.items.reduce((max, current) => (comparator(selector(current), selector(max!)) > 0 ? current : max), this.items[0]);
    }

    /**
     * Finds the minimum element by applying a selector function to each element and comparing the results.
     * Throws a NoSuchElementException if the array is empty.
     *
     * @param selector A function to extract a comparable value from each element.
     * @returns The element with the minimum comparable value.
     *
     * @throws {NoSuchElementError} If the array is empty.
     *
     * @example
     * const people = [
     *   { name: 'Alice', age: 30 },
     *   { name: 'Bob', age: 25 },
     *   { name: 'Charlie', age: 35 }
     * ];
     * const minOfAge = Collections.minOf(people, (person) => person.age);
     * console.log(minOfAge); // Output: { name: 'Bob', age: 25 }
     */
    minOf<R extends Comparable<R>>(selector: (item: T) => R): T {
        if (this.items.length === 0) {
            throw new NoSuchElementError('Array is empty');
        }

        return this.items.reduce((min, current) => (selector(current).compareTo(selector(min!)) < 0 ? current : min), this.items[0])!;
    }

    /**
     * Finds the maximum element by applying a selector function to each element and comparing the results.
     * Throws a NoSuchElementException if the array is empty.
     *
     * @param selector A function to extract a comparable value from each element.
     * @returns The element with the maximum comparable value.
     *
     * @throws {NoSuchElementError} If the array is empty.
     *
     * @example
     * const people = [
     *   { name: 'Alice', age: 30 },
     *   { name: 'Bob', age: 25 },
     *   { name: 'Charlie', age: 35 }
     * ];
     * const maxOfAge = Collections.maxOf(people, (person) => person.age);
     * console.log(maxOfAge); // Output: { name: 'Charlie', age: 35 }
     */
    maxOf<R extends Comparable<R>>(selector: (item: T) => R): T {
        if (this.items.length === 0) {
            throw new NoSuchElementError('Array is empty');
        }

        return this.items.reduce((max, current) => (selector(current).compareTo(selector(max!)) > 0 ? current : max), this.items[0])!;
    }

    /**
     * Finds the minimum element by applying a custom comparator function to the results of a selector function.
     * Throws a NoSuchElementException if the array is empty.
     *
     * @param selector A function to extract a comparable value from each element.
     * @param comparator A function that compares two elements. Should return a negative value if the first element is smaller,
     *                  a positive value if the first element is larger, or zero if they are equal.
     * @returns The element with the minimum comparable value.
     *
     * @throws {NoSuchElementError} If the array is empty.
     *
     * @example
     * const people = [
     *   { name: 'Alice', age: 30 },
     *   { name: 'Bob', age: 25 },
     *   { name: 'Charlie', age: 35 }
     * ];
     * const minOfAge = Collections.minOfWith(people, (person) => person.age, (a, b) => a - b);
     * console.log(minOfAge); // Output: { name: 'Bob', age: 25 }
     */
    minOfWith<R>(selector: (item: T) => R, comparator: (a: R, b: R) => number): T {
        if (this.items.length === 0) {
            throw new NoSuchElementError('Array is empty');
        }

        return this.items.reduce((min, current) => (comparator(selector(current), selector(min!)) < 0 ? current : min), this.items[0])!;
    }

    /**
     * Finds the maximum element by applying a custom comparator function to the results of a selector function.
     * Throws a NoSuchElementException if the array is empty.
     *
     * @param selector A function to extract a comparable value from each element.
     * @param comparator A function that compares two elements. Should return a negative value if the first element is smaller,
     *                  a positive value if the first element is larger, or zero if they are equal.
     * @returns The element with the maximum comparable value.
     *
     * @throws {NoSuchElementError} If the array is empty.
     *
     * @example
     * const people = [
     *   { name: 'Alice', age: 30 },
     *   { name: 'Bob', age: 25 },
     *   { name: 'Charlie', age: 35 }
     * ];
     * const maxOfAge = Collections.maxOfWith(people, (person) => person.age, (a, b) => a - b);
     * console.log(maxOfAge); // Output: { name: 'Charlie', age: 35 }
     */
    maxOfWith<R>(selector: (item: T) => R, comparator: (a: R, b: R) => number): T {
        if (this.items.length === 0) {
            throw new NoSuchElementError('Array is empty');
        }

        return this.items.reduce((max, current) => (comparator(selector(current), selector(max!)) > 0 ? current : max), this.items[0])!;
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
     * const product = Collections.fold(numbers, (num) => (acc) => acc * num, 1);
     * console.log(product); // Output: 120
     */
    fold<R>(folder: (current: T) => (accumulator: R) => R, initialValue: R): R {
        return this.items.reduce((acc, current) => folder(current)(acc), initialValue);
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
     * const result = Collections.foldRight(numbers, (num) => (acc) => acc - num, 0);
     * console.log(result); // Output: -5 (0 - 1 - 2 - 3 - 4 - 5)
     */
    foldRight<R>(folder: (current: T) => (accumulator: R) => R, initialValue: R): R {
        const reversedItems = [...this.items].reverse();
        return Reducer.of(reversedItems, this.comparator).fold<R>(folder, initialValue);
    }

    /**
     * Reduces the elements of the array to a single value by applying a reducer function with index information.
     *
     * @param reducer A function that takes an accumulator, the current element, and the current index, and returns a new accumulator.
     * @param initialValue The initial value of the accumulator.
     * @returns The result of the reduction with index information.
     *
     * @example
     * const numbers = [1, 2, 3, 4, 5];
     * const product = Collections.reduceIndexed(numbers, (acc, num, index) => acc * (num + index), 1);
     * console.log(product); // Output: 120 (1 * (1 + 0) * (2 + 1) * (3 + 2) * (4 + 3) * (5 + 4))
     */
    reduceIndexed<R>(reducer: (accumulator: R, current: T, index: number) => R, initialValue: R): R {
        return this.items.reduce((acc, current, index) => reducer(acc, current, index), initialValue);
    }

    /**
     * Folds the elements of the array to a single value by applying a folder function with index information.
     * Similar to `reduceIndexed`, but the folder function is curried.
     *
     * @param folder A curried function that takes the current element, the current index, and returns a function to apply to the next element.
     * @param initialValue The initial value for the folder function.
     * @returns The result of the folding with index information.
     *
     * @example
     * const numbers = [1, 2, 3, 4, 5];
     * const product = Collections.foldIndexed(numbers, (num, index) => (acc) => acc * (num + index), 1);
     * console.log(product); // Output: 120 (1 * (1 + 0) * (2 + 1) * (3 + 2) * (4 + 3) * (5 + 4))
     */
    foldIndexed<R>(folder: (current: T, index: number) => (accumulator: R) => R, initialValue: R): R {
        return this.items.reduce((acc, current, index) => folder(current, index)(acc), initialValue);
    }

    /**
     * Reduces the items in the array to a single value using the specified reducer function.
     * @template R - The type of the accumulated result.
     * @param  reducerFunction - A function that takes an accumulator and the current item and produces a new accumulator value.
     * @param {R} initialValue - The initial value of the accumulator.
     * @returns {R} The final accumulated result.
     */
    reduce<R>(reducerFunction: (accumulator: R, current: T, index: number) => R, initialValue: R): R {
        return this.items.reduce(reducerFunction, initialValue);
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
     * const result = Collections.reduceRightIndexed(numbers, (acc, num, index) => acc - (num + index), 0);
     * console.log(result); // Output: -9 (0 - (5 + 4) - (4 + 3) - (3 + 2) - (2 + 1) - (1 + 0))
     */
    reduceRightIndexed<R>(reducer: (accumulator: R, current: T, index: number) => R, initialValue: R): R {
        const reversedItems = [...this.items].reverse();
        return Reducer.of(reversedItems, this.comparator).reduceIndexed<R>(reducer, initialValue);
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
     * const result = Collections.foldRightIndexed(numbers, (num, index) => (acc) => acc - (num + index), 0);
     * console.log(result); // Output: -9 (0 - (5 + 4) - (4 + 3) - (3 + 2) - (2 + 1) - (1 + 0))
     */
    foldRightIndexed<R>(folder: (current: T, index: number) => (accumulator: R) => R, initialValue: R): R {
        const reversedItems = [...this.items].reverse();
        return Reducer.of(reversedItems, this.comparator).foldIndexed<R>(folder, initialValue);
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
     * const result = Collections.runningFold(numbers, (num) => (acc) => acc + num, 0);
     * console.log(result); // Output: [0, 1, 3, 6, 10, 15] (0, 0 + 1, (0 + 1) + 2, ((0 + 1) + 2) + 3, (((0 + 1) + 2) + 3) + 4, ((((0 + 1) + 2) + 3) + 4) + 5)
     */
    runningFold<R>(folder: (current: T) => (accumulator: R) => R, initialValue: R): R[] {
        return this.items.reduce((acc, current) => {
            const newAcc = folder(current)(acc[acc.length - 1]);
            return [...acc, newAcc];
        }, [initialValue]);
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
     * const result = Collections.runningReduce(numbers, (acc, num) => acc + num, 0);
     * console.log(result); // Output: [1, 3, 6, 10, 15] (1, 1 + 2, (1 + 2) + 3, ((1 + 2) + 3) + 4, (((1 + 2) + 3) + 4) + 5)
     */
    runningReduce<R>(reducer: (accumulator: R, current: T) => R, initialValue: R): R[] {
        return this.items.reduce((acc, current) => {
            const newAcc = reducer(acc[acc.length - 1], current);
            return [...acc, newAcc];
        }, [initialValue]);
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
     * const result = Collections.runningFoldIndexed(numbers, (num, index) => (acc) => acc + (num + index), 0);
     * console.log(result); // Output: [0, 1, 4, 9, 16, 25] (0, 0 + (1 + 0), (0 + (1 + 0)) + (2 + 1), ((0 + (1 + 0)) + (2 + 1)) + (3 + 2), (((0 + (1 + 0)) + (2 + 1)) + (3 + 2)) + (4 + 3), ((((0 + (1 + 0)) + (2 + 1)) + (3 + 2)) + (4 + 3)) + (5 + 4))
     */
    runningFoldIndexed<R>(folder: (current: T, index: number) => (accumulator: R) => R, initialValue: R): R[] {
        return this.items.reduce((acc, current, index) => {
            const newAcc = folder(current, index)(acc[acc.length - 1]);
            return [...acc, newAcc];
        }, [initialValue]);
    }

    /**
     * Performs a running reduce on the elements of the array from left to right with index information.
     *
     * @param reducer A function that takes an accumulator, the current element, and the current index and returns a new accumulator.
     * @param initialValue The initial value of the accumulator.
     * @returns An array of intermediate results from the running reduce with index information.
     *
     * @example
     * const numbers = [1, 2, 3, 4, 5];
     * const result = Collections.runningReduceIndexed(numbers, (acc, num, index) => acc + (num + index), 0);
     * console.log(result); // Output: [1, 4, 9, 16, 25] (1, 1 + (2 + 1), (1 + (2 + 1)) + (3 + 2), ((1 + (2 + 1)) + (3 + 2)) + (4 + 3), (((1 + (2 + 1)) + (3 + 2)) + (4 + 3)) + (5 + 4))
     */
    runningReduceIndexed<R>(reducer: (accumulator: R, current: T, index: number) => R, initialValue: R): R[] {
        return this.items.reduce((acc, current, index) => {
            const newAcc = reducer(acc[acc.length - 1], current, index);
            return [...acc, newAcc];
        }, [initialValue]);
    }
}

declare global {

    /**
     * Creates a new Reducer instance from an array of items and a comparator function.
     *
     * @function
     * @template T - The type of elements to reduce.
     * @param {T[]} items - An array of items to be reduced.
     * @param {Comparator<T>} comparator - The comparator function for defining the reduction order.
     * @returns {Reducer<T>} A new Reducer instance.
     *
     * @example
     * const numbers = [3, 1, 4, 1, 5, 9, 2];
     * const compareNumbers = (a, b) => a - b;
     * const numberReducer = reducerOf(numbers, { compare: compareNumbers });
     * console.log(numberReducer.reduce()); // Output: [1, 1, 2, 3, 4, 5, 9]
     *
     * @example
     * const words = ["apple", "banana", "orange"];
     * const compareStrings = (a, b) => a.localeCompare(b);
     * const stringReducer = reducerOf(words, { compare: compareStrings });
     * console.log(stringReducer.reduce()); // Output: ["apple", "banana", "orange"]
     */
    function reducerOf<T>(items: T[], comparator: Comparator<T>): Reducer<T>;

    interface Array<T> {

        /**
         * Creates a new Reducer instance using the provided comparator.
         *
         * @method
         * @param {Comparator<T>} comparator - The comparator function for defining the reduction order.
         * @returns {Reducer<T>} A new Reducer instance.
         *
         * @example
         * const numbers = [3, 1, 4, 1, 5, 9, 2];
         * const compareNumbers = (a, b) => a - b;
         * const numberReducer = numbers.reducer({ compare: compareNumbers });
         * console.log(numberReducer.reduce()); // Output: [1, 1, 2, 3, 4, 5, 9]
         *
         * @example
         * const words = ["apple", "banana", "orange"];
         * const compareStrings = (a, b) => a.localeCompare(b);
         * const stringReducer = words.reducer({ compare: compareStrings });
         * console.log(stringReducer.reduce()); // Output: ["apple", "banana", "orange"]
         */
        reducer(comparator: Comparator<T>): Reducer<T>;
    }
}

// Global extensions
const _global = typeof window !== 'undefined' ? window : globalThis;

_global.reducerOf = function <T>(items: T[], comparator: Comparator<T>): Reducer<T> {
    return Reducer.of(items, comparator);
}

Array.prototype.reducer = function <T>(comparator: Comparator<T>) {
    return reducerOf(this, comparator);
};