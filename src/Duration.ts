/**
 * Represents a duration of time with support for various units (nanoseconds, microseconds, milliseconds, seconds, minutes, hours, and days).
 *
 * @example
 * // Example 1
 * const oneYearInMinutes = (1).years().toHours().toMinutes();
 *
 * console.log(`1 year is approximately ${oneYearInMinutes} minutes.`);
 *
 * // Example 2
 * const duration = (1).years().add((6).months()).toString();
 * console.log(duration); // Output: 548d 0h 0m 0s 0ns
 *
 * @since version 1.1.0
 * @author Manuel Santos <ney.br.santos@gmail.com>
 */
export class Duration {
    private readonly milliseconds: number;

    /**
     * Creates a new Duration object with the specified duration in milliseconds.
     * @param {number} milliseconds - The duration in milliseconds.
     * @example
     * const duration = new Duration(5000);
     */
    private constructor(milliseconds: number) {
        this.milliseconds = milliseconds;
    }

    /**
     * Creates a Duration object from a duration in nanoseconds.
     * @param {number} nanoseconds - The duration in nanoseconds.
     * @returns {Duration} A Duration object.
     * @example
     * const duration = Duration.nanoseconds(1e9);
     */
    static nanoseconds(nanoseconds: number): Duration {
        return new Duration(nanoseconds / 1e6); // Convert nanoseconds to milliseconds
    }

    /**
     * Creates a Duration object from a duration in microseconds.
     * @param {number} microseconds - The duration in microseconds.
     * @returns {Duration} A Duration object.
     * @example
     * const duration = Duration.microseconds(5000000);
     */
    static microseconds(microseconds: number): Duration {
        return new Duration(microseconds * 1e3); // Convert microseconds to milliseconds
    }

    /**
     * Creates a Duration object from a duration in milliseconds.
     * @param {number} milliseconds - The duration in milliseconds.
     * @returns {Duration} A Duration object.
     * @example
     * const duration = Duration.milliseconds(5000);
     */
    static milliseconds(milliseconds: number): Duration {
        return new Duration(milliseconds);
    }

    /**
     * Creates a Duration object from a duration in seconds.
     * @param {number} seconds - The duration in seconds.
     * @returns {Duration} A Duration object.
     * @example
     * const duration = Duration.seconds(60);
     */
    static seconds(seconds: number): Duration {
        return new Duration(seconds * 1e3); // Convert seconds to milliseconds
    }

    /**
     * Creates a Duration object from a duration in minutes.
     * @param {number} minutes - The duration in minutes.
     * @returns {Duration} A Duration object.
     * @example
     * const duration = Duration.minutes(60);
     */
    static minutes(minutes: number): Duration {
        return new Duration(minutes * 6e4); // Convert minutes to milliseconds
    }

    /**
     * Creates a Duration object from a duration in hours.
     * @param {number} hours - The duration in hours.
     * @returns {Duration} A Duration object.
     * @example
     * const duration = Duration.hours(24);
     */
    static hours(hours: number): Duration {
        return new Duration(hours * 3.6e6); // Convert hours to milliseconds
    }

    /**
     * Creates a Duration object from a duration in days.
     * @param {number} days - The duration in days.
     * @returns {Duration} A Duration object.
     * @example
     * const duration = Duration.days(7);
     */
    static days(days: number): Duration {
        return new Duration(days * 8.64e7); // Convert days to milliseconds
    }

    /**
     * Converts the duration to seconds.
     * @returns {number} The duration in seconds.
     * @example
     * const duration = Duration.fromMinutes(2);
     * const seconds = duration.inWholeSeconds();
     * console.log(seconds);
     * // Output: 120
     */
    inWholeSeconds(): number {
        return this.milliseconds / 1000;
    }

    /**
     * Converts the duration to minutes.
     * @returns {number} The duration in minutes.
     * @example
     * const duration = Duration.fromHours(2);
     * const minutes = duration.inWholeMinutes();
     * console.log(minutes);
     * // Output: 120
     */
    inWholeMinutes(): number {
        return this.milliseconds / (1000 * 60);
    }

    /**
     * Converts the duration to hours.
     * @returns {number} The duration in hours.
     * @example
     * const duration = Duration.fromDays(1);
     * const hours = duration.inWholeHours();
     * console.log(hours);
     * // Output: 24
     */
    inWholeHours(): number {
        return this.milliseconds / (1000 * 60 * 60);
    }

    /**
     * Converts the duration to days.
     * @returns {number} The duration in days.
     * @example
     * const duration = Duration.fromHours(48);
     * const days = duration.inWholeDays();
     * console.log(days);
     * // Output: 2
     */
    inWholeDays(): number {
        return this.milliseconds / (1000 * 60 * 60 * 24);
    }

