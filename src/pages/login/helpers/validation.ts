import * as yup from "yup";

export interface LoginFormProps {
  email: string;
  password: string;
}

export const loginInitialValues: LoginFormProps = {
  email: "",
  password: "",
};

export const loginValidationSchema = yup.object({
  email: yup
    .string()
    .trim()
    .matches(/^[^\s]+$/, "Spaces not allowed")
    .required("Email is required"),

  password: yup
    .string()
    .required("Password is required")
});
