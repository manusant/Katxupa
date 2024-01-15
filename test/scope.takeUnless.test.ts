import "../src/index"

describe("takeUnless", () => {
    test("works with object", () => {
        const obj = {name: "Manuel", age: 36};
        const result1 = obj.takeUnless(it => it.age > 30);
        expect(result1).toBeUndefined();
        const result2 = obj.takeUnless(it => it.age < 30);
        expect(result2).toEqual(obj);
    });
    test("works with number", () => {
        const number = 5;
        const result1 = number.takeUnless(it => typeof it === "number");
        expect(result1).toBeUndefined();
        const result2 = number.takeUnless(it => it > 5);
        expect(result2).toEqual(number);
    });
    test("works with string", () => {
        const string = "Hello world";
        const result1 = string.takeUnless(it => it.startsWith("Hello"));
        expect(result1).toBeUndefined();
        const result2 = string.takeUnless(it => typeof it === "number");
        expect(result2).toEqual(string);
    });
    test("works with boolean", () => {
        const boolean = true;
        const result1 = boolean.takeUnless(it => it == true);
        expect(result1).toBeUndefined();
        const result2 = boolean.takeUnless(it => it == false);
        expect(result2).toEqual(boolean);
    });
    test("returns undefined if true", () => {
        const obj = {name: "Manuel", age: 36};
        const value = obj.takeUnless(it => it.age < 40);
        expect(value).toBeUndefined();
    });
    test("returns instance if false", () => {
        const obj = {name: "Manuel", age: 36};
        const value = obj.takeUnless(it => it.age > 40);
        expect(value).toBe(obj);
    });
    test("modifies value", () => {
        const obj = {name: "Manuel", age: 36};
        const value = obj.takeUnless(it => {
            it.name = "George";
            return it.age < 40;
        });
        expect(value).toBeUndefined();
        expect(obj.name).toBe("George");
    });
    test("works with nullable", () => {
        const obj: object | null = {name: "Manuel", age: 36};
        const value = obj?.takeUnless(it => it["age"] > 40);
        expect(value).toBe(obj);
    });
    test("fails with null", () => {
        const obj: object | null = null;
        const value = obj?.takeUnless(it => it["age"] > 40);
        expect(value).toBeUndefined();
    });
    test("fails with undefined", () => {
        const obj: object | undefined = undefined;
        const value = obj?.takeUnless(it => it["age"] > 40);
        expect(value).toBeUndefined();
    });
});