import "../src/index"

describe("apply", () => {
    test("works with object", () => {
        const obj = {name: "Manuel", age: 36};
        obj.apply(function () {
            expect(this).toBeInstanceOf(Object);
        });
    });
    test("works with number", () => {
        const number = 5;
        number.apply(function () {
            expect(typeof this).toBe("number");
        });
        number.apply(function () {
            expect(this).toBe(number);
        });
    });
    test("works with string", () => {
        const string = "Hello world";
        string.apply(function () {
            expect(typeof this).toBe("string");
        });
        string.apply(function () {
            expect(this).toBe(string);
        });
    });
    test("works with boolean", () => {
        const boolean = true;
        boolean.apply(function () {
            expect(typeof this).toBe("boolean");
        });
        boolean.apply(function () {
            expect(this).toBe(boolean);
        });
    });
    test("returns instance", () => {
        const obj = {name: "Manuel", age: 36};
        const value = obj.apply(function () {
            return this.name;
        });
        expect(value).toBe(obj);
    });
    test("modifies value", () => {
        const obj = {name: "Manuel", age: 36};
        const value = obj.apply(function () {
            this.age = 40;
        });
        expect(value).toBe(obj);
        expect(value.age).toBe(40);
    });
    test("works with nullable", () => {
        const obj: object | null = {name: "Manuel", age: 36};
        const value = obj?.apply(function () {
            this["age"] = 40;
        });
        expect(value).toBe(obj);
        expect(value?.["age"]).toBe(40);
    });
    test("fails with null", () => {
        const obj: object | null = null;
        const value = obj?.apply(function () {
            this["age"] = 40;
        });
        expect(value).toBeUndefined();
    });
    test("fails with undefined", () => {
        const obj: object | null = null;
        const value = obj?.apply(function () {
            this["age"] = 40;
        });
        expect(value).toBeUndefined();
    });
    test("retains with null", () => {
        const str: string | null = null;
        const obj = {name: "Manuel", age: 36};
        str?.apply(function () {
            obj.name = this;
        });
        expect(obj.name).toBe("Manuel");
    });
});