import * as yup from "yup";


export interface AdditionFormProps {
  value1: number | null
  value2: number | null
}

export const additionInitialValues: AdditionFormProps = {
  value1: null,
  value2: null
};

export const additionValidationSchema = yup.object({
  value1: yup
    .number()
    .required("First value is required"),

  value2: yup
    .number()
    .required("Second value is required"),
});