    /**
     * Converts the duration to an object with properties for each time unit.
     * @returns {Object} An object with properties for nanoseconds, microseconds, milliseconds, seconds, minutes, hours, and days.
     * @example
     * const duration = Duration.fromSeconds(123);
     * const durationObject = duration.toObject();
     * console.log(durationObject);
     * // Output: { nanoseconds: 123000000000, microseconds: 123000000, milliseconds: 123000, seconds: 123, minutes: 2, hours: 0, days: 0 }
     */
    toObject(): {
        nanoseconds: number,
        microseconds: number,
        milliseconds: number,
        seconds: number,
        minutes: number,
        hours: number,
        days: number
    } {
        const nanoseconds = this.milliseconds * 1e6;
        const microseconds = this.milliseconds * 1e3;
        const seconds = this.inWholeSeconds();
        const minutes = this.inWholeMinutes();
        const hours = this.inWholeHours();
        const days = this.inWholeDays();

        return {nanoseconds, microseconds, milliseconds: this.milliseconds, seconds, minutes, hours, days};
    }

    /**
     * Adds another duration to this duration.
     * @param {Duration} other - The other duration to add.
     * @returns {Duration} A new Duration object representing the sum.
     * @example
     * const duration1 = Duration.fromHours(12);
     * const duration2 = Duration.fromMinutes(30);
     * const sum = duration1.add(duration2);
     * console.log(sum.toMinutes());
     * // Output: 750
     */
    add(other: Duration): Duration {
        return new Duration(this.milliseconds + other.milliseconds);
    }

    /**
     * Subtracts another duration from this duration.
     * @param {Duration} other - The other duration to subtract.
     * @returns {Duration} A new Duration object representing the difference.
     * @example
     * const duration1 = Duration.fromHours(12);
     * const duration2 = Duration.fromMinutes(30);
     * const difference = duration1.subtract(duration2);
     * console.log(difference.toMinutes());
     * // Output: 630
     */
    subtract(other: Duration): Duration {
        return new Duration(this.milliseconds - other.milliseconds);
    }

    /**
     * Multiplies this duration by a scalar factor.
     * @param {number} factor - The scalar factor.
     * @returns {Duration} A new Duration object representing the product.
     * @example
     * const duration = Duration.fromMinutes(10);
     * const multiplied = duration.multiply(2);
     * console.log(multiplied.toMinutes());
     * // Output: 20
     */
    multiply(factor: number): Duration {
        return new Duration(this.milliseconds * factor);
    }

    /**
     * Divides this duration by a scalar divisor.
     * @param {number} divisor - The scalar divisor.
     * @returns {Duration} A new Duration object representing the quotient.
     * @throws {Error} Thrown if the divisor is zero.
     * @example
     * const duration = Duration.fromHours(1);
     * const divided = duration.divide(2);
     * console.log(divided.toMinutes());
     * // Output: 30
     */
    divide(divisor: number): Duration {
        if (divisor === 0) {
            throw new Error("Cannot divide by zero.");
        }
        return new Duration(this.milliseconds / divisor);
    }

    /**
     * Checks if this duration is equal to another duration.
     * @param {Duration} other - The other duration to compare.
     * @returns {boolean} True if the durations are equal, false otherwise.
     * @example
     * const duration1 = Duration.fromHours(5);
     * const duration2 = Duration.fromHours(5);
     * console.log(duration1.equals(duration2)); // Output: true
     */
    equals(other: Duration): boolean {
        return this.milliseconds === other.milliseconds;
    }

    /**
     * Compares this duration with another duration.
     * @param {Duration} other - The other duration to compare.
     * @returns {number} -1 if this duration is less than the other, 0 if they are equal, 1 if this duration is greater.
     * @example
     * const duration1 = Duration.fromDays(1);
     * const duration2 = Duration.fromHours(24);
     * console.log(duration1.compareTo(duration2)); // Output: 0
     */
    compareTo(other: Duration): number {
        return this.milliseconds - other.milliseconds;
    }

