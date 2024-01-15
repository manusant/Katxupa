/**
 * Represents a value that can be either of type L (left) or R (right).
 *
 * @template L - The type of the left value.
 * @template R - The type of the right value.
 *
 * @example
 * const either1: Either<string, number> = left("Error message");
 * const either2: Either<string, number> = right(42);
 *
 * const result1 = fold(
 *     either1,
 *     (errorMessage) => `Error: ${errorMessage}`,
 *     (value) => `Success: ${value}`
 * ); // "Error: Error message"
 *
 * const result2 = fold(
 *     either2,
 *     (errorMessage) => `Error: ${errorMessage}`,
 *     (value) => `Success: ${value}`
 * ); // "Success: 42"
 *
 * @since version 1.3.0
 * @author Manuel Santos <ney.br.santos@gmail.com>
 */
export type Either<L, R> = Left<L> | Right<R>;

abstract class Value<V> {
    protected constructor(readonly value: V) {
    }

    /**
     * Retrieves the value.
     * @returns {V} - The value.
     */
    get(): V {
        return this.value;
    }
}

/**
 * Represents the left side of an Either (result type).
 * @template L - The type of the left value.
 */
export class Left<L> extends Value<L> {
    constructor(readonly value: L) {
        super(value);
    }

    /**
     * Creates a Left instance with the specified left value.
     * @template L - The type of the left value.
     * @param {L} value - The left value.
     * @returns {Left<L>} - A Left instance.
     */
    static left<L>(value: L): Left<L> {
        return new Left(value);
    }
}

/**
 * Represents the right side of an Either (result type).
 * @template R - The type of the right value.
 */
export class Right<R> extends Value<R> {
    constructor(readonly value: R) {
        super(value);
    }

    /**
     * Creates a Right instance with the specified right value.
     * @template R - The type of the right value.
     * @param {R} value - The right value.
     * @returns {Right<R>} - A Right instance.
     */
    static right<R>(value: R): Right<R> {
        return new Right(value);
    }
}

declare global {

    /**
     * Utility function to create an Either with a left value.
     * @template L - The type of the left value.
     * @param {L} value - The left value.
     * @returns {Either<L, never>} - An Either with a left value.
     */
    function left<L>(value: L): Either<L, never>;

    /**
     * Utility function to create an Either with a right value.
     * @template R - The type of the right value.
     * @param {R} value - The right value.
     * @returns {Either<never, R>} - An Either with a right value.
     */
    function right<R>(value: R): Either<never, R>;

    /**
     * Utility function to handle both left and right cases of an Either.
     * @template L - The type of the left value.
     * @template R - The type of the right value.
     * @template U - The type of the result.
     * @param {Either<L, R>} either - The Either to fold.
     * @param {function(L): U} onLeft - The function to apply if the Either is left.
     * @param {function(R): U} onRight - The function to apply if the Either is right.
     * @returns {U} - The result of applying the appropriate function.
     */
    function fold<L, R, U>(either: Either<L, R>, onLeft: (leftValue: L) => U, onRight: (rightValue: R) => U): U
}

// Global extensions
const _global = typeof window !== 'undefined' ? window : globalThis;

_global.left = function <L>(value: L): Either<L, never> {
    return Left.left(value);
}

_global.right = function <R>(value: R): Either<never, R> {
    return Right.right(value);
}

_global.fold = function fold<L, R, U>(
    either: Either<L, R>,
    onLeft: (leftValue: L) => U,
    onRight: (rightValue: R) => U
): U {
    if (either instanceof Left) {
        return onLeft(either.get());
    } else {
        return onRight(either.get());
    }
}
