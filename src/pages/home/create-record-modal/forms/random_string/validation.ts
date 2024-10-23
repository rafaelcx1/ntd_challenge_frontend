import * as yup from "yup";


export interface RandomStringFormProps {
  size: number | null
}

export const randomStringInitialValues: RandomStringFormProps = {
  size: null
};

export const randomStringValidationSchema = yup.object({
  size: yup
    .number()
    .required("Size is required")
});
