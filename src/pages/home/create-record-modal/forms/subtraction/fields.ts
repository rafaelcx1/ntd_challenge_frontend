import { FormikSharedConfig } from "formik";
import { TextFieldProps } from "@mui/material";
import { defaultField } from "../../../../../utils/field.util";

type SubtractionFields = {
    value1: TextFieldProps;
    value2: TextFieldProps;
};

export const getSubtractionFields = (formik: FormikSharedConfig): SubtractionFields => ({
    value1: {
        ...defaultField(formik, "subtraction.value1"),
        label: "First value",
        placeholder: "1",
    },

    value2: {
        ...defaultField(formik, "subtraction.value2"),
        label: "Second value",
        placeholder: "2"
    }
})