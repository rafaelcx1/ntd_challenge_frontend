import { FormikSharedConfig } from "formik";
import { TextFieldProps } from "@mui/material";
import { defaultField } from "../../../../../utils/field.util";

type RandomStringFields = {
    size: TextFieldProps;
};

export const getRandomStringFields = (formik: FormikSharedConfig): RandomStringFields => ({
    size: {
        ...defaultField(formik, "randomString.size"),
        label: "Size",
        placeholder: "1",
    }
})