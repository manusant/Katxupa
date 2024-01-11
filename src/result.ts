import {Optional} from "./optional";

/**
 * Represents the result of an operation that can either succeed with a value or fail with an error.
 *
 * @template T - The type of the success value.
 * @template E - The type of the error value.
 *
 * @example
 * const orResult: Result<number, string> = ok(42);
 * const errorResult: Result<number, string> = error("An error occurred");
 *
 * orResult.get(); // Returns 42
 * errorResult.get(); // Throws Error("An error occurred")
 *
 * orResult.extract(); // Returns {value: 42}
 * errorResult.extract(); // Returns {error: "An error occurred"}
 *
 * orResult.toOptional(); // Optional with value 42
 * errorResult.toOptional(); // Optional with no value
 *
 * @since version 1.2.0
 * @author Manuel Santos <ney.br.santos@gmail.com>
 */
export type Result<T, E extends string | Error> = Ok<T> | Err<E>;

/**
 * Represents the successful outcome of an operation with a value.
 * @template T - The type of the success value.
 */
export class Ok<T> {
    constructor(readonly value: T) {
    }

    /**
     * Maps the success value to a new value.
     * @template U - The type of the new value.
     * @param {(value: T) => U} mapper - A function to transform the success value.
     * @returns {Result<U, never>} - A new Result with the transformed value.
     */
    map<U>(mapper: (value: T) => U): Result<U, never> {
        return new Ok(mapper(this.value));
    }

    /**
     * Maps the success value to a new Result.
     * @template U - The type of the success value of the new Result.
     * @param {(value: T) => Result<U, any>} mapper - A function to transform the success value.
     * @returns {Result<U, never>} - A new Result with the transformed value.
     */
    flatMap<U>(mapper: (value: T) => Result<U, never>): Result<U, never> {
        return mapper(this.value);
    }

    /**
     * Converts the Ok result to an Optional with the success value.
     * @returns {Optional<T>} - An Optional containing the success value.
     */
    toOptional(): Optional<T> {
        return Optional.of(this.value);
    }

    /**
     * Retrieves the value or throws an error if the result is an Err.
     * @returns {T} - The success value.
     * @throws The error value if the result is an Err.
     */
    get(): T {
        return this.value;
    }

    /**
     * Extract the value or plain error from a Result.
     *
     * @template T - The type of the success value.
     * @template E - The type of the error value (must be string or instance of Error).
     *
     * @returns {{ value?: T, error?: E }} - An object with the value or error property set.
     */
    extract<E extends string | Error>(): { value?: T, error?: E } {
        return {value: this.value};
    }

    /**
     * Creates an Ok result with the specified value.
     * @template T - The type of the success value.
     * @param {T} value - The success value.
     * @returns {Ok<T>} - An Ok result.
     */
    static ok<T>(value: T): Ok<T> {
        return new Ok(value);
    }
}

/**
 * Represents the failure outcome of an operation with an error.
 * @template E - The type of the error value.
 */
export class Err<E extends string | Error> {
    constructor(readonly error: E) {
    }

    /**
     * Maps the error value to a new error value.
     * @template F - The type of the new error value.
     * @param {(error: E) => F} mapper - A function to transform the error value.
     * @returns {Result<never, F>} - A new Result with the transformed error value.
     */
    map<F extends string | Error>(mapper: (error: E) => F): Result<never, F> {
        return new Err<F>(mapper(this.error));
    }

    /**
     * Maps the error value to a new Result.
     * @template F - The type of the error value of the new Result.
     * @param {(error: E) => Result<never, F>} mapper - A function to transform the error value.
     * @returns {Result<never, F>} - A new Result with the transformed error value.
     */
    flatMap<F extends string | Error>(mapper: (error: E) => Result<never, F>): Result<never, F> {
        return mapper(this.error);
    }

    /**
     * Retrieves the error value or throws an error if the result is an Ok.
     * @returns {E} - The error value.
     * @throws The success value if the result is an Ok.
     */
    throw(): E {
        if (this.error instanceof Error) {
            throw this.error;
        } else {
            throw new Error(this.error as string);
        }
    }

    /**
     * Converts the Err result to an Optional with the error value.
     * @returns {Optional<E>} - An Optional containing the error value.
     */
    toOptional(): Optional<E> {
        return Optional.of(this.error);
    }

    /**
     * Retrieves the value or throws an error if the result is an Err.
     * @returns {T} - The success value.
     * @throws The error value if the result is an Err.
     */
    get<T>(): T {
        if (this.error instanceof Error) {
            throw this.error;
        } else {
            throw new Error(this.error as string);
        }
    }

    /**
     * Extract the value or plain error from a Result.
     *
     * @template T - The type of the success value.
     * @template E - The type of the error value (must be string or instance of Error).
     *
     * @returns {{ value?: T, error?: E }} - An object with the value or error property set.
     */
    extract<T>(): { value?: T, error: E } {
        return {error: this.error};
    }

    /**
     * Creates an Err result with the specified error value.
     * @template E - The type of the error value.
     * @param {E} error - The error value.
     * @returns {Err<E>} - An Err result.
     */
    static error<E extends string | Error>(error: E): Err<E> {
        return new Err(error);
    }
}

declare global {

    /**
     * Creates an Ok result with the specified value.
     * @template T - The type of the success value.
     * @param {T} value - The success value.
     * @returns {Ok<T>} - An Ok result.
     */
    function ok<T>(value: T): Ok<T>;

    /**
     * Creates an Err result with the specified error value.
     * @template E - The type of the error value.
     * @param {E} error - The error value.
     * @returns {Err<E>} - An Err result.
     */
    function error<E extends string | Error>(error: E): Err<E>;
}

// Global extensions
const _global = (window /* browser */ || globalThis /* node */);

_global.ok = function <T>(value: T): Ok<T> {
    return Ok.ok(value);
}

_global.error = function <E extends string | Error>(error: E): Err<E> {
    return Err.error(error);
}