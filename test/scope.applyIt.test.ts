import "../src/index"

describe("applyIt", () => {
    test("works with object", () => {
        const obj = {name: "Manuel", age: 36};
        obj.applyIt(function () {
            expect(this).toBeInstanceOf(Object);
        });
    });
    test("works with number", () => {
        const number = 5;
        number.applyIt(function () {
            expect(typeof this).toBe("number");
        });
        number.applyIt(function () {
            expect(this).toBe(number);
        });
    });
    test("works with string", () => {
        const string = "Hello world";
        string.applyIt(function () {
            expect(typeof this).toBe("string");
        });
        string.applyIt(function () {
            expect(this).toBe(string);
        });
    });
    test("works with boolean", () => {
        const boolean = true;
        boolean.applyIt(function () {
            expect(typeof this).toBe("boolean");
        });
        boolean.applyIt(function () {
            expect(this).toBe(boolean);
        });
    });
    test("returns instance", () => {
        const obj = {name: "Manuel", age: 36};
        const value = obj.applyIt(function () {
            return this.name;
        });
        expect(value).toBe(obj);
    });
    test("modifies value", () => {
        const obj = {name: "Manuel", age: 36};
        const value = obj.applyIt(function () {
            this.age = 40;
        });
        expect(value).toBe(obj);
        expect(value.age).toBe(40);
    });
    test("works with nullable", () => {
        const obj: object | null = {name: "Manuel", age: 36};
        const value = obj?.applyIt(function () {
            this["age"] = 40;
        });
        expect(value).toBe(obj);
        expect(value?.["age"]).toBe(40);
    });
    test("fails with null", () => {
        const obj: object | null = null;
        const value = obj?.applyIt(function () {
            this["age"] = 40;
        });
        expect(value).toBeUndefined();
    });
    test("fails with undefined", () => {
        const obj: object | null = null;
        const value = obj?.applyIt(function () {
            this["age"] = 40;
        });
        expect(value).toBeUndefined();
    });
    test("retains with null", () => {
        const str: string | null = null;
        const obj = {name: "Manuel", age: 36};
        str?.applyIt(function () {
            obj.name = this;
        });
        expect(obj.name).toBe("Manuel");
    });
});