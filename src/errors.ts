/**
 * Exception thrown when attempting to access an element that does not exist.
 */
export class NoSuchElementError extends Error {
    constructor(message: string = 'No such element') {
        super(message);
        this.name = 'NoSuchElementError';
    }
}

