import { FormikSharedConfig } from "formik";
import { TextFieldProps } from "@mui/material";
import { defaultField } from "../../../../../utils/field.util";

type MultiplicationFields = {
    value1: TextFieldProps;
    value2: TextFieldProps;
};

export const getMultiplicationFields = (formik: FormikSharedConfig): MultiplicationFields => ({
    value1: {
        ...defaultField(formik, "multiplication.value1"),
        label: "First value",
        placeholder: "1",
    },

    value2: {
        ...defaultField(formik, "multiplication.value2"),
        label: "Second value",
        placeholder: "2"
    }
})