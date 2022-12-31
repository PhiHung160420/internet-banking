import { filter } from 'lodash';
import { useEffect, useState } from 'react';
// @mui
import {
    Box,
    Card,
    Checkbox,
    Container,
    IconButton,
    MenuItem,
    Paper,
    Popover,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow,
    Typography,
} from '@mui/material';
import { useConfirm } from 'material-ui-confirm';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import accountAPI from '~/api/accountAPI';
import HeaderAction from '~/components/HeaderAction';
import Iconify from '~/components/iconify';
import Scrollbar from '~/components/scrollbar';
import TableListHead from '~/components/Table/TableListHead';
import TableListToolbar from '~/components/Table/TableListToolbar';
import { routesConfig } from '~/config/routesConfig';
import { PAGINATION } from '~/constant/pagination';
import USERS from '~/_mock/user';
import { toast } from 'react-toastify';

const TABLE_HEAD = [
    { id: 'name', label: 'Tên', alignRight: false },
    { id: 'email', label: 'Email', alignRight: false },
    { id: 'phone', label: 'Điện thoại', alignRight: false },
    { id: 'birthday', label: 'Ngày sinh', alignRight: false },
    { id: 'address', label: 'Địa chỉ', alignRight: false },
    { id: '', label: '', alignRight: false },
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

export default function ListEmployee() {
    const navigate = useNavigate();

    const confirm = useConfirm();

    const [open, setOpen] = useState(null);

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [selected, setSelected] = useState([]);

    const [orderBy, setOrderBy] = useState('name');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [rowData, setRowData] = useState({});

    const handleOpenMenu = (event, row) => {
        setOpen(event.currentTarget);
        setRowData(row);
    };

    const handleCloseMenu = () => {
        setOpen(null);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = USERS.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };

    const handleConfirm = (account) => {
        confirm({
            description: (
                <Box component="p">
                    Bạn có chắc muốn xoá tài khoản{' '}
                    <Typography component="span" variant="h6">
                        {account}
                    </Typography>{' '}
                    ?
                </Box>
            ),
        })
            .then(async () => {
                const result = await accountAPI.delete(rowData.id);
                console.log('result: ', result);
                if (result?.status === 200) {
                    handleCloseMenu();
                    fetchAccountList();
                    // enqueueSnackbar('Xoá tài khoản thành công', {
                    //     variant: 'success',
                    // });
                    toast.success('Xoá tài khoản thành công');
                } else {
                    // enqueueSnackbar('Xoá tài khoản thất bại', {
                    //     variant: 'error',
                    // });
                    toast.success('Xoá tài khoản thất bại');
                }
            })
            .catch(() => {
                return;
            });
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

    const filteredUsers = applySortFilter(USERS, getComparator(order, orderBy), filterName);

    const isNotFound = !filteredUsers.length && !!filterName;

    const addCustomer = () => {
        navigate(routesConfig.addEmployee);
    };

    const updateCustomer = () => {
        navigate(routesConfig.updateEmployee, {
            state: {
                dataUser: rowData,
                isUpdate: true,
            },
        });
    };

    const [accountList, setAccountList] = useState([]);

    const [pagination, setPagination] = useState({
        page: PAGINATION.PAGE,
        size: PAGINATION.SIZE,
        totalElements: 10,
        totalPages: 1,
    });
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
                        label: 'Danh sách nhân viên',
                        button: 'Thêm nhân viên',
                    }}
                    hasAdd
                    onClick={addCustomer}
                />

                <Card>
                    <TableListToolbar
                        numSelected={selected.length}
                        filterName={filterName}
                        onFilterName={handleFilterByName}
                    />

                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <TableListHead
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={USERS.length}
                                    numSelected={selected.length}
                                    onRequestSort={handleRequestSort}
                                    onSelectAllClick={handleSelectAllClick}
                                />
                                <TableBody>
                                    {accountList.map((row) => {
                                        const { fullName, phoneNumber, address, email, birthday } = row;
                                        const selectedUser = selected.indexOf(phoneNumber) !== -1;
                                        console.log('row": ', row);
                                        return (
                                            <TableRow
                                                hover
                                                key={phoneNumber}
                                                tabIndex={-1}
                                                role="checkbox"
                                                selected={selectedUser}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        checked={selectedUser}
                                                        onChange={(event) => handleClick(event, phoneNumber)}
                                                    />
                                                </TableCell>

                                                <TableCell component="th" scope="row">
                                                    <Typography variant="subtitle2" noWrap>
                                                        {fullName}
                                                    </Typography>
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
                                                        {moment(birthday).format('DD/MM/YYYY')}
                                                    </Typography>
                                                </TableCell>

                                                <TableCell align="left">
                                                    <Typography variant="subtitle" noWrap>
                                                        {address}
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
                        width: 140,
                        '& .MuiMenuItem-root': {
                            px: 1,
                            typography: 'body2',
                            borderRadius: 0.75,
                        },
                    },
                }}
            >
                <MenuItem onClick={updateCustomer}>
                    <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                    Chỉnh sửa
                </MenuItem>

                <MenuItem onClick={() => handleConfirm('test')} sx={{ color: 'error.main' }}>
                    <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                    Xoá
                </MenuItem>
            </Popover>
        </>
    );
}
