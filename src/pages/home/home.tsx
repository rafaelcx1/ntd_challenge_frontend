import AddIcon from '@mui/icons-material/Add';
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Typography
} from '@mui/material';
import React, { useState } from 'react';
import { RecordsTable } from './records-table/records-table';
import { CreateRecordModal } from './create-record-modal/create-record-modal';
import { useQueryClient } from '@tanstack/react-query';
import { ResultRecordModal } from './result-record-modal/result-record-modal';
import { deleteRecord } from '../../services/records/records-service';
import { handleApi } from '../../utils/api-handler.util';


export const Home: React.FC = () => {
    const queryClient = useQueryClient()

    const [openCreateRecordModal, setOpenCreateRecordModal] = useState<boolean>(false)

    const [openResultRecordModal, setOpenResultRecordModal] = useState<boolean>(false)
    const [operationResult, setOperationResult] = useState<string | null>('')

    const onDeleteRecord = async (id: number) => {
        await handleApi(() => deleteRecord(id), "Success", () => null)
        queryClient.invalidateQueries({ queryKey: ['userBalance'] })
        queryClient.invalidateQueries({ queryKey: ['records'] })
    }

    const onCloseCreateRecordModal = (concluded: boolean, result: string | null) => {
        setOpenCreateRecordModal(false)

        if (concluded) {
            setOperationResult(result)
            setOpenResultRecordModal(true)
            queryClient.invalidateQueries({ queryKey: ['userBalance'] })
            queryClient.invalidateQueries({ queryKey: ['records'] })
        }
    }

    const onCloseResultRecordModal = (createAnotherOperation: boolean) => {
        setOpenResultRecordModal(false)

        if (createAnotherOperation)
            setOpenCreateRecordModal(true)
    }

    return (
        <Container component="main" sx={{ marginTop: "40px" }}>
            <Card>
                <CardContent>
                    <Box display="flex" justifyContent="space-between" >
                        <Typography variant="h3">Records</Typography>
                        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => setOpenCreateRecordModal(true)}>
                            Create Operation
                        </Button>
                    </Box>
                    <Box style={{ width: '100%', marginTop: "40px" }}>
                        <RecordsTable onDeleteRecord={onDeleteRecord} />
                    </Box>
                </CardContent>
            </Card>

            <CreateRecordModal open={openCreateRecordModal} onClose={onCloseCreateRecordModal} />
            <ResultRecordModal open={openResultRecordModal} result={operationResult} onClose={onCloseResultRecordModal} />
        </Container>
    );
}