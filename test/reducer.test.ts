import {Reducer} from "../src";
import "../src";

describe('Reducer', () => {
    let numberReducer: Reducer<number>;

    beforeEach(() => {
        const numbers = [3, 1, 4, 1, 5, 9, 2];
        numberReducer = Reducer.of(numbers);
    });

    describe('sumOf', () => {
        test('sums the values', () => {
            const sum = numberReducer.sumOf((num) => num);
            expect(sum).toBe(25);
        });

        test('returns 0 for an empty array', () => {
            const emptyReducer = Reducer.of([]);
            const sum = emptyReducer.sumOf((num) => num);
            expect(sum).toBe(0);
        });
    });

    describe('minOrNull', () => {
        test('finds the minimum element', () => {
            const minResult = numberReducer.min((a, b) => a - b);
            expect(minResult.get()).toBe(1);
        });

        test('returns null for an empty array', () => {
            const emptyReducer = Reducer.of([]);
            const minResult = emptyReducer.min((a, b) => a - b);
            expect(minResult.isEmpty()).toBeTruthy();
        });
    });

    describe('maxOrNull', () => {
        test('finds the maximum element', () => {
            const maxResult = numberReducer.max((a, b) => a - b);
            expect(maxResult.get()).toBe(9);
        });

        test('returns null for an empty array', () => {
            const emptyReducer = Reducer.of([]);
            const maxResult = emptyReducer.max((a, b) => a - b);
            expect(maxResult.isEmpty()).toBeTruthy();
        });
    });

    describe('runningReduce', () => {
        test('performs a running reduce', () => {
            const result = numberReducer.runningReduce((acc: number, num: number) => acc + num);
            expect(result).toEqual([3, 6, 7, 11, 12, 17, 26, 28]);
        });

        test('performs a running reduce with initial value', () => {
            const result = numberReducer.runningReduce((acc: number, num: number) => acc + num, 10);
            expect(result).toEqual([10, 13, 14, 18, 19, 24, 33, 35]);
        });

        test('returns an empty array for an empty array', () => {
            const emptyReducer = Reducer.of<number>([]);
            const result = emptyReducer.runningReduce((acc, num) => acc + num);
            expect(result).toEqual([]);
        });

        test('returns [10] for an empty array when initialized with 10', () => {
            const emptyReducer = Reducer.of<number>([]);
            const result = emptyReducer.runningReduce((acc: number, num: number) => acc + num, 10);
            expect(result).toEqual([10]);
        });
    });

    describe('minOf', () => {
        test('finds the minimum element', () => {
            const minResult = numberReducer.minOf((num) => num);
            expect(minResult.get()).toBe(1);
        });

        test('throw error if empty array', () => {
            const emptyReducer = Reducer.of<number>([]);
            const minResult = emptyReducer.minOf((num) => num);
            expect(minResult.isEmpty()).toBeTruthy();
        });
    });

    describe('maxOf', () => {
        test('finds the maximum element', () => {
            const maxResult = numberReducer.maxOf((num) => num);
            expect(maxResult.get()).toBe(9);
        });

        test('returns null for an empty array', () => {
            const emptyReducer = Reducer.of([]);
            const maxResult = emptyReducer.maxOf((num) => num);
            expect(maxResult.isEmpty()).toBeTruthy();
        });
    });

    describe('fold', () => {
        test('folds the elements from the left', () => {
            const foldResult = numberReducer.fold((num) => (acc) => acc + num, 0);
            expect(foldResult).toBe(25);
        });

        test('returns the initial value for an empty array', () => {
            const emptyReducer = Reducer.of<number>([]);
            expect(()=> emptyReducer.fold((num) => (acc) => acc + num, 0)).toThrow("Reduce of empty array with no initial value");
        });
    });

    describe('foldRight', () => {
        test('folds the elements from the right', () => {
            const foldRightResult = numberReducer.foldRight((num) => (acc) => acc + num, 0);
            expect(foldRightResult).toBe(25);
        });

        test('returns the initial value for an empty array', () => {
            const emptyReducer = Reducer.of<number>([]);
            expect(()=> emptyReducer.foldRight((num) => (acc) => acc - num, 0)).toThrow("Reduce of empty array with no initial value");
        });
    });

    describe('reduceIndexed', () => {
        test('reduces the elements with index', () => {
            const reduceIndexedResult = numberReducer.reduceIndexed((acc, index, num) => acc + index + num, 0);
            expect(reduceIndexedResult).toBe(46);
        });

        test('returns the initial value for an empty array', () => {
            const emptyReducer = Reducer.of<number>([]);
            expect(()=> emptyReducer.reduceIndexed((acc, index, num) => acc + index + num, 0)).toThrow("Reduce of empty array with no initial value");
        });
    });

    describe('foldIndexed', () => {
        test('folds the elements with index from the left', () => {
            const foldIndexedResult = numberReducer.foldIndexed((num, index) => (acc) => acc * (num + index), 0);
            expect(foldIndexedResult).toBe(145152);
        });

        test('returns the initial value for an empty array', () => {
            const emptyReducer = Reducer.of<number>([]);
            expect(()=> emptyReducer.foldIndexed((num, index) => (acc) => acc + index + num, 0)).toThrow("Reduce of empty array with no initial value");
        });
    });

    describe('reduce', () => {
        test('reduces the elements from the left', () => {
            const reduceResult = numberReducer.reduce((acc, num) => acc + num, 0);
            expect(reduceResult).toBe(25);
        });

        test('returns the initial value for an empty array', () => {
            const emptyReducer = Reducer.of<number>([]);
            expect(()=> emptyReducer.reduce((acc, num) => acc + num, 0)).toThrow("Reduce of empty array with no initial value");
        });
    });

    describe('runningFold', () => {
        test('folds the elements from the left and accumulates results', () => {
            const runningFoldResult = numberReducer.runningFold((num) => (acc) => acc + num, 0);
            expect(runningFoldResult).toEqual([3, 6, 7, 11, 12, 17, 26,28]);
        });

        test('returns an array with the initial value for an empty array', () => {
            const emptyReducer = Reducer.of<number>([]);
            const runningFoldResult = emptyReducer.runningFold((num) => (acc) => acc + num, 0);
            expect(runningFoldResult).toEqual([]);
        });
    });

    describe('maxOfOrNull', () => {
        type Person ={
            name:string;
            age:number;
        };

        test('folds the elements from the left and accumulates results', () => {
            const people = [
                { name: 'Alice', age: 30 },
                { name: 'Bob', age: 25 },
                { name: 'Charlie', age: 35 }
            ];
            const reducer = Reducer.of(people);
            const maxByAge = reducer.maxOf((person) => person.age);
            expect(maxByAge.get()).toEqual({ name: 'Charlie', age: 35 });
        });

        test('returns an array with the initial value for an empty array', () => {
            const emptyReducer = Reducer.of<Person>([]);
            const runningFoldResult = emptyReducer.maxOf((person) => person.age);
            expect(runningFoldResult.isEmpty()).toBeTruthy();
        });
    });

    it('should return the minimum element when the array has more than one element and the selector function returns comparable values for all elements', () => {
        const people = [
            { name: 'Alice', age: 30 },
            { name: 'Bob', age: 25 },
            { name: 'Charlie', age: 35 }
        ];
        const reducer = Reducer.of(people);
        const minOfAge = reducer.minOfWith((person) => person.age, (a, b) => a - b);
        expect(minOfAge.get()).toEqual({ name: 'Bob', age: 25 });
    });
});
