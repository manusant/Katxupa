import "../src/index"

describe("alsoIt", () => {
    test("works with object", () => {
        const obj = {name: "Manuel", age: 36};
        obj.alsoIt(it => expect(it).toBeInstanceOf(Object));
    });
    test("works with number", () => {
        const number = 5;
        number.alsoIt(it => expect(typeof it).toBe("number"));
        number.alsoIt(it => expect(it).toBe(number));
    });
    test("works with string", () => {
        const string = "Hello world";
        string.alsoIt(it => expect(typeof it).toBe("string"));
        string.alsoIt(it => expect(it).toBe(string));
    });
    test("works with boolean", () => {
        const boolean = true;
        boolean.alsoIt(it => expect(typeof it).toBe("boolean"));
        boolean.alsoIt(it => expect(it).toBe(boolean));
    });
    test("returns instance", () => {
        const obj = {name: "Manuel", age: 36};
        const value = obj.alsoIt(it => it.name);
        expect(value).toBe(obj);
    });
    test("modifies value", () => {
        const obj = {name: "Manuel", age: 36};
        const value = obj.alsoIt(it => it.age = 40);
        expect(value).toBe(obj);
        expect(value.age).toBe(40);
    });
    test("works with nullable", () => {
        const obj: object | null = {name: "Manuel", age: 36};
        const value = obj?.alsoIt((it: any) => it.age = 40);
        expect(value).toBe(obj);
        expect((value as any)?.age).toBe(40);
    });
    test("fails with null", () => {
        const obj: object | null = null;
        const value = obj?.alsoIt((it: any) => it.age = 40);
        expect(value).toBeUndefined();
    });
    test("fails with undefined", () => {
        const obj: object | undefined = undefined;
        const value = obj?.alsoIt((it: any) => it.age = 40);
        expect(value).toBeUndefined();
    });
    test("retains with null", () => {
        const str: string | null = null;
        const obj = {name: "Manuel", age: 36};
        str?.alsoIt((it: string) => obj.name = it);
        expect(obj.name).toBe("Manuel");
    });
});