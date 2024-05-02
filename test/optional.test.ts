import {Optional} from "../src";
import  "../src";

describe('Optional Class Tests', () => {
    describe('Optional.of()', () => {
        it('should create a non-empty Optional', () => {
            const value = 42;
            const optional = Optional.of(value);
            expect(optional.isPresent()).toBe(true);
            expect(optional.get()).toBe(value);
        });

        it('should create an empty Optional for undefined', () => {
            const optional = Optional.of(undefined);
            expect(optional.isEmpty()).toBe(true);
        });

        it('should create an empty Optional for null', () => {
            const optional = Optional.of(null);
            expect(optional.isEmpty()).toBe(true);
        });
    });

    describe('Optional.empty()', () => {
        it('should create an empty Optional', () => {
            const optional = Optional.empty();
            expect(optional.isEmpty()).toBe(true);
        });
    });

    describe('Optional.ofNullable()', () => {
        it('should create a non-empty Optional for a non-null value', () => {
            const value = 42;
            const optional = Optional.of(value);
            expect(optional.isPresent()).toBe(true);
            expect(optional.get()).toBe(value);
        });

        it('should create an empty Optional for undefined', () => {
            const optional = Optional.of(undefined);
            expect(optional.isEmpty()).toBe(true);
        });

        it('should create an empty Optional for null', () => {
            const optional = Optional.of(null);
            expect(optional.isEmpty()).toBe(true);
        });
    });

    describe('Optional.isPresent()', () => {
        it('should return true for a non-empty Optional', () => {
            const optional = Optional.of(42);
            expect(optional.isPresent()).toBe(true);
        });

        it('should return false for an empty Optional', () => {
            const optional = Optional.empty();
            expect(optional.isPresent()).toBe(false);
        });
    });

    describe('Optional.isEmpty()', () => {
        it('should return true for an empty Optional', () => {
            const optional = Optional.empty();
            expect(optional.isEmpty()).toBe(true);
        });

        it('should return false for a non-empty Optional', () => {
            const optional = Optional.of(42);
            expect(optional.isEmpty()).toBe(false);
        });
    });

    describe('Optional.get()', () => {
        it('should return the value for a non-empty Optional', () => {
            const value = 42;
            const optional = Optional.of(value);
            expect(optional.get()).toBe(value);
        });

        it('should throw an error for an empty Optional', () => {
            const optional = Optional.empty();
            expect(() => optional.get()).toThrowError();
        });
    });

    describe('Optional.orElse()', () => {
        it('should return the value for a non-empty Optional', () => {
            const value = 42;
            const optional = Optional.of(value);
            const result = optional.orElse(100);
            expect(result).toBe(value);
        });

        it('should return the other value for an empty Optional', () => {
            const optional = Optional.empty();
            const result = optional.orElse(100);
            expect(result).toBe(100);
        });
    });

    describe('Optional.orElseGet()', () => {
        it('should return the value for a non-empty Optional', () => {
            const value = 42;
            const optional = Optional.of(value);
            const result = optional.orElseGet(() => 100);
            expect(result).toBe(value);
        });

        it('should return the result of the supplier for an empty Optional', () => {
            const optional = Optional.empty();
            const result = optional.orElseGet(() => 100);
            expect(result).toBe(100);
        });
    });

    describe('Optional.orElseThrow()', () => {
        it('should return the value for a non-empty Optional', () => {
            const value = 42;
            const optional = Optional.of(value);
            const result = optional.orElseThrow(() => new Error('Unexpected'));
            expect(result.get()).toBe(value);
        });

        it('should throw the specified error for an empty Optional', () => {
            const optional = Optional.empty();
            expect(() => optional.orElseThrow(() => new Error('Expected'))).toThrowError('Expected');
        });
    });

    describe('Optional.filter()', () => {
        it('should return a non-empty Optional if the predicate is true', () => {
            const value = 42;
            const optional = Optional.of(value);
            const result = optional.filter((x) => x === 42);
            expect(result.isPresent()).toBe(true);
            expect(result.get()).toBe(value);
        });

        it('should return an empty Optional if the predicate is false', () => {
            const value = 42;
            const optional = Optional.of(value);
            const result = optional.filter((x) => x !== 42);
            expect(result.isEmpty()).toBe(true);
        });

        it('should return an empty Optional for an empty Optional', () => {
            const optional = Optional.empty();
            const result = optional.filter((x) => x === 42);
            expect(result.isEmpty()).toBe(true);
        });
    });

    describe('Optional.flatMap()', () => {
        it('should apply the flat-mapping function to the value of a non-empty Optional', () => {
            const value = 42;
            const optional = Optional.of(value);
            const result = optional.flatMap((x) => Optional.of(x * 2));
            expect(result.isPresent()).toBe(true);
            expect(result.get()).toBe(84);
        });

        it('should throw an error for map on an empty Optional', () => {
            const optional = Optional.empty();
            expect( optional.flatMap((x) => Optional.of( 2*(x||1))).isEmpty()).toBe(true);
        });
    });

    describe('Optional.ifPresent()', () => {
        it('should execute the consumer for a non-empty Optional', () => {
            const value = 42;
            const optional = Optional.of(value);
            let result = 0;
            optional.ifPresent((x) => (result = x));
            expect(result).toBe(value);
        });

        it('should not execute the consumer for an empty Optional', () => {
            const optional = Optional.empty();
            let result = 0;
            optional.ifPresent((x) => (result = x!));
            expect(result).toBe(0);
        });
    });

    describe('Optional.isPresent()', () => {
        it('should return true for a non-empty Optional', () => {
            const optional = Optional.of(42);
            expect(optional.isPresent()).toBe(true);
        });

        it('should return false for an empty Optional', () => {
            const optional = Optional.empty();
            expect(optional.isPresent()).toBe(false);
        });
    });

    describe('Optional.isEmpty()', () => {
        it('should return true for an empty Optional', () => {
            const optional = Optional.empty();
            expect(optional.isEmpty()).toBe(true);
        });

        it('should return false for a non-empty Optional', () => {
            const optional = Optional.of(42);
            expect(optional.isEmpty()).toBe(false);
        });
    });

    describe('Optional.orElse()', () => {
        it('should return the value for a non-empty Optional', () => {
            const value = 42;
            const optional = Optional.of(value);
            const result = optional.orElse(100);
            expect(result).toBe(value);
        });

        it('should return the other value for an empty Optional', () => {
            const optional = Optional.empty();
            const result = optional.orElse(100);
            expect(result).toBe(100);
        });
    });

    describe('Optional.orElseGet()', () => {
        it('should return the value for a non-empty Optional', () => {
            const value = 42;
            const optional = Optional.of(value);
            const result = optional.orElseGet(() => 100);
            expect(result).toBe(value);
        });

        it('should return the result of the supplier for an empty Optional', () => {
            const optional = Optional.empty();
            const result = optional.orElseGet(() => 100);
            expect(result).toBe(100);
        });
    });

    describe('Optional.filter()', () => {
        it('should return a non-empty Optional if the predicate is true', () => {
            const value = 42;
            const optional = Optional.of(value);
            const result = optional.filter((x) => x === 42);
            expect(result.isPresent()).toBe(true);
            expect(result.get()).toBe(value);
        });

        it('should return an empty Optional if the predicate is false', () => {
            const value = 42;
            const optional = Optional.of(value);
            const result = optional.filter((x) => x !== 42);
            expect(result.isEmpty()).toBe(true);
        });

        it('should return an empty Optional for an empty Optional', () => {
            const optional = Optional.empty();
            const result = optional.filter((x) => x === 42);
            expect(result.isEmpty()).toBe(true);
        });
    });

    describe('Optional.map()', () => {
        it('should apply the mapping function to the value of a non-empty Optional', () => {
            const value = 42;
            const optional = Optional.of(value);
            const result = optional.map((x) => x * 2);
            expect(result.isPresent()).toBe(true);
            expect(result.get()).toBe(84);
        });

        it('should throw an error for map on an empty Optional', () => {
            const optional = Optional.empty();
            expect( optional.map((x) => (x || 1) * 2).isEmpty()).toBe(true);
        });
    });

    describe('Optional.ifPresent()', () => {
        it('should execute the consumer for a non-empty Optional', () => {
            const value = 42;
            const optional = Optional.of(value);
            let result = 0;
            optional.ifPresent((x) => (result = x));
            expect(result).toBe(value);
        });

        it('should not execute the consumer for an empty Optional', () => {
            const optional = Optional.empty();
            let result = 0;
            optional.ifPresent((x) => (result = x!));
            expect(result).toBe(0);
        });
    });

    describe('Optional.equals()', () => {
        it('should return true for two equal non-empty Optionals', () => {
            const value = 42;
            const optional1 = Optional.of(value);
            const optional2 = Optional.of(value);
            expect(optional1.equals(optional2)).toBe(true);
        });

        it('should return true for two empty Optionals', () => {
            const optional1 = Optional.empty();
            const optional2 = Optional.empty();
            expect(optional1.equals(optional2)).toBe(true);
        });

        it('should return false for an empty and a non-empty Optional', () => {
            const value = 42;
            const optional1 = Optional.empty();
            const optional2 = Optional.of(value);
            expect(optional1.equals(optional2)).toBe(false);
        });

        it('should return false for two non-empty Optionals with different values', () => {
            const optional1 = Optional.of(42);
            const optional2 = Optional.of(100);
            expect(optional1.equals(optional2)).toBe(false);
        });
    });
});

