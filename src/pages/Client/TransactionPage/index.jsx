import { useEffect, useState } from 'react';
// @mui
import {
    Box,
    Card,
    Container,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow,
    Typography,
} from '@mui/material';

import { transactionAPI } from '~/api/transactionAPI';
import HeaderAction from '~/components/HeaderAction';
import Label from '~/components/label';
import Scrollbar from '~/components/scrollbar';
import BasicSelect from '~/components/select';
import TableListHead from '~/components/Table/TableListHead';
import { DATE_FILTER_LIST, TRANSACTION_LIST } from '~/constant';
import { PAGINATION } from '~/constant/pagination';
import { handleMaskValue } from '~/utils/format';
import { dateTimeConverter } from '~/utils/util';

const TABLE_HEAD = [
    { id: 'date', label: 'Ngày', alignRight: false },
    { id: 'content', label: 'Nội dung', alignRight: false },
    { id: 'value', label: 'Số tiền giao dịch', alignRight: false },
    // { id: 'balance', label: 'Số dư', alignRight: false },
];

export default function TransactionPage() {
    const [transactionType, setTransactionType] = useState(TRANSACTION_LIST[0]);

    const [dateFilter, setDateFilter] = useState(DATE_FILTER_LIST[0]);

    const [transactions, setTransactions] = useState([]);

    const [pagination, setPagination] = useState({
        page: PAGINATION.PAGE,
        size: PAGINATION.SIZE,
        totalElements: 10,
        totalPages: 1,
    });

    const fetchTransactions = async () => {
        const payload = {
            page: pagination.page,
            size: pagination.size,
            sort: 'createdAt,desc',
            type: transactionType?.value,
            startFrom: dateFilter?.start_from,
            endFrom: dateFilter?.end_from,
        };
        try {
            const res = await transactionAPI.getList(payload);

            setTransactions(res?.content);

            const paginationRes = {
                ...pagination,
                page: res?.pageable?.pageNumber,
                totalElements: res?.totalElements,
                totalPages: res?.totalPages,
            };

            setPagination(paginationRes);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, [pagination.page, pagination.size]);

    useEffect(() => {
        setTransactions([]);
        setPagination((prev) => ({
            ...prev,
            page: 1,
        }));
        fetchTransactions();
    }, [transactionType, dateFilter]);

    const handleChangePage = (event, newPage) => {
        setPagination((prev) => ({
            ...prev,
            page: newPage,
        }));
    };

    const handleChangeRowsPerPage = (event) => {
        setPagination((prev) => ({
            ...prev,
            page: 0,
            size: event.target.value,
        }));
    };

    return (
        <>
            <Container>
                <HeaderAction
                    text={{
                        label: 'Lịch sử giao dịch',
                    }}
                />

                <Card>
                    <Container style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 30, marginBottom: 30 }}>
                        <BasicSelect
                            label="Xem theo"
                            selectedValue={dateFilter}
                            handleChangeValue={setDateFilter}
                            selectList={DATE_FILTER_LIST}
                        />
                        <Box ml={2}>
                            <BasicSelect
                                label="Giao dịch"
                                selectedValue={transactionType}
                                handleChangeValue={setTransactionType}
                                selectList={TRANSACTION_LIST}
                            />
                        </Box>
                    </Container>

                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <TableListHead
                                    headLabel={TABLE_HEAD}
                                    rowCount={transactions.length}
                                    isShowCheckBox={false}
                                />
                                <TableBody>
                                    {transactions.map((row) => {
                                        const { id, amount, status, balance, tradingDate, content } = row;
                                        return (
                                            <TableRow hover key={id} tabIndex={1} role="checkbox">
                                                <TableCell component="th" scope="row">
                                                    <Stack direction="row" alignItems="center" spacing={2}>
                                                        <Typography variant="subtitle2" noWrap>
                                                            {dateTimeConverter(tradingDate)}
                                                        </Typography>
                                                    </Stack>
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    <Stack direction="row" alignItems="center" spacing={2}>
                                                        <Typography variant="subtitle2" noWrap>
                                                            {content}
                                                        </Typography>
                                                    </Stack>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Label sx={{ cursor: 'pointer' }} style={{}} color={'success'}>
                                                        {handleMaskValue(amount)} đ
                                                    </Label>
                                                </TableCell>
                                                {/* <TableCell align="left">
                                                    <Label
                                                        sx={{ textTransform: 'none', cursor: 'pointer' }}
                                                        color={'primary'}
                                                    >
                                                        {handleMaskValue(balance)} đ
                                                    </Label>
                                                </TableCell> */}
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>

                                {!transactions?.length && (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                                <Paper
                                                    sx={{
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    <Typography variant="subtitle1">Không tồn tại dữ liệu</Typography>
                                                </Paper>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                )}
                            </Table>
                        </TableContainer>
                    </Scrollbar>

                    <TablePagination
                        labelRowsPerPage="Số dòng"
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={pagination.totalElements}
                        rowsPerPage={pagination.size}
                        page={pagination.page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Card>
            </Container>
        </>
    );
}
