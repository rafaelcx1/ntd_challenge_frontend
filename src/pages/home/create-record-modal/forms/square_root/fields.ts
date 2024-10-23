import { FormikSharedConfig } from "formik";
import { TextFieldProps } from "@mui/material";
import { defaultField } from "../../../../../utils/field.util";

type SquareRootFields = {
    value: TextFieldProps;
};

export const getSquareRootFields = (formik: FormikSharedConfig): SquareRootFields => ({
    value: {
        ...defaultField(formik, "squareRoot.value"),
        label: "Value",
        placeholder: "1",
    }
})