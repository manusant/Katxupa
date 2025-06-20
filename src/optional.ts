/**
 * The Optional class is a utility class that provides a way to handle potentially null or undefined values in a more
 * concise and expressive manner. It allows wrapping a value in an Optional object, which can then be used to perform
 * various operations on the value, such as checking if it is present, retrieving it, applying transformations,
 * and handling empty values.
 *
 * @since version 1.0.2
 * @author Manuel Santos <ney.br.santos@gmail.com>
 * */
export class Optional<T> {
    private readonly value: T | undefined | null;

    private constructor(value: T | undefined | null) {
        this.value = value;
    }

    /**
     * The of method is a static method that creates a new Optional object with a specified value.
     * It is used to wrap a value in an Optional object, allowing for more concise and expressive code when dealing with
     * potentially null or undefined values
     *
     * @param value (generic type) - The value to be wrapped in the Optional object. It can be of any type, including undefined or null.
     * @return a new Optional object containing the specified value.
     * */
    static of<T>(value: T | undefined | null): Optional<T> {
        return new Optional<T>(value);
    }

    /**
     * The empty method  is a static method that returns an empty Optional object. It is used to
     * create an Optional object with no value.
     *
     * @return an empty Optional object.
     * */
    static empty<R>(): Optional<R> {
        return Optional.of<R>(undefined);
    }

    /**
     * The allPresent method checks if all the elements in an array of Optional objects are present.
     *
     * ### Example Usage
     * ```ts
     * onst optional1 = Optional.of(5);
     * const optional2 = Optional.of(10);
     * const optional3 = Optional.empty();
     *
     * const optionals = [optional1, optional2, optional3];
     *
     * const result = Optional.allPresent(optionals);
     * console.log(result); // Output: false
     * ```
     *
     * @param optionals - An array of Optional objects.
     * @return true if all the Optional objects in the array have a non-empty value. false if any of the Optional objects in the array have an empty value.
     * */
    static allPresent<T>(optionals: Optional<T>[]): boolean {
        return optionals.every(optional => optional.isPresent());
    }

    /**
     * Checks if at least one Optional object in an array is present.
     *
     * @param {Optional<T>[]} optionals - An array of Optional objects.
     * @return {boolean} Returns true if at least one Optional object in the array is present, false otherwise.
     *
     * @example
     * // Example Usage:
     * const optional1 = Optional.of(5);
     * const optional2 = Optional.empty();
     * const optional3 = Optional.of(10);
     *
     * const optionals = [optional1, optional2, optional3];
     *
     * const result = Optional.anyPresent(optionals);
     * console.log(result); // true
     */
    static anyPresent<T>(optionals: Optional<T>[]): boolean {
        return optionals.some(optional => optional.isPresent());
    }

    /**
     * The nonePresent method checks if none of the Optional objects in the array are present.
     *
     * @param optionals An array of Optional objects.
     * @return Returns true if none of the Optional objects in the array are present, otherwise returns false.
     *
     * @example
     * // Example 1: All Optionals have values
     * const optionalsWithValues = [Optional.of("Hello"), Optional.of("World")];
     * const areNonePresent1 = Optional.nonePresent(optionalsWithValues);
     * console.log(areNonePresent1); // false (both Optionals have values)
     *
     * @example
     * // Example 2: All Optionals are empty
     * const optionalsWithEmptyValues = [Optional.empty(), Optional.empty()];
     * const areNonePresent2 = Optional.nonePresent(optionalsWithEmptyValues);
     * console.log(areNonePresent2); // true (both Optionals are empty)
     *
     * @example
     * // Example 3: At least one Optional has a value
     * const mixedOptionals = [Optional.of("Hello"), Optional.empty()];
     * const areNonePresent3 = Optional.nonePresent(mixedOptionals);
     * console.log(areNonePresent3); // false (at least one Optional has a value)
     */
    static nonePresent<T>(optionals: Optional<T>[]): boolean {
        return optionals.every(optional => optional.isEmpty());
    }

