import * as yup from "yup";
import { AdditionFormProps, additionInitialValues, additionValidationSchema } from "./addition/validation";
import { SubtractionFormProps, subtractionInitialValues, subtractionValidationSchema } from "./subtraction/validation";
import { MultiplicationFormProps, multiplicationInitialValues, multiplicationValidationSchema } from "./multiplication/validation";
import { DivisionFormProps, divisionInitialValues, divisionValidationSchema } from "./division/validation";
import { SquareRootFormProps, squareRootInitialValues, squareRootValidationSchema } from "./square_root/validation";
import { RandomStringFormProps, randomStringInitialValues, randomStringValidationSchema } from "./random_string/validation";


export interface CreateRecordFormProps {
  addition: AdditionFormProps
  subtraction: SubtractionFormProps
  multiplication: MultiplicationFormProps
  division: DivisionFormProps
  squareRoot: SquareRootFormProps
  randomString: RandomStringFormProps
}

export const createRecordInitialValues: CreateRecordFormProps = {
  addition: additionInitialValues,
  subtraction: subtractionInitialValues,
  multiplication: multiplicationInitialValues,
  division: divisionInitialValues,
  squareRoot: squareRootInitialValues,
  randomString: randomStringInitialValues
};

export const createRecordValidationSchema = yup.object({
  addition: additionValidationSchema,
  subtraction: subtractionValidationSchema,
  multiplication: multiplicationValidationSchema,
  division: divisionValidationSchema,
  squareRoot: squareRootValidationSchema,
  randomString: randomStringValidationSchema
});
