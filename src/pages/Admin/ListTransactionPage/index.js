import { useEffect, useState } from 'react';
// @mui
import {
    Card,
    Table,
    Stack,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    TableContainer,
    TablePagination,
    Box,
} from '@mui/material';
import Scrollbar from '~/components/scrollbar';
import TableListHead from '~/components/Table/TableListHead';
import HeaderAction from '~/components/HeaderAction';
import { transactionAPI } from '~/api/transactionAPI';
import { PAGINATION } from '~/constant/pagination';
import { DATE_FILTER_LIST, FORMAT_NUMBER, TRANSACTION_LIST } from '~/constant';
import BasicSelect from '~/components/select';
import { dateTimeConverter } from '~/utils/util';

const TABLE_HEAD = [
    { id: 'tradingDate', label: 'Ngày tạo', alignRight: false },
    { id: 'accountNumber', label: 'Người chuyển', alignRight: false },
    { id: 'recipientAccountNumber', label: 'Người nhận', alignRight: false },
    { id: 'amount', label: 'Số tiền', alignRight: false },
];

export default function ListTransaction() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

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
        fetchTransactions();
    }, [transactionType, dateFilter]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    return (
        <>
            <Container>
                <HeaderAction
                    text={{
                        label: 'Danh sách giao dịch',
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
                                    isShowCheckBox={false}
                                    headLabel={TABLE_HEAD}
                                    rowCount={transactions.length}
                                />
                                <TableBody>
                                    {transactions
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                            const { id, accountNumber, recipientAccountNumber, amount, tradingDate } =
                                                row;
                                            return (
                                                <TableRow hover key={id}>
                                                    <TableCell align="left">
                                                        <Typography variant="subtitle" noWrap>
                                                            {dateTimeConverter(tradingDate)}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <Stack direction="row" alignItems="center">
                                                            <Typography variant="subtitle" noWrap>
                                                                {accountNumber}
                                                            </Typography>
                                                        </Stack>
                                                    </TableCell>

                                                    <TableCell align="left">
                                                        <Typography variant="subtitle" noWrap>
                                                            {recipientAccountNumber}
                                                        </Typography>
                                                    </TableCell>

                                                    <TableCell align="left">
                                                        <Typography variant="subtitle" noWrap>
                                                            {FORMAT_NUMBER.format(amount)} đ
                                                        </Typography>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
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
