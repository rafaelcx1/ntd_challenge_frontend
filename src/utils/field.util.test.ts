import { defaultField } from "./field.util";

describe("Field Util", () => {
    const formikMock = {
        values: {
            address: {
                name: "Address Test"
            },
        },
        errors: {
            address: {
                number: "Address number is required"
            }
        },
        handleBlur: vi.fn(),
        handleChange: vi.fn(),
    }

    it("should return correct input data", () => {
        const fieldName = "address.name"
        const defaultValue = "Default Name"

        const field = defaultField(formikMock, fieldName, defaultValue);

        expect(field.id).toBe(fieldName);
        expect(field.name).toBe(fieldName);
        expect(field.onBlur).toBe(formikMock.handleBlur);
        expect(field.onChange).toBe(formikMock.handleChange);
        expect(field.value).toBe('Address Test');
        expect(field.helperText).toBe(undefined);
    })


})