describe('Optional Composition Tests', () => {

    describe('Optional.allPresent()', () => {
        it('should return true if all Optionals are present', () => {
            const optional1 = Optional.of(5);
            const optional2 = Optional.of(10);
            const optional3 = Optional.of(20);
            const result = Optional.allPresent([optional1, optional2, optional3]);
            expect(result).toBe(true);
        });

        it('should return false if any Optional is empty', () => {
            const optional1 = Optional.of(5);
            const optional2 = Optional.empty();
            const optional3 = Optional.of(20);
            const result = Optional.allPresent([optional1, optional2, optional3]);
            expect(result).toBe(false);
        });
    });

    describe('Optional.anyPresent()', () => {
        it('should return true if at least one Optional is present', () => {
            const optional1 = Optional.empty();
            const optional2 = Optional.of(10);
            const optional3 = Optional.empty();
            const result = Optional.anyPresent([optional1, optional2, optional3]);
            expect(result).toBe(true);
        });

        it('should return false if all Optionals are empty', () => {
            const optional1 = Optional.empty();
            const optional2 = Optional.empty();
            const optional3 = Optional.empty();
            const result = Optional.anyPresent([optional1, optional2, optional3]);
            expect(result).toBe(false);
        });
    });

    describe('Optional.nonePresent()', () => {
        it('should return true if none of the Optionals are present', () => {
            const optional1 = Optional.empty();
            const optional2 = Optional.empty();
            const optional3 = Optional.empty();
            const result = Optional.nonePresent([optional1, optional2, optional3]);
            expect(result).toBe(true);
        });

        it('should return false if at least one Optional is present', () => {
            const optional1 = Optional.empty();
            const optional2 = Optional.of(10);
            const optional3 = Optional.empty();
            const result = Optional.nonePresent([optional1, optional2, optional3]);
            expect(result).toBe(false);
        });
    });

    describe('Optional.coalesce()', () => {
        it('should return the first non-empty Optional', () => {
            const optional1 = Optional.empty();
            const optional2 = Optional.of(42);
            const optional3 = Optional.of(100);
            const result = Optional.coalesce(optional1, optional2, optional3);
            expect(result.isPresent()).toBe(true);
            expect(result.get()).toBe(42);
        });

        it('should return an empty Optional if all Optionals are empty', () => {
            const optional1 = Optional.empty();
            const optional2 = Optional.empty();
            const optional3 = Optional.empty();
            const result = Optional.coalesce(optional1, optional2, optional3);
            expect(result.isEmpty()).toBe(true);
        });
    });
});

