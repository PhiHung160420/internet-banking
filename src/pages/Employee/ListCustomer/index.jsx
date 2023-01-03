import { filter } from 'lodash';
import { useEffect, useState } from 'react';
import {
    Card,
    Container,
    IconButton,
    MenuItem,
    Paper,
    Popover,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow,
    Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import accountAPI from '~/api/accountAPI';
import HeaderAction from '~/components/HeaderAction';
import Scrollbar from '~/components/scrollbar';
import TableListHead from '~/components/Table/TableListHead';
import TableListToolbar from '~/components/Table/TableListToolbar';
import { routesConfig } from '~/config/routesConfig';
import { ROLE_KEY } from '~/constant';
import { PAGINATION } from '~/constant/pagination';
import USERS from '~/_mock/user';
import Iconify from '~/components/iconify';

const TABLE_HEAD = [
    { id: 'name', label: 'Tên', alignRight: false },
    { id: 'email', label: 'Email', alignRight: false },
    { id: 'phone', label: 'Điện thoại', alignRight: false },
    { id: 'accountNumber', label: 'Số tài khoản', alignRight: false },
    { id: '', label: '', alignRight: false },
];

export default function EmployeeListCustomer() {
    const navigate = useNavigate();

    const [page, setPage] = useState(0);

    const [open, setOpen] = useState(null);

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [rowData, setRowData] = useState({});

    const [pagination, setPagination] = useState({
        page: PAGINATION.PAGE,
        size: PAGINATION.SIZE,
        totalElements: 10,
        totalPages: 1,
    });

    const [accountList, setAccountList] = useState([]);

    const [filterList, setFilterList] = useState([]);

    const isNotFound = !filterList.length && !!filterName;

    const handleOpenMenu = (event, row) => {
        setOpen(event.currentTarget);
        setRowData(row);
    };

    const handleCloseMenu = () => {
        setOpen(null);
    };

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

    const handleFilterByName = (event) => {
        setPage(0);
        setFilterName(event.target.value);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERS.length) : 0;

    const addCustomer = () => {
        navigate(routesConfig.employeeAddCustomer);
    };

    const handleDeposit = () => {
        navigate(routesConfig.employeeRecharge, {
            state: {
                dataUser: rowData,
            },
        });
    };

    const handleShowHistory = () => {
        navigate(routesConfig.employeeTransaction, {
            state: {
                dataUser: rowData,
            },
        });
    };

    const fetchAccountList = async () => {
        const payload = {
            page: pagination.page,
            size: pagination.size,
            sort: 'createdAt,desc',
        };
        try {
            const res = await accountAPI.getList(payload);

            setAccountList(res.content);

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
        fetchAccountList();
    }, [pagination.page, pagination.size]);

    return (
        <>
            <Container>
                <HeaderAction
                    text={{
                        label: 'Danh sách khách hàng',
                        button: 'Thêm khách hàng',
                    }}
                    hasAdd
                    onClick={addCustomer}
                />

                <Card>
                    <TableListToolbar filterName={filterName} onFilterName={handleFilterByName} />

                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <TableListHead
                                    isShowCheckBox={false}
                                    headLabel={TABLE_HEAD}
                                    rowCount={accountList.length}
                                />
                                <TableBody>
                                    {accountList.map((row) => {
                                        const { fullName, phoneNumber, email, accountNumber } = row;

                                        return (
                                            <TableRow hover key={phoneNumber}>
                                                <TableCell component="th" scope="row" align="left">
                                                    <Stack direction="row" spacing={2}>
                                                        <Typography variant="subtitle2" noWrap>
                                                            {fullName}
                                                        </Typography>
                                                    </Stack>
                                                </TableCell>

                                                <TableCell align="left">
                                                    <Typography variant="subtitle" noWrap>
                                                        {email}
                                                    </Typography>
                                                </TableCell>

                                                <TableCell align="left">
                                                    <Typography variant="subtitle" noWrap>
                                                        {phoneNumber}
                                                    </Typography>
                                                </TableCell>

                                                <TableCell align="left">
                                                    <Typography variant="subtitle" noWrap>
                                                        {accountNumber}
                                                    </Typography>
                                                </TableCell>

                                                <TableCell align="right">
                                                    <IconButton
                                                        size="large"
                                                        color="inherit"
                                                        onClick={(e) => handleOpenMenu(e, row)}
                                                    >
                                                        <Iconify icon={'eva:more-vertical-fill'} />
                                                    </IconButton>
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
                                                        <strong>&quot;{filterName}&quot;</strong>.
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

            <Popover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: {
                        p: 1,
                        '& .MuiMenuItem-root': {
                            px: 1,
                            typography: 'body2',
                            borderRadius: 0.75,
                        },
                    },
                }}
            >
                <MenuItem onClick={handleDeposit}>
                    <Iconify icon={'mdi:instant-deposit'} sx={{ mr: 2 }} />
                    Nạp tiền
                </MenuItem>

                <MenuItem onClick={handleShowHistory}>
                    <Iconify icon={'icon-park-outline:transaction-order'} sx={{ mr: 2 }} />
                    Lịch sử giao dịch
                </MenuItem>
            </Popover>
        </>
    );
}
