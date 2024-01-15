import "../src";

describe('Object extensions', () => {
    it('should run the block and return its result using letIt', () => {
        const result = "Hello".letIt(value => {
            console.log(value.toUpperCase());
            return value.length;
        });
        expect(result).toBe(5);
    });

    it('should run the block with the receiver using runIt and return its result', () => {
        const result = "Hello".runIt(function () {
            console.log(this.toUpperCase());
            return this.length;
        });
        expect(result).toBe(5);
    });

    it('should run the block with the receiver and return this value using apply', () => {
        const obj = {prop1: 'value1', prop2: 'value2'};
        const result = obj.apply(function () {
            console.log(this.prop1);
            this.prop2 = 'modifiedValue';
        });
        expect(result).toEqual(obj);
        expect(obj.prop2).toBe('modifiedValue');
    });

    it('should run the block with the receiver and return this value using also', () => {
        const obj = {prop1: 'value1', prop2: 'value2'};
        const result = obj.also((it)=>{
            console.log(`Name: ${it.prop1}, Age: ${it.prop2}`);
        });
        expect(result).toEqual(obj);
    });

    it('should return the value if it satisfies the predicate using takeIf', () => {
        const value = "Hello";
        const result = value.takeIf(it => it.length > 0);
        expect(result).toBe(value);
    });

    it('should return undefined if the value does not satisfy the predicate using takeIf', () => {
        const value = "Hello";
        const result = value.takeIf(it => it.length === 0);
        expect(result).toBeUndefined();
    });

    it('should return the value if it does not satisfy the predicate using takeUnless', () => {
        const value = "Hello";
        const result = value.takeUnless(it => it.length === 0);
        expect(result).toBe(value);
    });

    it('should return undefined if the value satisfies the predicate using takeUnless', () => {
        const value = "Hello";
        const result = value.takeUnless(it => it.length > 0);
        expect(result).toBeUndefined();
    });
});