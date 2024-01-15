import {Left, Right} from "../src";
import  "../src";

describe('Either class and utility functions', () => {
    describe('Either class', () => {
        it('should create a Left instance', () => {
            const leftInstance = Left.left('left value');
            expect(leftInstance instanceof Left).toBe(true);
            expect(leftInstance.get()).toBe('left value');
        });

        it('should create a Right instance', () => {
            const rightInstance = Right.right('right value');
            expect(rightInstance instanceof Right).toBe(true);
            expect(rightInstance.get()).toBe('right value');
        });
    });

    describe('Utility functions', () => {
        it('should create an Either with a left value using left utility function', () => {
            const either = left('left value');
            expect(either instanceof Left).toBe(true);
            expect(either.get()).toBe('left value');
        });

        it('should create an Either with a right value using right utility function', () => {
            const either = right('right value');
            expect(either instanceof Right).toBe(true);
            expect(either.get()).toBe('right value');
        });

        it('should fold an Either and apply the onLeft function for a Left instance', () => {
            const either = left('left value');
            const result = fold(either, (leftValue) => `Left: ${leftValue}`, (rightValue) => `Right: ${rightValue}`);
            expect(result).toBe('Left: left value');
        });

        it('should fold an Either and apply the onRight function for a Right instance', () => {
            const either = right('right value');
            const result = fold(either, (leftValue) => `Left: ${leftValue}`, (rightValue) => `Right: ${rightValue}`);
            expect(result).toBe('Right: right value');
        });
    });
});
