import  "../src";

describe('Comparable Interface', () => {
    describe('compareTo', () => {
        test('compares numbers', () => {
            const result = (5).compareTo(3);
            expect(result).toBe(2);
        });

        test('compares strings', () => {
            const result = 'apple'.compareTo('banana');
            expect(result).toBe(-1);
        });

        test('compares booleans', () => {
            const result = true.compareTo(false);
            expect(result).toBe(1);
        });
    });
});


describe('Prototype Extensions', () => {
    describe('Number.compareTo', () => {
        test('compares numbers', () => {
            const result = (42).compareTo(24);
            expect(result).toBe(18);
        });
    });

    describe('String.compareTo', () => {
        test('compares strings', () => {
            const result = 'apple'.compareTo('banana');
            expect(result).toBe(-1);
        });
    });

    describe('Boolean.compareTo', () => {
        test('compares booleans', () => {
            const result = true.compareTo(false);
            expect(result).toBe(1);
        });
    });
});