    /**
     * Splits this duration into days, hours, minutes, seconds, and nanoseconds and executes the given action with these components.
     * The result of the action is returned.
     * @param action - The action to be executed with the duration components.
     * @returns The result of the action.
     * @example
     * const duration = Duration.fromSeconds(3600);
     * const result = duration.toComponents((days, hours, minutes, seconds, nanoseconds) => {
     *     return `${days}d ${hours}h ${minutes}m ${seconds}s ${nanoseconds}ns`;
     * });
     * console.log(result);
     * // Output: 0d 1h 0m 0s 0ns
     */
    toComponents<T>(action: (days: number, hours: number, minutes: number, seconds: number, nanoseconds: number) => T): T {
        const totalMilliseconds = this.milliseconds;
        const millisecondsPerSecond = 1000;
        const secondsPerMinute = 60;
        const minutesPerHour = 60;
        const hoursPerDay = 24;
        const millisecondsPerDay = millisecondsPerSecond * secondsPerMinute * minutesPerHour * hoursPerDay;

        const days = Math.floor(totalMilliseconds / millisecondsPerDay);
        const remainingMilliseconds = totalMilliseconds % millisecondsPerDay;
        const hours = Math.floor(remainingMilliseconds / (millisecondsPerSecond * secondsPerMinute * minutesPerHour));
        const minutes = Math.floor(remainingMilliseconds / (millisecondsPerSecond * secondsPerMinute)) % minutesPerHour;
        const seconds = Math.floor(remainingMilliseconds / millisecondsPerSecond) % secondsPerMinute;
        const nanoseconds = Math.floor((remainingMilliseconds % millisecondsPerSecond) * 1e6);

        return action(days, hours, minutes, seconds, nanoseconds);
    }

    /**
     * Formats the duration as a string.
     * @returns {string} - The formatted string representation of the duration.
     * @example
     * const duration = Duration.fromDays(1).add(Duration.fromHours(6));
     * const formattedString = duration.toString();
     * console.log(formattedString);
     * // Output: 1d 6h 0m 0s 0ns
     */
    toString(): string {
        return this.toComponents((days, hours, minutes, seconds, nanoseconds) => {
            return `${days}d ${hours}h ${minutes}m ${seconds}s ${nanoseconds}ns`;
        });
    }
}

declare global {

    /**
     * Creates a Duration object from a duration in milliseconds.
     *
     * @param {number} milliseconds - The duration in milliseconds.
     * @returns {Duration} A Duration object.
     *
     * @example
     * const duration = durationOf(5000);
     * console.log(duration.toSeconds()); // Output: 5
     */
    function durationOf(milliseconds: number): Duration;

    interface Number {

        /**
         * Creates a Duration object representing the specified number of years (assuming 365 days per year).
         * @returns {Duration} A Duration object.
         * @example
         * const duration = (2).years(); // Represents 2 years (assuming 730 days)
         */
        years(): Duration;

        /**
         * Creates a Duration object representing the specified number of months (assuming 30 days per month).
         * @returns {Duration} A Duration object.
         * @example
         * const duration = (2).months(); // Represents 2 months (assuming 60 days)
         */
        months(): Duration;

        /**
         * Creates a Duration object representing the specified number of days.
         * @returns {Duration} A Duration object.
         * @example
         * const duration = (3).days(); // Represents 3 days
         */
        days(): Duration;

        /**
         * Creates a Duration object representing the specified number of hours.
         * @returns {Duration} A Duration object.
         * @example
         * const duration = (1).hours(); // Represents 1 hour
         */
        hours(): Duration;

        /**
         * Creates a Duration object representing the specified number of minutes.
         * @returns {Duration} A Duration object.
         * @example
         * const duration = (2).minutes(); // Represents 2 minutes
         */
        minutes(): Duration;

        /**
         * Creates a Duration object representing the specified number of seconds.
         * @returns {Duration} A Duration object.
         * @example
         * const duration = (5).seconds(); // Represents 5 seconds
         */
        seconds(): Duration;

        /**
         * Creates a Duration object representing the specified number of milliseconds.
         * @returns {Duration} A Duration object.
         * @example
         * const duration = (300).milliseconds(); // Represents 300 milliseconds
         */
        milliseconds(): Duration;
    }
}

// Global extensions
const _global = (window /* browser */ || globalThis /* node */);

_global.durationOf = function (milliseconds: number): Duration {
    return Duration.microseconds(milliseconds);
}

Number.prototype.seconds = function () {
    return Duration.seconds(this.valueOf());
};

Number.prototype.minutes = function () {
    return Duration.minutes(this.valueOf());
};

Number.prototype.hours = function () {
    return Duration.hours(this.valueOf());
};

Number.prototype.milliseconds = function () {
    return Duration.milliseconds(this.valueOf());
};

Number.prototype.days = function () {
    return Duration.days(this.valueOf());
};

Number.prototype.months = function () {
    // Assuming each month has 30 days
    const daysInMonth = 30;
    const totalDays = this.valueOf() * daysInMonth;
    return Duration.days(totalDays);
};

Number.prototype.years = function () {
    // Assuming each year has 365 days
    const daysInYear = 365;
    const totalDays = this.valueOf() * daysInYear;
    return Duration.days(totalDays);
};