    /**
     * The coalesce method returns the first non-empty optional from a list of optionals, or an empty optional if all optionals are empty.
     *
     * ### Example Usage
     * ```ts
     *     const optional1 = Optional.of(5);
     * const optional2 = Optional.empty();
     * const optional3 = Optional.of(10);
     *
     * const result = Optional.coalesce(optional1, optional2, optional3);
     * console.log(result.get()); // Output: 5
     * ```
     *
     * @param optionals - A spread parameter that accepts a variable number of Optional objects
     * @return Returns the first non-empty optional from the list of optionals, or an empty optional if all optionals are empty.
     * */
    static coalesce<T>(...optionals: Optional<T>[]): Optional<T> {
        for (const optional of optionals) {
            if (optional.isPresent()) {
                return optional;
            }
        }
        return Optional.empty();
    }

    /**
     * The isPresent method  is used to check if the value inside the Optional object is present or not.
     *
     * @return a boolean value indicating whether the value inside the Optional object is present (true) or not (false).
     * */
    isPresent(): boolean {
        return !this.isEmpty();
    }

    /**T
     * he ifPresent method  is used to execute a specified action if the value inside the Optional
     * object is present.
     *
     * @param consumer (function) - A callback function that takes the value of type T inside the Optional object and performs an action.
     * */
    ifPresent(consumer: (value: T) => void): void {
        if (this.isPresent()) {
            consumer(this.value!);
        }
    }

    /**
     * The ifPresentThrow checks if a value is present and throws an error if it is.
     *
     * @param errorProvider - A function that returns an Error object.
     * */
    ifPresentThrow(errorProvider: () => Error): void{
        if (this.isPresent()) {
            throw errorProvider();
        }
    }

    /**
     * Executes a provided predicate function on the wrapped value and throws an error if the predicate returns true.
     *
     * @template T - The type of the wrapped value.
     * @param {(value: T) => boolean} predicate - A function that takes the wrapped value and returns a boolean.
     *     If true, an error will be thrown.
     * @param {() => Error} errorProvider - A function that provides the error to be thrown if the predicate is true.
     * @returns {Optional<T>} - The current Optional instance.
     * @throws {Error} - Throws an error provided by the errorProvider if the predicate is true.
     * @throws {Error} - Throws an error if called on an empty Optional.
     * @example
     * const optional = Optional.of(42);
     * optional.ifThrow((value) => value < 0, () => new Error("Value must be non-negative"));
     * // If the wrapped value is negative, it throws an error with the specified message.
     *
     * @example
     * const emptyOptional = Optional.empty();
     * emptyOptional.ifThrow(() => false, () => new Error("This will not be executed"));
     * // Throws an error since ifThrow cannot be called on an empty Optional.
     */
    ifThrow(predicate: (value: T) => boolean, errorProvider: () => Error): Optional<T> {
        this.ifEmptyThrow(() => new Error("'ifThrow' can only be called for non empty optionals"));
        if (predicate(this.value!)) {
            throw errorProvider();
        }
        return this;
    }

    /**
     * Applies a predicate function to the wrapped value and returns an Optional containing the result of applying
     * the mapper function if the predicate returns true, otherwise returns the current Optional.
     *
     * @template U - The type of the value returned by the mapper function.
     * @param {(value: T) => boolean} predicate - A function that takes the wrapped value and returns a boolean.
     *     If true, the mapper function will be applied.
     * @param {(value: T) => U} mapper - A function that takes the wrapped value and returns a new value of type U.
     * @returns {Optional<U | T>} - An Optional containing the result of applying the mapper function if the predicate
     *     returns true, otherwise returns the current Optional.
     *
     * @example
     * const optional = Optional.of(42);
     * const newOptional = optional.if((value) => value > 10, (value) => value * 2);
     * // If the wrapped value is greater than 10, returns an Optional containing the result of doubling the value.
     * // Otherwise, returns the original Optional.
     *
     * @example
     * const emptyOptional = Optional.empty();
     * emptyOptional.if(() => false, (value) => value * 2);

     */
    if<U>(predicate: (value: T) => boolean, mapper: (value: T) => U): Optional<U | T> {
        if (!this.isEmpty()) {
            if (predicate(this.value!)) {
                return Optional.of(mapper(this.value!));
            }
            return this;
        }
        return Optional.empty();
    }

