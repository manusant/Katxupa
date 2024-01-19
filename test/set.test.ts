import "../src/index";

describe('Set Functions', () => {
    describe('setOf', () => {
        test('creates a readonly set with provided elements', () => {
            const readOnlySet = setOf(1, 2, 3);
            expect(readOnlySet instanceof Set).toBe(true);
            // add more specific tests if needed
        });
    });

    describe('mutableSetOf', () => {
        test('creates a mutable set with provided elements', () => {
            const mutableSet = mutableSetOf(1, 2, 3);
            expect(mutableSet instanceof Set).toBe(true);
            // add more specific tests if needed
        });
    });

    describe('emptySet', () => {
        test('creates an empty set', () => {
            const emptyReadOnlySet = emptySet();
            expect(emptyReadOnlySet instanceof Set).toBe(true);
            expect(emptyReadOnlySet.size).toBe(0);
        });
    });

    describe('Set extensions', () => {
        let set1: Set, set2;

        beforeEach(() => {
            set1 = setOf(1, 2, 3);
            set2 = setOf(2, 3, 4);
        });

        test('intersection', () => {
            const intersectionSet = set1.intersection(set2);
            expect(intersectionSet instanceof Set).toBe(true);
            expect([...intersectionSet]).toEqual([2, 3]);
        });

        test('union', () => {
            const unionSet = set1.union(set2);
            expect(unionSet instanceof Set).toBe(true);
            expect([...unionSet]).toEqual([1, 2, 3, 4]);
        });

        test('difference', () => {
            const differenceSet = set1.difference(set2);
            expect(differenceSet instanceof Set).toBe(true);
            expect([...differenceSet]).toEqual([1]);
        });

        test('isSubsetOf', () => {
            const isSubset = set1.isSubsetOf(set2);
            expect(isSubset).toBe(false);
        });

        test('isSupersetOf', () => {
            const isSuperset = set1.isSupersetOf(set2);
            expect(isSuperset).toBe(false);
        });

        test('map', () => {
            const squaredSet = set1.map((num) => num * num);
            expect(squaredSet instanceof Set).toBe(true);
            expect([...squaredSet]).toEqual([1, 4, 9]);
        });

        test('filter', () => {
            const filteredSet = set1.filter((num) => num % 2 === 0);
            expect(filteredSet instanceof Set).toBe(true);
            expect([...filteredSet]).toEqual([2]);
        });
    });
});
