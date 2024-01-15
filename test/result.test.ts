import {Ok, Err} from "../src";
import "../src";

describe('Result class and utility functions', () => {
    describe('Result class', () => {
        it('should create an Ok instance', () => {
            const okInstance = Ok.ok('success value');
            expect(okInstance instanceof Ok).toBe(true);
            expect(okInstance.get()).toBe('success value');
        });

        it('should create an Err instance', () => {
            const errInstance = Err.error('error value');
            expect(errInstance instanceof Err).toBe(true);
            expect(() => errInstance.get()).toThrow('error value');
        });

        it('should map the success value using map method', () => {
            const okInstance = Ok.ok(5);
            const mappedResult = okInstance.map(value => value * 2);
            expect(mappedResult instanceof Ok).toBe(true);
            expect(mappedResult.get()).toBe(10);
        });

        it('should map the success value to a new Result using flatMap method', () => {
            const okInstance = Ok.ok(5);
            const mappedResult = okInstance.flatMap(value => Ok.ok(value * 2));
            expect(mappedResult instanceof Ok).toBe(true);
            expect(mappedResult.get()).toBe(10);
        });

        it('should map the error value using map method', () => {
            const errInstance = Err.error('original error');
            const mappedResult = errInstance.map(error => `Mapped: ${error}`);
            expect(mappedResult instanceof Err).toBe(true);
            expect(() => mappedResult.get()).toThrow('Mapped: original error');
        });

        it('should map the error value to a new Result using flatMap method', () => {
            const errInstance = Err.error('original error');
            const mappedResult = errInstance.flatMap(error => Err.error(`Mapped: ${error}`));
            expect(mappedResult instanceof Err).toBe(true);
            expect(() => mappedResult.get()).toThrow('Mapped: original error');
        });

        it('should not throw an error when calling throw method on an Ok instance', () => {
            const okInstance = Ok.ok('success value');
            expect(() => okInstance.get()).not.toThrow();
        });

        it('should convert an Ok result to Optional', () => {
            const okInstance = Ok.ok('success value');
            const optional = okInstance.toOptional();
            expect(optional.isPresent()).toBe(true);
            expect(optional.get()).toBe('success value');
        });

        it('should extract the value from an Ok instance', () => {
            const okInstance = Ok.ok('success value');
            const extraction = okInstance.extract();
            expect(extraction.value).toBe('success value');
            expect(extraction.error).toBeUndefined();
        });

        it('should map the error value using map method on Err instance', () => {
            const errInstance = Err.error('original error');
            const mappedResult = errInstance.map(error => `Mapped: ${error}`);
            expect(mappedResult instanceof Err).toBe(true);
            expect(() => mappedResult.get()).toThrow('Mapped: original error');
        });

        it('should map the error value to a new Result using flatMap method on Err instance', () => {
            const errInstance = Err.error('original error');
            const mappedResult = errInstance.flatMap(error => Err.error(`Mapped: ${error}`));
            expect(mappedResult instanceof Err).toBe(true);
            expect(() => mappedResult.get()).toThrow('Mapped: original error');
        });

        it('should throw the original error when calling throw method on Err instance', () => {
            const errInstance = Err.error('original error');
            expect(() => errInstance.throw()).toThrow('original error');
        });

        it('should convert an Err result to Optional', () => {
            const errInstance = Err.error('original error');
            const optional = errInstance.toOptional();
            expect(optional.isPresent()).toBe(true);
            expect(optional.get()).toBe('original error');
        });

        it('should throw the original error when calling get method on Err instance', () => {
            const errInstance = Err.error('original error');
            expect(() => errInstance.get()).toThrow('original error');
        });

        it('should extract the error from an Err instance', () => {
            const errInstance = Err.error('original error');
            const extraction = errInstance.extract();
            expect(extraction.value).toBeUndefined();
            expect(extraction.error).toBe('original error');
        });
    });

    describe('Utility functions', () => {
        it('should create an Ok result using ok utility function', () => {
            const result = ok('success value');
            expect(result instanceof Ok).toBe(true);
            expect(result.get()).toBe('success value');
        });

        it('should create an Err result using error utility function', () => {
            const result = error('original error');
            expect(result instanceof Err).toBe(true);
            expect(() => result.get()).toThrow('original error');
        });
    });
});
