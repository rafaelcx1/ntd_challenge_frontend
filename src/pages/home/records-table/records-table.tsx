
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton } from "@mui/material";
import { DataGrid, GridCallbackDetails, GridColDef, GridFilterModel, GridPaginationModel, GridRenderCellParams, GridSortModel, GridToolbarQuickFilter, GridTreeNodeWithRender } from "@mui/x-data-grid";
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getAllOperations } from "../../../services/operations/operations-service";
import { deleteRecord, getRecords } from "../../../services/records/records-service";
import { Record } from "../../../services/records/records-types";
import { formatDate } from "../../../utils/date.util";
import { handleApi } from '../../../utils/api-handler.util';

const QuickSearchToolbar = () => {
    return (
        <Box
            sx={{
                p: 0.5,
                pb: 0,
            }}
        >
            <GridToolbarQuickFilter />
        </Box>
    );
}

interface RecordsTableProps {
    onDeleteRecord: (id: number) => void
}

export const RecordsTable: React.FC<RecordsTableProps> = (props) => {
    const [filter, setFilter] = useState<string>('')
    const [sort, setSort] = useState<GridSortModel>([{ field: 'id', sort: 'desc' }])
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        page: 0,
        pageSize: 10
    })

    const operationsQuery = useQuery({
        queryKey: ['operations'],
        queryFn: getAllOperations
    })

    const recordsQuery = useQuery({
        queryKey: ['records', paginationModel, sort, filter],
        queryFn: () => getRecords(filter, { page: paginationModel.page, size: paginationModel.pageSize, sort: getSortString() }),
        placeholderData: keepPreviousData
    })

    const getSortString = () => {
        return sort.map(s => s.field + "," + s.sort).join("&");
    }

    const columns: GridColDef<Record>[] = [
        {
            field: 'id',
            headerName: 'ID',
            width: 90,
            sortable: true
        },
        {
            field: 'operationId',
            headerName: 'Operation',
            width: 150,
            sortable: true,
            valueFormatter: (value: number) => operationsQuery.data?.find(v => v.id === value)?.type,
        },
        {
            field: 'amount',
            headerName: 'Amount',
            width: 150,
            type: 'number',
            sortable: true,
            valueFormatter: (value) => `$${(value as number).toFixed(2)}`
        },
        {
            field: 'userBalance',
            headerName: 'User Balance',
            width: 150,
            type: 'number',
            sortable: true,
            valueFormatter: (value) => `$${(value as number).toFixed(2)}`
        },
        {
            field: 'operationResponse',
            headerName: 'Response',
            width: 200,
            sortable: true
        },
        {
            field: 'date',
            headerName: 'Date (DD/MM/YYYY HH:MM:SS)',
            sortable: true,
            minWidth: 300,
            valueFormatter: (value) => formatDate(new Date(value))
        },
        {
            field: 'actions',
            headerName: '',
            renderCell: (params) => {
                return <IconButton aria-label="delete" color="error" onClick={() => props.onDeleteRecord(params.row.id)}>
                    <DeleteIcon />
                </IconButton>
            }
        }
    ]

    const onFilterChange = (model: GridFilterModel, _: GridCallbackDetails<'filter'>) => {
        const newFilter = model.quickFilterValues?.join(' ') || ''
        setFilter(newFilter)
    };

    const onSortChange = (model: GridSortModel, _: GridCallbackDetails) => {
        setSort(model)
    };

    return (
        <>
            <DataGrid
                disableRowSelectionOnClick
                disableMultipleRowSelection
                disableColumnFilter
                disableColumnSelector
                disableDensitySelector
                columns={columns}
                slots={{ toolbar: QuickSearchToolbar }}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                    },
                }}
                loading={operationsQuery.isLoading || recordsQuery.isLoading}
                rows={recordsQuery.data?.content}

                filterMode="server"
                onFilterModelChange={onFilterChange}

                paginationMode="server"
                rowCount={recordsQuery.data?.page.totalElements}
                pageSizeOptions={[5, 10, 20, 50]}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}

                sortingMode="server"
                onSortModelChange={onSortChange}
                sortModel={sort}
            />
        </>
    );
}