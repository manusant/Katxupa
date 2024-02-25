import {Range} from "../src";
import "../src";

describe('Range', () => {
    describe('range', () => {
        test('generates a numeric range with default step', () => {
            const result = Range.range(1, 5);
            expect(result).toEqual([1, 2, 3, 4, 5]);
        });

        test('generates a numeric range with a specified step', () => {
            const result = Range.range(1, 5, 2);
            expect(result).toEqual([1, 3, 5]);
        });
    });

    describe('rangeTo', () => {
        test('is an alias for range method', () => {
            const result1 = Range.rangeTo(1, 5);
            const result2 = Range.range(1, 5);
            expect(result1).toEqual(result2);
        });
    });

    describe('rangeUntil', () => {
        test('generates a numeric range with specified end (exclusive)', () => {
            const result = Range.rangeUntil(1, 5, 2);
            expect(result).toEqual([1, 3]);
        });
    });

    describe('inRange', () => {
        test('checks if a value is within the specified range', () => {
            const result1 = Range.inRange(3, 1, 5);
            const result2 = Range.inRange(6, 1, 5);
            expect(result1).toBe(true);
            expect(result2).toBe(false);
        });
    });
});

describe('Global Functions', () => {
    describe('rangeTo', () => {
        test('generates a numeric range with default step', () => {
            const result = rangeTo(1, 5);
            expect(result).toEqual([1, 2, 3, 4, 5]);
        });

        test('generates a numeric range with a specified step', () => {
            const result = rangeTo(1, 5, 2);
            expect(result).toEqual([1, 3, 5]);
        });
    });

    describe('rangeUntil', () => {
        test('generates a numeric range with specified end (exclusive)', () => {
            const result = rangeUntil(1, 5, 2);
            expect(result).toEqual([1, 3]);
        });
    });

    describe('inRange', () => {
        test('checks if a value is within the specified range', () => {
            const result1 = inRange(3, 1, 5);
            const result2 = inRange(6, 1, 5);
            expect(result1).toBe(true);
            expect(result2).toBe(false);
        });
    });
});