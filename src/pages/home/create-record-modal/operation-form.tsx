import { Box, TextField } from "@mui/material"
import { FormikSharedConfig } from "formik"
import { getAdditionFields } from "./forms/addition/fields"
import { getDivisionFields } from "./forms/division/fields"
import { getMultiplicationFields } from "./forms/multiplication/fields"
import { getRandomStringFields } from "./forms/random_string/fields"
import { getSquareRootFields } from "./forms/square_root/fields"
import { getSubtractionFields } from "./forms/subtraction/fields"
import { OperationType } from "./enums/operation-type.enum"

interface OperationFormProps {
    operationType: OperationType
    formik: FormikSharedConfig
}

export const OperationForm: React.FC<OperationFormProps> = ({ operationType, formik }) => {
    return (
        <Box>
            {renderFields(operationType, formik)}
        </Box>
    );
}

const renderFields = (operationType: OperationType, formik: FormikSharedConfig) => {
    switch (operationType) {
        case OperationType.ADDITION:
            const additionFields = getAdditionFields(formik);
            return (
                <Box sx={{ mt: 2 }}>
                    <TextField {...additionFields.value1} fullWidth />
                    <TextField {...additionFields.value2} fullWidth sx={{ mt: 2 }} />
                </Box>
            );

        case OperationType.SUBTRACTION:
            const subtractionFields = getSubtractionFields(formik);
            return (
                <Box sx={{ mt: 2 }}>
                    <TextField {...subtractionFields.value1} fullWidth />
                    <TextField {...subtractionFields.value2} fullWidth sx={{ mt: 2 }} />
                </Box>
            );

        case OperationType.MULTIPLICATION:
            const multiplicationFields = getMultiplicationFields(formik);
            return (
                <Box sx={{ mt: 2 }}>
                    <TextField {...multiplicationFields.value1} fullWidth />
                    <TextField {...multiplicationFields.value2} fullWidth sx={{ mt: 2 }} />
                </Box>
            );

        case OperationType.DIVISION:
            const divisionFields = getDivisionFields(formik);
            return (
                <Box sx={{ mt: 2 }}>
                    <TextField {...divisionFields.value1} fullWidth />
                    <TextField {...divisionFields.value2} fullWidth sx={{ mt: 2 }} />
                </Box>
            );

        case OperationType.SQUARE_ROOT:
            const squareRootFields = getSquareRootFields(formik);
            return (
                <Box sx={{ mt: 2 }}>
                    <TextField {...squareRootFields.value} fullWidth />
                </Box>
            );

        case OperationType.RANDOM_STRING:
            const randomStringFields = getRandomStringFields(formik);
            return (
                <Box sx={{ mt: 2 }}>
                    <TextField {...randomStringFields.size} fullWidth />
                </Box>
            );

        default:
            return <></>;
    }
};