    async ifAsync<U>(predicate: (value: T) => Promise<boolean>, mapper: (value: T) => U): Promise<Optional<U | T>> {
        if (!this.isEmpty()) {
            if (await predicate(this.value!)) {
                return Optional.of(mapper(this.value!));
            }
            return this;
        }
        return Optional.empty();
    }


    /**
     * The get method  is used to retrieve the value inside the Optional object. If the Optional
     * object is empty, it throws an error indicating that the value is not present.
     *
     * @return The value inside the Optional object if it is present.
     * Throws an error with the message "Value is not present" if the Optional object is empty.
     * */
    get(): T {
        if (this.isEmpty()) {
            throw new Error("Value is not present");
        }
        return this.value!;
    }

    /**
     * Raw is used to retrieve the value inside the Optional object.
     *
     * @return The value inside the Optional object.
     * */
    raw(): T | undefined {
        if (this.value === null) return undefined;
        return this.value;
    }

    /**
     * The orElse method  is used to retrieve the value inside the Optional object if it is present,
     * or return a default value if the Optional object is empty.
     *
     * @param defaultValue (generic type) - The default value to return if the Optional object is empty.
     * @return The value inside the Optional object if it is present.
     * The defaultValue if the Optional object is empty.
     * */
    orElse<R>(defaultValue: R): T | R {
        return this.isPresent() ? this.value! : defaultValue;
    }

    /**
     * The orElseGet method  is used to retrieve the value inside the Optional object if it is
     * present, or get a default value from a callback function if the Optional object is empty.
     *
     * @example
     * const optional = Optional.of("Hello");
     * const result = optional.orElseGet(() => "Default Value");
     * console.log(result); // Output: "Hello"
     *
     * const emptyOptional = Optional.empty();
     * const defaultValue = emptyOptional.orElseGet(() => "Default Value");
     * console.log(defaultValue); // Output: "Default Value"
     *
     * @param defaultValueProvider (function) - A callback function that returns a default value of type T.
     * @return The value inside the Optional object if it is present.
     * The default value provided by the defaultValueProvider callback function if the Optional object is empty.
     * */
    orElseGet<R>(defaultValueProvider: () => R): T | R {
        return this.isPresent() ? this.value! : defaultValueProvider();
    }

    /**
     * The orElseThrow method  is used to retrieve the Optional object if it is present,
     * or throw an error if the Optional object is empty.
     *
     * @example
     * const optionalValue = Optional.of("Hello");
     * const value = optionalValue.orElseThrow(() => new Error("Value is not present"));
     * console.log(value); // Output: "Hello"
     *
     * const emptyOptional = Optional.empty();
     * emptyOptional.orElseThrow(() => new Error("Value is not present")); // Throws an error
     *
     * @param errorProvider (function) - A callback function that returns an Error object
     * @throws Throws an error if the Optional object is empty.
     * */
    orElseThrow(errorProvider: () => Error): T {
        if (this.isEmpty()) {
            throw errorProvider();
        }
        return this.value!;
    }

    /**
     * The map method is used to transform the value inside the Optional object using a provided mapper function,
     * or return a default value if the Optional is empty.
     *
     * @example
     * const optional = Optional.of(5); // Create an Optional object with a value of 5
     * const mappedOptional = optional.map(value => value * 2); // Map the value to its double
     * console.log(mappedOptional.get()); // Output: 10
     *
     * const emptyOptional = Optional.empty(); // Create an empty Optional object
     * const defaultValue = 0;
     * const mappedEmptyOptional = emptyOptional.map(value => value * 2, defaultValue); // Map the value to its double or use the default value if empty
     * console.log(mappedEmptyOptional.get()); // Output: 0
     *
     * @param mapper - A function that takes the current value of type T and returns a new value of type U.
     * @param defaultValue - default value when the optional is empty
     * @return Returns a new Optional object with the mapped value.
     * returns a new Optional object with the mapped value, the default Optional value or empty.
     * */
    map<U>(mapper: (value: T) => U, defaultValue?: U): Optional<U> {
        if (this.isPresent()) {
            return Optional.of(mapper(this.value!));
        }
        if (defaultValue) {
            return Optional.of(defaultValue);
        }
        return Optional.empty();
    }

