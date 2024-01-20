import "../src";

describe('Boolean extensions', () => {
    it('should run the block and return its result using letIt for Boolean', () => {
        const result = true.letIt(value => {
            console.log(value ? 'Yes' : 'No');
            return !value;
        });
        expect(result).toBe(false);
    });

    it('should run the block with the receiver using runIt and return its result for Boolean', () => {
        const result = true.runIt(function () {
            console.log(this ? 'Yes' : 'No');
            return !this;
        });
        expect(result).toBe(false);
    });

    it('should run the block with the receiver and return this value using applyIt for Boolean', () => {
        const bool = true;
        const result = bool.applyIt(function () {
            console.log(this ? 'Yes' : 'No');
        });
        expect(result).toBe(bool);
    });
});