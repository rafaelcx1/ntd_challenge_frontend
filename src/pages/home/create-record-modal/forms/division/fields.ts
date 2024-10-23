import { FormikSharedConfig } from "formik";
import { TextFieldProps } from "@mui/material";
import { defaultField } from "../../../../../utils/field.util";

type DivisionFields = {
    value1: TextFieldProps;
    value2: TextFieldProps;
};

export const getDivisionFields = (formik: FormikSharedConfig): DivisionFields => ({
    value1: {
        ...defaultField(formik, "division.value1"),
        label: "First value",
        placeholder: "1",
    },

    value2: {
        ...defaultField(formik, "division.value2"),
        label: "Second value",
        placeholder: "2"
    }
})