    /**
     * The flatMap method  is used to apply a mapper function
     * to the value inside the Optional object and return a new Optional object
     * with the mapped value. If the original Optional object is empty, it throws an error.
     *
     * @example
     * const optional = Optional.of(5);
     * const mappedOptional = optional.flatMap(value => Optional.of(value * 2));
     * console.log(mappedOptional.get()); // Output: 10
     *
     * @param mapper (function) - A function that takes the value of type T inside the Optional object and returns an
     * Optional object with a mapped value of type U.
     * @return Returns a new Optional object with the mapped value, or empty.
     * */
    flatMap<U>(mapper: (value: T) => Optional<U>): Optional<U> {
        if (this.isPresent()) {
            return mapper(this.value!);
        }
        return Optional.empty();
    }

    /**
     * The flatMapAsync method allows for chaining asynchronous operations on an optional value. It takes a mapper function
     * that returns a promise of an Optional object, and if the current optional value is present, it applies the mapper
     * function and returns the result. If the current optional value is empty, it returns an empty Optional object.
     *
     * @example
     * const optionalValue = Optional.of(5);
     * const asyncMapper = (value: number) => {
     *   return new Promise<Optional<number>>((resolve) => {
     *     setTimeout(() => {
     *       resolve(Optional.of(value * 2));
     *     }, 1000);
     *   });
     * };
     *
     * optionalValue.flatMapAsync(asyncMapper)
     *   .then((result) => {
     *     console.log(result.get()); // Output: 10
     *   })
     *   .catch((error) => {
     *     console.error(error);
     *   });
     *
     *  @param mapper - A function that takes the current value of the optional and returns a promise of an Optional object.
     *  @return An Optional object that contains the result of the mapper function, or an empty Optional object if the current optional value is empty
     * */
    async flatMapAsync<U>(mapper: (value: T) => Promise<Optional<U>>): Promise<Optional<U>> {
        if (this.isPresent()) {
            return mapper(this.value!).then(result => result.isPresent() ? result : Optional.empty());
        }
        return Optional.empty();
    }

    /**
     * The filter method  is used to filter the value inside the Optional object based on a given
     * predicate function. It returns a new Optional object containing the filtered value if the original Optional object
     * is present, or an empty Optional object if the original Optional object is not present.
     *
     * @example
     * const optional = Optional.of([1, 2, 3, 4, 5]); // Create an Optional object with an array value
     * const filteredOptional = optional.filter(value => value > 3); // Filter the array to keep only values greater than 3
     * console.log(filteredOptional.get()); // Output: [4, 5]
     *
     * const emptyOptional = Optional.empty(); // Create an empty Optional object
     * const filteredEmptyOptional = emptyOptional.filter(value => value > 3); // Filter the empty Optional object
     * console.log(filteredEmptyOptional.isEmpty()); // Output: true
     *
     * @param predicate (function) - A predicate function that takes a value of type T and returns a boolean value
     * indicating whether the value should be included in the filtered result or not.
     * @return Returns a new Optional object containing the filtered value if the original Optional object is present.
     * Returns an empty Optional object if the original Optional object is not present.
     * */
    filter(predicate: (value: T) => boolean): Optional<T> {
        if (this.isEmpty()) {
            return this; // Return itself if it's empty
        }

        if (Array.isArray(this.value)) {
            // Filter array
            return Optional.of(this.value.filter(predicate) as T);
        } else if (this.value instanceof Map || this.value instanceof Set) {
            // Filter map or set
            const filteredEntries = Array.from(this.value.entries()).filter(([, value]) => predicate(value));
            if (this.value instanceof Map) {
                return Optional.of(new Map(filteredEntries) as T);
            } else {
                return Optional.of(new Set(filteredEntries.map(([, value]) => value)) as T);
            }
        } else {
            // Filter single value
            return predicate(this.value as T) ? this : Optional.empty();
        }
    }

