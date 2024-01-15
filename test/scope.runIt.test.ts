import "../src/index"

describe("runIt", () => {
    test("works with object", () => {
        const obj = {name: "Manuel", age: 36};
        obj.runIt(function () {
            expect(this).toBeInstanceOf(Object);
        });
    });
    test("works with number", () => {
        const number = 5;
        number.runIt(function () {
            expect(typeof this).toBe("number");
        });
        number.runIt(function () {
            expect(this).toBe(number);
        });
    });
    test("works with string", () => {
        const string = "Hello world";
        string.runIt(function () {
            expect(typeof this).toBe("string");
        });
        string.runIt(function () {
            expect(this).toBe(string);
        });
    });
    test("works with boolean", () => {
        const boolean = true;
        boolean.runIt(function () {
            expect(typeof this).toBe("boolean");
        });
        boolean.runIt(function () {
            expect(this).toBe(boolean);
        });
    });
    test("returns value", () => {
        const obj = {name: "Manuel", age: 36};
        const value = obj.runIt(function () {
            return this.age;
        });
        expect(value).toBe(36);
    });
    test("works with nullable", () => {
        const str: string | null = "Hello world";
        const value = str?.runIt(function () {
            return this.split(" ")[0];
        });
        expect(value).toBe("Hello");
    });
    test("fails with null", () => {
        const str: string | null = null;
        const value = str?.runIt(function () {
            return this.split(" ")[0];
        });
        expect(value).toBeUndefined();
    });
    test("fails with undefined", () => {
        const str: string | undefined = undefined;
        const value = str?.runIt(function () {
            return this.split(" ")[0];
        });
        expect(value).toBeUndefined();
    });
});