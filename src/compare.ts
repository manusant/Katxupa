/**
 * Interface representing a comparable object that can be compared to another object of the same type.
 *
 * @interface Comparable
 * @template T - The type of objects being compared.
 *
 * @since version 1.4.0
 * @author Manuel Santos <ney.br.santos@gmail.com>
 */
export interface Comparable<T> {
    /**
     * Compares this object to another object of the same type.
     *
     * @param {T} other - The object to compare with.
     * @returns {number} A negative number if this object is less than the other,
     * zero if they are equal, or a positive number if this object is greater than the other.
     *
     * @example
     * const string1 = "apple";
     * const string2 = "banana";
     * const stringComparison = string1.compareTo(string2);
     * console.log(stringComparison); // Output: -1 (Example output; actual output will vary)
     *
     * @example
     * const number1 = 10;
     * const number2 = 5;
     * const numberComparison = number1.compareTo(number2);
     * console.log(numberComparison); // Output: 1 (Example output; actual output will vary)
     *
     * @example
     * const date1 = new Date("2023-01-01");
     * const date2 = new Date("2023-01-15");
     * const dateComparison = date1.compareTo(date2);
     * console.log(dateComparison); // Output: -1 (Example output; actual output will vary)
     */
    compareTo(other: T): number;
}

/**
 * Represents a generic comparator function for comparing two elements of the same type.
 *
 * @template T - The type of elements to compare.
 *
 * @since version 1.4.0
 * @author Manuel Santos <ney.br.santos@gmail.com>
 */
export interface Comparator<T> {

    /**
     * Compares two elements of type T and returns a number indicating their relative order.
     * - If `a` is less than `b`, a negative number is returned.
     * - If `a` is greater than `b`, a positive number is returned.
     * - If `a` is equal to `b`, 0 is returned.
     *
     * @param {T} a - The first element to compare.
     * @param {T} b - The second element to compare.
     * @returns {number} A negative, positive, or zero value indicating the comparison result.
     *
     * @example
     * const comparator: Comparator<number> = { compare: (a, b) => a - b };
     * console.log(comparator.compare(3, 5)); // Output: -2
     *
     * @example
     * const stringComparator: Comparator<string> = { compare: (a, b) => a.localeCompare(b) };
     * console.log(stringComparator.compare("apple", "banana")); // Output: -1
     */
    compare(a: T, b: T): number;
}

/**
 * Interface representing a comparator function that can be used to compare two objects.
 *
 * @interface Comparator
 * @template T - The type of objects being compared.
 *
 * @since version 1.4.0
 * @author Manuel Santos <ney.br.santos@gmail.com>
 */
export interface InlineComparator<T> {
    /**
     * Compares two objects of the same type.
     *
     * @param {T} a - The first object to compare.
     * @param {T} b - The second object to compare.
     * @returns {number} A negative number if `a` is less than `b`,
     * zero if they are equal, or a positive number if `a` is greater than `b`.
     *
     * @example
     * const stringComparator: InlineComparator<string> = (a, b) => a.localeCompare(b);
     * const stringComparison = stringComparator("apple", "banana");
     * console.log(stringComparison); // Output: -1 (Example output; actual output will vary)
     *
     * @example
     * const numberComparator: InlineComparator<number> = (a, b) => a - b;
     * const numberComparison = numberComparator(10, 5);
     * console.log(numberComparison); // Output: 5 (Example output; actual output will vary)
     *
     * @example
     * const dateComparator: InlineComparator<Date> = (a, b) => a.getTime() - b.getTime();
     * const dateComparison = dateComparator(new Date("2023-01-01"), new Date("2023-01-15"));
     * console.log(dateComparison); // Output: -1209600000 (Example output; actual output will vary)
     */
    (a: T, b: T): number;
}

/**
 * Represents a generic comparator function for comparing two elements of the same type.
 *
 * @template T - The type of elements to compare.
 *
 * @since version 1.4.0
 * @author Manuel Santos <ney.br.santos@gmail.com>
 */
export class Comparators<T> {

    /**
     * Creates a comparator function based on the provided comparison function.
     *
     * @param {function(T, T): number} comparisonFunction - A function that compares two elements. Should return a negative value if the first element is smaller,
     *                  a positive value if the first element is larger, or zero if they are equal.
     * @returns {Comparator<T>} A comparator instance for the given comparison function.
     *
     * @example
     * const compareNumbers = Comparators.comparing((a, b) => a - b);
     * console.log(compareNumbers(3, 5)); // Output: -2
     */
    static comparing<T>(comparisonFunction: (a: T, b: T) => number): Comparators<T> {
        return (a: T, b: T) => comparisonFunction(a, b);
    }
}