    /**
     * The convert method  is used to convert the value inside the Optional object to a different
     * type using a provided converter function.
     *
     * @param converter A function that takes the current value of type T inside the Optional object and returns a value of type U.
     * @return Returns a new Optional object containing the converted value if the original Optional object is present.
     * Returns an empty Optional object if the original Optional object is not present.
     * */
    convert<U>(converter: (value: T) => U): Optional<U> {
        return this.isPresent() ? Optional.of(converter(this.value!)) : Optional.empty();
    }

    /**
     * The isEmpty method  checks if the value inside the
     * Optional object is empty or not.
     *
     * @example
     * const optionalValue = Optional.of("Hello"); // Create an Optional object with a non-empty value
     * console.log(optionalValue.isEmpty()); // Output: false
     *
     * const emptyOptional = Optional.empty(); // Create an Optional object with an empty value
     * console.log(emptyOptional.isEmpty()); // Output: true
     *
     * @return A boolean value indicating whether the value inside the Optional object is empty or not. true if the value
     * is empty, false otherwise.
     * */
    isEmpty(): boolean {
        if (this.value === undefined || this.value === null) {
            return true;
        }

        if (typeof this.value === "string" && this.value.trim() === "") {
            return true;
        }

        if (this.value instanceof Map || this.value instanceof Set) {
            return this.value.size === 0;
        }

        if (Array.isArray(this.value)) {
            return this.value.length === 0;
        }
        return false;
    }

    /**
     * The ifEmpty method  executes a specified action if the value inside the Optional object is empty.
     *
     * @example
     * const optional = Optional.of(null);
     * optional.ifEmpty(() => console.log("Value is empty")); // Output: "Value is empty"
     *
     * @param action A callback function that performs an action when the value inside the Optional object is empty.
     * */
    ifEmpty(action: () => void): void {
        if (this.isEmpty()) {
            action();
        }
    }

    /**
     * The ifEmptyThrow method  throws an error if the value inside the Optional object is empty, otherwise it returns optional.
     *
     * @example
     * const optional = Optional.of("value");
     * const value = optional.ifEmptyThrow(() => new Error("Value is empty")); // Returns the value
     *
     * const emptyOptional = Optional.empty();
     * emptyOptional.ifEmptyThrow(() => new Error("Value is empty")); // Throws an error
     *
     * @param errorProvider A callback function that returns an Error object.
     * @return Returns the Optional object if it is not empty or Throws an error if the Optional object is empty.
     * */
    ifEmptyThrow(errorProvider: () => Error): T {
        if (this.isEmpty()) {
            throw errorProvider();
        }
        return this.value!;
    }

    /**
     * The ifEmptyGet method  returns the value inside the Optional object if it is not empty,
     * otherwise it returns a default value provided by a callback function.
     *
     * @example
     * const optional = Optional.of("Hello");
     * const result = optional.ifEmptyGet(() => "Default Value");
     * console.log(result); // Output: "Hello"
     *
     * const emptyOptional = Optional.empty();
     * const defaultValue = emptyOptional.ifEmptyGet(() => "Default Value");
     * console.log(defaultValue); // Output: "Default Value"
     *
     * @param defaultValueProvider A callback function that returns a default value of type T.
     * @return Returns the value inside the Optional object if it is not empty or the default value provided by the defaultValueProvider callback function if the Optional object is empty.
     * */
    ifEmptyGet(defaultValueProvider: () => T): T {
        return this.isEmpty() ? defaultValueProvider() : this.value!;
    }

    /**
     * The contains method  checks if the value inside the Optional object contains a given search value.
     *
     * @example
     * const optional = Optional.of([1, 2, 3, 4, 5]);
     * const searchValue = 3;
     * const result = optional.contains(searchValue);
     * console.log(result); // true
     *
     * @param searchValue (generic type) - The value to search for in the Optional object.
     * @return boolean: Returns true if the value inside the Optional object contains the search value, otherwise returns false.
     * */
    contains(searchValue: T): boolean {
        if (this.isEmpty()) {
            return false;
        }
        if (typeof this.value === "string" && typeof searchValue === "string") {
            return this.value.includes(searchValue);
        } else if (Array.isArray(this.value)) {
            return this.value.includes(searchValue);
        } else if (this.value instanceof Map || this.value instanceof Set) {
            return Array.from(this.value.values()).includes(searchValue);
        } else {
            return this.value === searchValue;
        }
    }

