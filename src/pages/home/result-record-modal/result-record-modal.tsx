import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

interface ResultRecordModalProps {
    open: boolean
    result: string | null
    onClose: (createAnotherOperation: boolean) => void
}

export const ResultRecordModal: React.FC<ResultRecordModalProps> = ({ open, result, onClose }) => {
    return (<>
        <Dialog
            open={open}
            onClose={() => onClose(false)}
        >
            <DialogTitle>Operation Result</DialogTitle>
            <DialogContent sx={{ width: "400px" }}>
                <DialogContentText>
                    Result: {result}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClose(false)}>Close</Button>
                <Button onClick={() => onClose(true)}>Create another operation</Button>
            </DialogActions>
        </Dialog>
    </>)
}