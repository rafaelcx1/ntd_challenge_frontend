import * as yup from "yup";


export interface SquareRootFormProps {
  value: number | null
}

export const squareRootInitialValues: SquareRootFormProps = {
  value: null
};

export const squareRootValidationSchema = yup.object({
  value: yup
    .number()
    .required("Value is required")
    .typeError("Only numeric values are allowed"),
});