    /**
     * The every method checks if a given predicate function returns true for every value inside the Optional object.
     *
     * ### Example Usage
     * ```ts
     * const optional = Optional.of([1, 2, 3]);
     * const result = optional.every(value => value > 0);
     * console.log(result); // true
     * ```
     * @param predicate (function) - A predicate function that takes a value of type T and returns a boolean value.
     * @return Returns true if the predicate function returns true for every value inside the Optional object.
     * Returns false if the Optional object is empty or if the predicate function returns false for any value.
     */
    every(predicate: (value: T) => boolean): boolean {
        if (this.isEmpty()) {
            return false;
        }

        if (Array.isArray(this.value)) {
            return this.value.every(predicate);
        }

        if (this.value instanceof Map || this.value instanceof Set) {
            return Array.from(this.value.values()).every(predicate);
        }

        return predicate(this.value!);
    }

    /**
     * The some method checks if a given predicate function returns true for at least one value inside the Optional object.
     *
     * ### Example Usage
     * ```ts
     * const optional = Optional.of([1, 2, 3]);
     * const result = optional.some(value => value > 0);
     * console.log(result); // true
     * ```
     *
     * @param predicate (function) - A predicate function that takes a value of type T and returns a boolean value.
     * @return Returns true if the predicate function returns true for at least one value inside the Optional object.
     * Returns false if the Optional object is empty or if the predicate function returns false for all values.
     */
    some(predicate: (value: T) => boolean): boolean {
        if (this.isEmpty()) {
            return false;
        }

        if (Array.isArray(this.value)) {
            return this.value.some(predicate);
        }

        if (this.value instanceof Map || this.value instanceof Set) {
            return Array.from(this.value.values()).some(predicate);
        }

        return predicate(this.value!);
    }

    /**
     * The match method  checks if the value inside the
     * Optional object matches a given condition.
     *
     * @example
     * const optional = Optional.of(5);
     * const isEven = optional.match(value => value % 2 === 0);
     * console.log(isEven); // true
     *
     * @param condition (function or RegExp): The condition to check against the value inside the Optional object.
     * @returnboolean: Returns true if the value inside the Optional object matches the given condition, otherwise returns false.
     * */
    match(condition: ((value: T) => boolean) | RegExp): boolean {
        if (this.isEmpty()) {
            return false;
        }

        if (typeof condition === "function") {
            return condition(this.value!);
        } else {
            return condition.test(String(this.value));
        }
    }

    /**
     * The run method in the Optional class allows you to execute a callback function on the value stored in the Optional
     * object and return a new Optional object with the result.
     *
     * @example
     * const optional = Optional.of(5); // Create an Optional object with a value of 5
     * const newOptional = optional.run(value => value * 2); // Execute the callback function on the value and create a new Optional object with the result
     * console.log(newOptional.get()); // Output: 10
     *
     * @param callback - A function that takes the value stored in the Optional object as an argument and returns a result of type R.
     * @param defaultProvider (optional) - Provider for default value in case of empty optional
     * @return Returns a new Optional object that contains the result of executing the callback function on the value stored in the original Optional object. Returns empty or default optional otherwise
     * */
    run<R>(callback: (value: T) => R, defaultProvider?: () => R): Optional<R> {
        if (this.isPresent()) {
            const result = callback(this.value as T);
            return Optional.of(result);
        }
        return defaultProvider ? Optional.of(defaultProvider()) : Optional.empty();
    }

