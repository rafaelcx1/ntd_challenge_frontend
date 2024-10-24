import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FormikHelpers, useFormik } from "formik";
import { useState } from "react";
import { getAllOperations } from "../../../services/operations/operations-service";
import { handleApi } from "../../../utils/api-handler.util";
import { CreateRecordFormProps, createRecordInitialValues, createRecordValidationSchema } from "./forms/create-record-validation";
import { OperationForm } from "./operation-form";
import { OperationType } from "./enums/operation-type.enum";
import { getOperationApiCall } from "./utils/operation.utils";

interface CreateRecordModalProps {
    open: boolean
    onClose: (concluded: boolean, result: string | null) => void
}

export const CreateRecordModal: React.FC<CreateRecordModalProps> = ({ open, onClose }) => {
    const [selectedOperation, setSelectedOperation] = useState<string>("NONE");

    const operationsQuery = useQuery({
        queryKey: ['operations'],
        queryFn: getAllOperations
    })

    const getSelectedOperation = (): OperationType => {
        return OperationType[selectedOperation as keyof typeof OperationType];
    }

    const isFormValid = () => {
        const selectedOperationType = getSelectedOperation()

        switch (selectedOperationType) {
            case OperationType.ADDITION:
                console.log(formik.errors.addition)
                return !formik.errors.addition
            case OperationType.SUBTRACTION:
                return !formik.errors.subtraction
            case OperationType.MULTIPLICATION:
                return !formik.errors.multiplication
            case OperationType.DIVISION:
                return !formik.errors.division
            case OperationType.SQUARE_ROOT:
                return !formik.errors.squareRoot
            case OperationType.RANDOM_STRING:
                return !formik.errors.randomString
            default:
                return false

        }
    }

    const handleClose = (concluded: boolean, result: string | null) => {
        setTimeout(() => {
            formik.resetForm()
            setSelectedOperation("NONE")
        }, 500);

        onClose(concluded, result)
    }
    
    const onSubmit = async (values: CreateRecordFormProps, helpers: FormikHelpers<CreateRecordFormProps>) => {
        if (!isFormValid()) {
            return
        }

        const selectedOperationType = getSelectedOperation()

        const result = await handleApi(getOperationApiCall(values, selectedOperationType), "Success", helpers.setSubmitting)

        if (result) {
            handleClose(true, result.result as string)
        }
    }

    const formik = useFormik<CreateRecordFormProps>({
        initialValues: createRecordInitialValues,
        validationSchema: createRecordValidationSchema,
        onSubmit: onSubmit
    });


    const handleSelectedOperationChange = (value: string) => {
        formik.resetForm()
        setSelectedOperation(value)
    }

    return (<>
        <Dialog
            open={open}
            onClose={() => handleClose(false, null)}
        >
            <DialogTitle>Operation</DialogTitle>
            <DialogContent sx={{ width: "400px" }}>
                <DialogContentText>
                    Choose the operation you want to make:
                </DialogContentText>
                <FormControl fullWidth variant="outlined" margin="normal" sx={{ mt: "30px" }}>
                    <InputLabel id="operation-label">Select Operation</InputLabel>
                    <Select
                        labelId="operation-label"
                        value={selectedOperation}
                        onChange={(e) => handleSelectedOperationChange(String(e.target.value))}
                        label="Select Operation"
                    >
                        <MenuItem key={null} value={"NONE"}>
                            <em>None</em>
                        </MenuItem>
                        {operationsQuery.data?.map(operation => (
                            <MenuItem key={operation.id} value={operation.type}>{operation.type?.replace("_", " ") + ` (Cost: $ ${operation.cost.toFixed(2)})`}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <OperationForm operationType={getSelectedOperation()} formik={formik} />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose(false, null)} disabled={formik.isSubmitting}>Cancel</Button>
                <Button onClick={() => onSubmit(formik.values, formik)} disabled={formik.isSubmitting || !isFormValid()}>Get Result</Button>
            </DialogActions>
        </Dialog>
    </>)
}