import "../src";

describe('Number extensions', () => {
    it('should run the block and return its result using letIt for Number', () => {
        const result = (5).letIt(value => {
            console.log(value * 2);
            return value + 3;
        });
        result.hours()
        expect(result).toBe(8);
    });

    it('should run the block with the receiver using runIt and return its result for Number', () => {
        const result = (5).runIt(function () {
            console.log(this * 2);
            return this + 3;
        });
        expect(result).toBe(8);
    });

    it('should run the block with the receiver and return this value using applyIt for Number', () => {
        const num = 5;
        const result = num.applyIt(function () {
            console.log(this * 2);
        });
        expect(result).toBe(num);
    });
});