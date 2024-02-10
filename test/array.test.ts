import "../src/index"

describe('Array Functions', () => {
    describe('listOf', () => {
        test('creates an immutable list with provided elements', () => {
            const immutableList = listOf(1, 2, 3);
            expect(Array.isArray(immutableList)).toBe(true);
            expect(immutableList).toEqual([1, 2, 3]);
        });
    });

    describe('mutableListOf', () => {
        test('creates a mutable list with provided elements', () => {
            const mutableList = mutableListOf(1, 2, 3);
            expect(Array.isArray(mutableList)).toBe(true);
            expect(mutableList).toEqual([1, 2, 3]);
        });
    });

    describe('emptyList', () => {
        test('creates an empty list', () => {
            const emptyArray = emptyList();
            expect(Array.isArray(emptyArray)).toBe(true);
            expect(emptyArray.length).toBe(0);
        });
    });

    describe('Array extensions', () => {
        let array:number[];

        beforeEach(() => {
            array = [1, 2, 3, 4, 5];
        });

        test('associateWith', () => {
            const keyValuePairs = array.associateWith(
                (element) => element.toString(),
                (element) => element * 2
            );
            expect(typeof keyValuePairs).toBe('object');
            expect(keyValuePairs).toEqual({
                '1': 2,
                '2': 4,
                '3': 6,
                '4': 8,
                '5': 10,
            });
        });

        test('mapIndexed', () => {
            const mappedArray = array.mapIndexed((element, index) => element + index);
            expect(Array.isArray(mappedArray)).toBe(true);
            expect(mappedArray).toEqual([1, 3, 5, 7, 9]);
        });

        test('sortBy', () => {
            const users = [
                { name: 'John', age: 30 },
                { name: 'Alice', age: 25 },
                { name: 'Bob', age: 35 },
            ];
            const sortedUsers = users.sortBy((a, b) => a.age - b.age);
            expect(Array.isArray(sortedUsers)).toBe(true);
            expect(sortedUsers).toEqual([
                { name: 'Alice', age: 25 },
                { name: 'John', age: 30 },
                { name: 'Bob', age: 35 },
            ]);
        });

        test('plus', () => {
            const otherArray = [6, 7, 8];
            const resultArray = array.plus(otherArray);
            expect(Array.isArray(resultArray)).toBe(true);
            expect(resultArray).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
            expect(array).toEqual([1, 2, 3, 4, 5]);
        });

        test('minus', () => {
            const elementsToRemove = [3, 5];
            const resultArray = array.minus(elementsToRemove);
            expect(Array.isArray(resultArray)).toBe(true);
            expect(resultArray).toEqual([1, 2, 4]);
            expect(array).toEqual([1, 2, 3, 4, 5]);
        });

        test('minusAssign', () => {
            const elementsToRemove = [3, 5];
            const resultArray = array.minusAssign(elementsToRemove);
            expect(Array.isArray(resultArray)).toBe(true);
            expect(resultArray).toEqual([1, 2, 4]);
            expect(array).toEqual([1, 2, 4]);
        });

        test('plusAssign', () => {
            const additionalElements = [6, 7, 8];
            const resultArray = array.plusAssign(additionalElements);
            expect(Array.isArray(resultArray)).toBe(true);
            expect(resultArray).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
            expect(array).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
        });

        test('count', () => {
            const elementCount = array.count();
            expect(elementCount).toBe(5);
        });

        test('removeAll', () => {
            const elementsToRemove = [3, 5];
            const resultArray = array.removeAll(elementsToRemove);
            expect(Array.isArray(resultArray)).toBe(true);
            expect(resultArray).toEqual([1, 2, 4]);
        });

        test('retainAll', () => {
            const elementsToRetain = [3, 5];
            const resultArray = array.retainAll(elementsToRetain);
            expect(Array.isArray(resultArray)).toBe(true);
            expect(resultArray).toEqual([3, 5]);
        });

        test('last', () => {
            const lastElement = array.last();
            expect(lastElement).toBe(5);
        });

        test('getOrElse', () => {
            const element1 = array.getOrElse(2, () => 10);
            expect(element1).toBe(3);

            const element2 = array.getOrElse(9, () => 10);
            expect(element2).toBe(10);
        });

        test('getOrEmpty', () => {
            const optionalElement = array.getOrEmpty(2);
            expect(optionalElement.isPresent()).toBe(true);
            expect(optionalElement.get()).toBe(3);

            const emptyElement = array.getOrEmpty(9);
            expect(emptyElement.isEmpty()).toBe(true);
        });

        test('shuffle', () => {
            const shuffledArray = array.shuffle();
            expect(Array.isArray(shuffledArray)).toBe(true);
            expect(shuffledArray.length).toEqual(5);
            expect(shuffledArray).not.toEqual([1, 2, 3, 4, 5]); // due to randomness
        });
    });
});
