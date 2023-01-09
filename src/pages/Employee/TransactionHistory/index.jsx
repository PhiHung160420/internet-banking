import { useEffect, useState } from 'react';
// @mui
import {
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

import moment from 'moment';
import { useLocation } from 'react-router-dom';
import { transactionAPI } from '~/api/transactionAPI';
import HeaderAction from '~/components/HeaderAction';
import Label from '~/components/label';
import Scrollbar from '~/components/scrollbar';
import BasicSelect from '~/components/select';
import TableListHead from '~/components/Table/TableListHead';
import TableListToolbar from '~/components/Table/TableListToolbar';
import { TRANSACTION_LIST } from '~/constant';
import { PAGINATION } from '~/constant/pagination';
import { handleMaskValue } from '~/utils/format';

const TABLE_HEAD = [
    { id: 'date', label: 'Ngày', alignRight: false },
    { id: 'content', label: 'Nội dung', alignRight: false },
    { id: 'value', label: 'Số tiền giao dịch', alignRight: false },
    // { id: 'balance', label: 'Số dư', alignRight: false },
];

export default function EmployeeTransactionHistory() {
    const location = useLocation();

    const dataUser = location?.state?.dataUser;

    const [selectedValue, setSelectedValue] = useState(TRANSACTION_LIST[0]);

    const [showSelect, setShowSelect] = useState(false);

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

    const [transactions, setTransactions] = useState([]);

    const [pagination, setPagination] = useState({
        page: PAGINATION.PAGE,
        size: PAGINATION.SIZE,
        totalElements: 10,
        totalPages: 1,
    });

    const getAmountType = (type, accountNumber, recipientAccountNumber) => {
        switch (type) {
            case 'RECEIVE':
                return 'success';
            case 'TRANSFER': {
                if (accountNumber === recipientAccountNumber) {
                    return 'success';
                }
                return 'error';
            }
            default:
                return '';
        }
    };

    useEffect(() => {
        if (selectedValue) {
            fetchTransactionsById();
        }
    }, [selectedValue]);

    const fetchTransactionsById = async () => {
        const payload = {
            page: pagination.page,
            size: pagination.size,
            sort: 'createdAt,desc',
            type: selectedValue?.value,
        };
        try {
            const res = await transactionAPI.findById(dataUser?.id, payload);

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
        fetchTransactionsById();
    }, [pagination.page, pagination.size]);

    return (
        <>
            <Container>
                <HeaderAction
                    text={{
                        label: 'Lịch sử giao dịch',
                    }}
                />

                <Card>
                    <TableListToolbar isShowSearchInput={false} onClickFilter={() => setShowSelect(!showSelect)} />

                    {showSelect ? (
                        <Container style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
                            <BasicSelect
                                label="Giao dịch"
                                selectedValue={selectedValue}
                                handleChangeValue={setSelectedValue}
                                selectList={TRANSACTION_LIST}
                            />
                        </Container>
                    ) : null}

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
                                        const {
                                            accountNumber,
                                            amount,
                                            content,
                                            recipientAccountNumber,
                                            tradingDate,
                                            type,
                                            balance,
                                        } = row;
                                        return (
                                            <TableRow hover key={accountNumber} tabIndex={1} role="checkbox">
                                                <TableCell component="th" scope="row">
                                                    <Stack direction="row" alignItems="center" spacing={2}>
                                                        <Typography variant="subtitle2" noWrap>
                                                            {moment(tradingDate).format('DD/MM/YYYY')}
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
                                                    <Label
                                                        sx={{ cursor: 'pointer' }}
                                                        style={{}}
                                                        color={getAmountType(
                                                            type,
                                                            accountNumber,
                                                            recipientAccountNumber,
                                                        )}
                                                    >
                                                        {handleMaskValue(String(amount))} đ
                                                    </Label>
                                                </TableCell>
                                                {/* <TableCell align="left">
                                                    <Label
                                                        sx={{ textTransform: 'none', cursor: 'pointer' }}
                                                        color={'info'}
                                                    >
                                                        {handleMaskValue(String(balance))} đ
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
                                                    <Typography variant="subtitle1" paragraph>
                                                        Không tồn tại dữ liệu
                                                    </Typography>
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
