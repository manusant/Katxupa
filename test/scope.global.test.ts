import "../src";

describe('Global extensions', () => {
    it('should run the block and return its result', () => {
        const result = runIt(() => 42);
        expect(result).toBe(42);
    });

    it('should run the block with the receiver and return its result', () => {
        const receiver = {x: 5, y: 10};
        const result = withIt(receiver, function () {
            console.log(this.x + this.y);
            return this.x * this.y;
        });
        expect(result).toBe(50);
    });
});