/**
 * The Range class provides utility methods for working with numeric ranges. It allows you to generate a range of numbers,
 * check if a value is within a specified range, and create aliases for the range methods.
 *
 * @example
 * const numericRange = Range.range(1, 5, 2);
 * console.log(numericRange); // Output: [1, 3, 5]
 *
 * const isInRange = Range.inRange(3, 1, 5);
 * console.log(isInRange); // Output: true
 *
 * @since version 1.0.4
 * @author Manuel Santos <ney.br.santos@gmail.com>
 */
export class Range {
    /**
     * Creates an array representing a range of numbers from `start` to `end` (inclusive) with an optional step.
     * @param {number} start - The start of the range.
     * @param {number} end - The end of the range.
     * @param {number} [step=1] - The step between elements. Defaults to 1.
     * @returns {ReadonlyArray<number>} An array representing the range of numbers.
     * @example
     * const numericRange = Ranges.range(1, 5, 2);
     * console.log(numericRange); // Output: [1, 3, 5]
     */
    static range(start: number, end: number, step: number = 1): ReadonlyArray<number> {
        const length = Math.floor((end - start) / step) + 1;
        return Array.from({length}, (_, index) => start + index * step);
    }

    /**
     * Creates an array representing a range of numbers from `start` to `end` (inclusive) with an optional step.
     * Alias for the `range` method.
     * @param {number} start - The start of the range.
     * @param {number} end - The end of the range.
     * @param {number} [step=1] - The step between elements. Defaults to 1.
     * @returns {ReadonlyArray<number>} An array representing the range of numbers.
     * @example
     * const numericRange = Ranges.rangeTo(1, 5, 2);
     * console.log(numericRange); // Output: [1, 3, 5]
     */
    static rangeTo(start: number, end: number, step: number = 1): ReadonlyArray<number> {
        return Range.range(start, end, step);
    }

    /**
     * Creates an array representing a range of numbers from `start` to (end - 1) with an optional step.
     * @param {number} start - The start of the range.
     * @param {number} end - The end of the range.
     * @param {number} [step=1] - The step between elements. Defaults to 1.
     * @returns {ReadonlyArray<number>} An array representing the range of numbers.
     * @example
     * const numericRange = Ranges.rangeUntil(1, 5, 2);
     * console.log(numericRange); // Output: [1, 3]
     */
    static rangeUntil(start: number, end: number, step: number = 1): ReadonlyArray<number> {
        return Range.range(start, end - 1, step);
    }

    /**
     * Checks if a value is within the specified numeric range.
     * @param {number} value - The value to check.
     * @param {number} start - The start of the range.
     * @param {number} end - The end of the range.
     * @returns {boolean} True if the value is within the range, false otherwise.
     * @example
     * const isInRange = Ranges.inRange(3, 1, 5);
     * console.log(isInRange); // Output: true
     */
    static inRange(value: number, start: number, end: number): boolean {
        return value >= start && value <= end;
    }
}

declare global {

    /**
     * Creates an array representing a range of numbers from `start` to `end` (inclusive) with an optional step.
     * @param {number} start - The start of the range.
     * @param {number} end - The end of the range.
     * @param {number} [step=1] - The step between elements. Defaults to 1.
     * @returns {ReadonlyArray<number>} An array representing the range of numbers.
     * @example
     * const numericRange = rangeTo(1, 5, 2);
     * console.log(numericRange); // Output: [1, 3, 5]
     */
    function rangeTo(start: number, end: number, step?: number): ReadonlyArray<number>;

    /**
     * Creates an array representing a range of numbers from `start` to (end - 1) with an optional step.
     * @param {number} start - The start of the range.
     * @param {number} end - The end of the range.
     * @param {number} [step=1] - The step between elements. Defaults to 1.
     * @returns {ReadonlyArray<number>} An array representing the range of numbers.
     * @example
     * const numericRange = rangeUntil(1, 5, 2);
     * console.log(numericRange); // Output: [1, 3]
     */
    function rangeUntil(start: number, end: number, step?: number): ReadonlyArray<number>;

    /**
     * Checks if a value is within the specified numeric range.
     * @param {number} value - The value to check.
     * @param {number} start - The start of the range.
     * @param {number} end - The end of the range.
     * @returns {boolean} True if the value is within the range, false otherwise.
     * @example
     * const isInRange = inRange(3, 1, 5);
     * console.log(isInRange); // Output: true
     */
    function inRange(value: number, start: number, end: number): boolean;
}

// Global extensions
const _global = typeof window !== 'undefined' ? window : globalThis;

_global.rangeTo = function (start: number, end: number, step?: number): ReadonlyArray<number> {
    return Range.rangeTo(start, end, step);
}

_global.rangeUntil = function (start: number, end: number, step?: number): ReadonlyArray<number> {
    return Range.rangeUntil(start, end, step);
}

_global.inRange = function (value: number, start: number, end: number): boolean {
    return Range.inRange(value, start, end);
}