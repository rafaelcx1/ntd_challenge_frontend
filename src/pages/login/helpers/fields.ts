import { FormikSharedConfig } from "formik";
import { TextFieldProps } from "@mui/material";
import { defaultField } from "../../../utils/field.util";

type LoginFields = {
    email: TextFieldProps;
    password: TextFieldProps;
};

export const getLoginFields = (formik: FormikSharedConfig): LoginFields => ({
    email: {
        ...defaultField(formik, "email"),
        label: "Email",
        fullWidth: true,
        placeholder: "test@example.com",
    },

    password: {
        ...defaultField(formik, "password"),
        type: "password",
        label: "Password",
        placeholder: "*******",
        fullWidth: true,
    }
})