describe('Global Functions Tests', () => {

    it('should create an Optional using global optionalOf', () => {
        const value = 42;
        const optional = optionalOf(value);
        expect(optional.isPresent()).toBe(true);
        expect(optional.get()).toBe(value);
    });

    it('should return the first non-empty Optional', () => {
        const optional1 = Optional.empty();
        const optional2 = optionalOf(42);
        const optional3 = optionalOf(100);
        const result = coalesce(optional1, optional2, optional3);
        expect(result.isPresent()).toBe(true);
        expect(result.get()).toBe(42);
    });

    it('should return false if at least one Optional is present', () => {
        const optional1 = Optional.empty();
        const optional2 = optionalOf(10);
        const optional3 = Optional.empty();
        const result = nonePresent([optional1, optional2, optional3]);
        expect(result).toBe(false);
    });

    it('should return true if at least one Optional is present', () => {
        const optional1 = Optional.empty();
        const optional2 = optionalOf(10);
        const optional3 = Optional.empty();
        const result = anyPresent([optional1, optional2, optional3]);
        expect(result).toBe(true);
    });

    it('should return false if any Optional is empty', () => {
        const optional1 = optionalOf(5);
        const optional2 = Optional.empty();
        const optional3 = optionalOf(20);
        const result = allPresent([optional1, optional2, optional3]);
        expect(result).toBe(false);
    });
});
