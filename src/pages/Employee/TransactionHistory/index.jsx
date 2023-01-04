import { filter } from 'lodash';
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

import HeaderAction from '~/components/HeaderAction';
import Label from '~/components/label';
import Scrollbar from '~/components/scrollbar';
import BasicSelect from '~/components/select';
import TableListHead from '~/components/Table/TableListHead';
import TableListToolbar from '~/components/Table/TableListToolbar';
import { TRANSACTION_LIST } from '~/constant';
import USERLIST from '~/_mock/user';
import { useLocation } from 'react-router-dom';
import { PAGINATION } from '~/constant/pagination';
import { transactionAPI } from '~/api/transactionAPI';
import moment from 'moment';
import { handleMaskValue } from '~/utils/format';

const TABLE_HEAD = [
    { id: 'date', label: 'Ngày', alignRight: false },
    { id: 'content', label: 'Nội dung', alignRight: false },
    { id: 'value', label: 'Số tiền giao dịch', alignRight: false },
    { id: 'balance', label: 'Số dư', alignRight: false },
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    if (query) {
        return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}

export default function EmployeeTransactionHistory() {
    const [page, setPage] = useState(0);

    const location = useLocation();

    const dataUser = location?.state?.dataUser;

    const [order, setOrder] = useState('asc');

    const [orderBy, setOrderBy] = useState('name');

    const [filterName, setFilterName] = useState('');

    const [selectedValue, setSelectedValue] = useState(TRANSACTION_LIST[0]);

    const [showSelect, setShowSelect] = useState(false);

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

    const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

    const isNotFound = !filteredUsers.length && !!filterName;

    const [transactions, setTransactions] = useState([]);

    const [pagination, setPagination] = useState({
        page: PAGINATION.PAGE,
        size: PAGINATION.SIZE,
        totalElements: 10,
        totalPages: 1,
    });

    const getAmountType = (type, accountNumber, recipientAccountNumber) => {
        switch (type) {
            case 'DEPOSIT':
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
        };
        try {
            const res = await transactionAPI.findById(dataUser?.id, selectedValue?.value, payload);

            setTransactions(res.content);

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
                    <TableListToolbar
                        isShowSearchInput={false}
                        filterName={filterName}
                        onClickFilter={() => setShowSelect(!showSelect)}
                    />

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
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={transactions.length}
                                    isShowCheckBox={false}
                                    onRequestSort={handleRequestSort}
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
                                                        {handleMaskValue(String(amount))}
                                                    </Label>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Label
                                                        sx={{ textTransform: 'none', cursor: 'pointer' }}
                                                        color={'info'}
                                                    >
                                                        {handleMaskValue(String(balance))}
                                                    </Label>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>

                                {isNotFound && (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                                <Paper
                                                    sx={{
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    <Typography variant="h6" paragraph>
                                                        Not found
                                                    </Typography>

                                                    <Typography variant="body2">
                                                        No results found for &nbsp;
                                                        <br /> Try checking for typos or using complete words.
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
                        labelRowsPerPage="Dòng trên trang"
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={transactions.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Card>
            </Container>
        </>
    );
}
