import "../src/index"

describe("letIt", () => {
    test("works with object", () => {
        const obj = {name: "Manuel", age: 36};
        obj.letIt(it => expect(it).toBeInstanceOf(Object));
    });
    test("works with number", () => {
        const number = 5;
        number.letIt(it => expect(typeof it).toBe("number"));
        number.letIt(it => expect(it).toBe(number));
    });
    test("works with string", () => {
        const string = "Hello world";
        string.letIt(it => expect(typeof it).toBe("string"));
        string.letIt(it => expect(it).toBe(string));
    });
    test("works with boolean", () => {
        const boolean = true;
        boolean.letIt(it => expect(typeof it).toBe("boolean"));
        boolean.letIt(it => expect(it).toBe(boolean));
    });
    test("returns value", () => {
        const obj = {name: "Manuel", age: 36};
        const value = obj.letIt(it => it.age);
        expect(value).toBe(36);
    });
    test("works with nullable", () => {
        const str: string | null = "Hello world";
        const value = str?.letIt(it => it.split(" ")[0]);
        expect(value).toBe("Hello");
    });
    test("fails with null", () => {
        const str: string | null = null;
        const value = str?.letIt(it => it.split(" ")[0]);
        expect(value).toBeUndefined();
    });
    test("fails with undefined", () => {
        const str: string | undefined = undefined;
        const value = str?.letIt(it => it.split(" ")[0]);
        expect(value).toBeUndefined();
    });
});