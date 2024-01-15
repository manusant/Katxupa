import "../src";

describe('String extensions', () => {
    it('should run the block and return its result using letIt for String', () => {
        const result = "Hello".letIt(it => {
            console.log(it.toUpperCase());
            return it.length;
        });
        expect(result).toBe(5);
    });

    it('should run the block with the receiver using runIt and return its result for String', () => {
        const result = "Hello".runIt(function () {
            console.log(this.toUpperCase());
            return this.length;
        });
        expect(result).toBe(5);
    });

    it('should run the block with the receiver and return this value using apply for String', () => {
        const str = "Hello";
        const result = str.apply(function () {
            console.log(this.toLowerCase());
        });
        expect(result).toBe(str);
    });
});