    /**
     * The runAsync method in the Optional class allows you to asynchronously execute a callback function on the value contained within the Optional object.
     *
     * @example
     * const optional = Optional.of(5); // Create an Optional object with a value of 5
     *
     * const asyncCallback = async (value: number) => {
     *   // Perform some asynchronous operation on the value
     *   const result = await someAsyncFunction(value);
     *   return result;
     * };
     *
     * const resultPromise = optional.runAsync(asyncCallback); // Execute the async callback on the value
     *
     * resultPromise.then(result => {
     *   console.log(result); // Output the result of the asynchronous operation
     * }).catch(error => {
     *   console.error(error); // Handle any errors that occurred during the asynchronous operation
     * });
     *
     * @param callback - A callback function that takes the value of type T and returns a Promise of type R.
     * This function represents the asynchronous operation to be performed on the value.
     * @param defaultProvider (optional) - Provider for default value in case of empty optional
     * @return A Promise that resolves to the result of the asynchronous operation performed by the callback function.
     * */
    async runAsync<R>(callback: (value: T) => Promise<R>, defaultProvider?: () => R): Promise<Optional<R>> {
        if (this.isPresent()) {
            return Optional.of(await callback(this.value as T));
        }
        return defaultProvider ? Optional.of(defaultProvider()) : Optional.empty();
    }

    /**
     * The else method in the Optional class is used to provide an alternative value or action when the optional value is empty.
     *
     * @param callback - A function that returns a value of type R. This function is executed when the optional value is empty.
     * @return An Optional object that contains the alternative value returned by the callback function, if the optional value is empty, or the optional value itself.
     * */
    else<R>(callback: () => R): Optional<R | T> {
        if (!this.isPresent()) {
            const result = callback();
            return Optional.of(result);
        }
        return this;
    }

    /**
     * The elseAsync method in the Optional class is used to execute a callback function asynchronously if the optional
     * value is empty. It returns a promise that resolves to the result of the callback function.
     *
     * @example
     * const optionalValue: Optional<number> = Optional.of(5);
     * const result = await optionalValue.elseAsync(() => Promise.resolve(10));
     * console.log(result); // Output: 5
     *
     * const emptyOptional: Optional<number> = Optional.empty();
     * const alternativeResult = await emptyOptional.elseAsync(() => Promise.resolve(10));
     * console.log(alternativeResult); // Output: 10
     *
     * @param callback - A function that returns a promise. This function will be executed if the optional value is empty.
     * @return A promise that resolves to the result of the callback function if the optional value is empty.
     * */
    async elseAsync<R>(callback: () => Promise<R>): Promise<Optional<R | T>> {
        if (!this.isPresent()) {
            const result = await callback();
            return Optional.of(result);
        }
        return this;
    }

    /**
     * Compares the current Optional with another Optional for equality.
     *
     * @param {Optional<U>} other - The Optional to compare with.
     * @returns {boolean} true if the two Optionals are equal, false otherwise.
     *
     * @example
     * const optional1 = Optional.of(42);
     * const optional2 = Optional.of(42);
     * const optional3 = Optional.of(99);
     *
     * console.log(optional1.equals(optional2)); // true (both contain the same value)
     * console.log(optional1.equals(optional3)); // false (contain different values)
     * console.log(optional1.equals(Optional.empty())); // false (one is non-empty, the other is empty)
     * console.log(Optional.empty().equals(Optional.empty())); // true (both are empty)
     */
    equals<U>(other: Optional<U>): boolean {
        if (typeof this.value === typeof other.value) {
            return this.value === other.value as unknown as T;
        }
        return false;
    }
}

