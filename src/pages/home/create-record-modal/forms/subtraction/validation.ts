import * as yup from "yup";


export interface SubtractionFormProps {
  value1: number | null
  value2: number | null
}

export const subtractionInitialValues: SubtractionFormProps = {
  value1: null,
  value2: null
};

export const subtractionValidationSchema = yup.object({
  value1: yup
    .number()
    .required("First value is required"),

  value2: yup
    .number()
    .required("Second value is required"),
});
