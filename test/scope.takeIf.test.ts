import "../src/index"

describe("takeIf", () => {
    test("works with object", () => {
        const obj = {name: "Manuel", age: 36};
        const result = obj.takeIf(it => it.age <= 36);
        expect(result).toBeInstanceOf(Object)
    });
    test("works with number", () => {
        const number = 5;
        const result1 = number.takeIf(it => it <= 5);
        const result2 = number.takeIf(it => it > 5);
        expect(result1).toEqual(number);
        expect(result2).toBeUndefined();
    });
    test("works with string", () => {
        const string = "Hello world";
        const result1 = string.takeIf(it => it.startsWith("Hello"));
        const result2 = string.takeIf(it => it.includes("banana"));
        expect(result1).toEqual(string);
        expect(result2).toBeUndefined();
    });
    test("works with boolean", () => {
        const boolean = true;
        const result1 = boolean.takeIf(it => it === true);
        const result2 = boolean.takeIf(it => it === false);
        expect(result1).toEqual(true);
        expect(result2).toBeUndefined();
    });
    test("returns instance if true", () => {
        const obj = {name: "Manuel", age: 36};
        const value = obj.takeIf(it => it.age < 40);
        expect(value).toBe(obj);
    });
    test("returns undefined if false", () => {
        const obj = {name: "Manuel", age: 36};
        const value = obj.takeIf(it => it.age > 40);
        expect(value).toBeUndefined();
    });
    test("modifies value", () => {
        const obj = {name: "Manuel", age: 36};
        const value = obj.takeIf(it => {
            it.name = "George";
            return it.age < 40;
        });
        expect(value).toBe(obj);
        expect(value.name).toBe("George");
    });
    test("works with nullable", () => {
        const obj: object | null = {name: "Manuel", age: 36};
        const value = obj?.takeIf(it => it["age"] < 40);
        expect(value).toBe(obj);
    });
    test("fails with null", () => {
        const obj: object | null = null;
        const value = obj?.takeIf(it => it["age"] < 40);
        expect(value).toBeUndefined();
    });
    test("fails with undefined", () => {
        const obj: object | undefined = undefined;
        const value = obj?.takeIf(it => it["age"] < 40);
        expect(value).toBeUndefined();
    });
});