declare global {

    /**
     * Wraps a value that might be undefined or null in an Optional container.
     *
     * @template T - The type of the wrapped value.
     * @param {T | undefined | null} value - The value to be wrapped.
     * @returns {Optional<T>} - An Optional container holding the wrapped value.
     *
     * @example
     *  const result1 = optional("Hello");
     *  if (result1.isPresent()) {
     *    console.log(result1.get()); // Prints: Hello
     *  }
     *
     *  const result2 = optional(null);
     *  if (result2.isEmpty()) {
     *    console.log("Value is not present"); // Prints: Value is not present
     *  }
     *
     *  const result3 = optional(undefined);
     *  console.log(result3.orElse("Default")); // Prints: Default
     *
     *  const result4 = await optionalOf(user)
     *     .orElseThrow(() => new HttpError(409, "User doesn't exist"))
     *  console.log(result4); // Prints: saved user content
     */
    function optionalOf<T>(value: T | undefined | null): Optional<T>;

    /**
     * The allPresent method checks if all the elements in an array of Optional objects are present.
     *
     * ### Example Usage
     * ```ts
     * onst optional1 = Optional.of(5);
     * const optional2 = Optional.of(10);
     * const optional3 = Optional.empty();
     *
     * const optionals = [optional1, optional2, optional3];
     *
     * const result = Optional.allPresent(optionals);
     * console.log(result); // Output: false
     * ```
     *
     * @param optionals - An array of Optional objects.
     * @return true if all the Optional objects in the array have a non-empty value. false if any of the Optional objects in the array have an empty value.
     * */
    function allPresent<T>(optionals: Optional<T>[]): boolean ;

    /**
     * Checks if at least one Optional object in an array is present.
     *
     * @param {Optional<T>[]} optionals - An array of Optional objects.
     * @return {boolean} Returns true if at least one Optional object in the array is present, false otherwise.
     *
     * @example
     * // Example Usage:
     * const optional1 = Optional.of(5);
     * const optional2 = Optional.empty();
     * const optional3 = Optional.of(10);
     *
     * const optionals = [optional1, optional2, optional3];
     *
     * const result = Optional.anyPresent(optionals);
     * console.log(result); // true
     */
    function anyPresent<T>(optionals: Optional<T>[]): boolean;

    /**
     * The nonePresent method checks if none of the Optional objects in the array are present.
     *
     * @param optionals An array of Optional objects.
     * @return Returns true if none of the Optional objects in the array are present, otherwise returns false.
     *
     * @example
     * // Example 1: All Optionals have values
     * const optionalsWithValues = [Optional.of("Hello"), Optional.of("World")];
     * const areNonePresent1 = Optional.nonePresent(optionalsWithValues);
     * console.log(areNonePresent1); // false (both Optionals have values)
     *
     * @example
     * // Example 2: All Optionals are empty
     * const optionalsWithEmptyValues = [Optional.empty(), Optional.empty()];
     * const areNonePresent2 = Optional.nonePresent(optionalsWithEmptyValues);
     * console.log(areNonePresent2); // true (both Optionals are empty)
     *
     * @example
     * // Example 3: At least one Optional has a value
     * const mixedOptionals = [Optional.of("Hello"), Optional.empty()];
     * const areNonePresent3 = Optional.nonePresent(mixedOptionals);
     * console.log(areNonePresent3); // false (at least one Optional has a value)
     */
    function nonePresent<T>(optionals: Optional<T>[]): boolean ;

    /**
     * The coalesce method returns the first non-empty optional from a list of optionals, or an empty optional if all optionals are empty.
     *
     * ### Example Usage
     * ```ts
     *     const optional1 = Optional.of(5);
     * const optional2 = Optional.empty();
     * const optional3 = Optional.of(10);
     *
     * const result = Optional.coalesce(optional1, optional2, optional3);
     * console.log(result.get()); // Output: 5
     * ```
     *
     * @param optionals - A spread parameter that accepts a variable number of Optional objects
     * @return Returns the first non-empty optional from the list of optionals, or an empty optional if all optionals are empty.
     * */
    function coalesce<T>(...optionals: Optional<T | undefined | null>[]): Optional<T | undefined | null> ;
}

const _global = typeof window !== 'undefined' ? window : globalThis;

_global.optionalOf = function <T>(value: T | undefined | null): Optional<T> {
    return Optional.of(value);
}

_global.allPresent = function <T>(optionals: Optional<T>[]): boolean {
    return Optional.allPresent(optionals);
}

_global.anyPresent = function <T>(optionals: Optional<T>[]): boolean {
    return Optional.anyPresent(optionals);
}

_global.nonePresent = function <T>(optionals: Optional<T>[]): boolean {
    return Optional.nonePresent(optionals);
}

_global.coalesce = function <T>(...optionals: Optional<T | undefined | null>[]): Optional<T | undefined | null> {
    return Optional.coalesce(...optionals);
}
