import { add, divide, multiply, randomString, squareRoot, subtract } from "../../../../services/operations/operations-service";
import { AddRequest, DivisionRequest, MultiplyRequest, RandomStringRequest, Result, SquareRootRequest, SubtractRequest } from "../../../../services/operations/operations-types";
import { CreateRecordFormProps } from "../forms/create-record-validation";
import { OperationType } from "../enums/operation-type.enum";

type ApiCallResult = () => Promise<Result<number> | Result<string> | null>;

export const getOperationApiCall = (values: CreateRecordFormProps, selectedOperationType: OperationType): ApiCallResult => {
    let apiCall: ApiCallResult;

    switch (selectedOperationType) {
        case OperationType.ADDITION:
            apiCall = () => add(values.addition as AddRequest)
            break;

        case OperationType.SUBTRACTION:
            apiCall = () => subtract(values.subtraction as SubtractRequest)
            break;

        case OperationType.MULTIPLICATION:
            apiCall = () => multiply(values.multiplication as MultiplyRequest)
            break;

        case OperationType.DIVISION:
            apiCall = () => divide(values.division as DivisionRequest)
            break;

        case OperationType.SQUARE_ROOT:
            apiCall = () => squareRoot(values.squareRoot as SquareRootRequest)
            break;

        case OperationType.RANDOM_STRING:
            apiCall = () => randomString(values.randomString as RandomStringRequest)
            break;

        default:
            apiCall = () => new Promise((resolve) => resolve(null))
    }

    return apiCall
}