import { getProperty } from "dot-prop";

export const defaultField = (
    formik: any,
    fieldName: string,
    defaultValue: string | number = ""
) => {
    return {
        id: `${fieldName}`,
        name: `${fieldName}`,
        onBlur: formik?.handleBlur,
        value: getProperty(formik.values, fieldName, defaultValue),
        onChange: formik?.handleChange,
        error:
            getProperty(formik?.touched, fieldName) &&
            Boolean(getProperty(formik?.errors, fieldName)),
        helperText:
            getProperty(formik?.touched, fieldName) &&
            getProperty(formik?.errors, fieldName),
        focused: true,
    };
};