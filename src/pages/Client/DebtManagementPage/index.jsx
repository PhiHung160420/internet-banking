import { filter } from 'lodash';
import { useEffect, useState } from 'react';
// @mui
import {
    Avatar,
    Box,
    Card,
    Checkbox,
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

// sections
// mock
import { useConfirm } from 'material-ui-confirm';
import { useSnackbar } from 'notistack';
import CustomModal from '~/components/CustomModal';
import DebtReminderForm from '~/components/forms/DebtReminderForm';
import HeaderAction from '~/components/HeaderAction';
import Iconify from '~/components/iconify';
import Label from '~/components/label';
import Scrollbar from '~/components/scrollbar';
import TableListHead from '~/components/Table/TableListHead';
import TableListToolbar from '~/components/Table/TableListToolbar';
import { DELETE, FORMAT_NUMBER } from '~/constant';
import USERLIST from '~/_mock/user';

import { FcMoneyTransfer } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { routesConfig } from '~/config/routesConfig';
import { debtRemindersAPI } from '~/api/debtReminderAPI';
import { PAGINATION } from '~/constant/pagination';
import { dateTimeConverter } from '~/utils/util';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'debtAccountNumber', label: 'Số tài khoản nợ', alignRight: false },
    { id: 'amount', label: 'Số tiền', alignRight: false },
    { id: 'content', label: 'Nội dung', width: 300 },
    { id: 'createdAt', label: 'Ngày tạo' },
    { id: '', label: 'Thao tác', alignRight: true },
];

// ----------------------------------------------------------------------

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

export default function DebtManagementPage() {
    const [modalState, setModalState] = useState({
        open: false,
        data: {},
    });

    const [open, setOpen] = useState(null);

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [orderBy, setOrderBy] = useState('name');

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [listDebtReminder, setListDebtReminder] = useState([]);
    const [pagination, setPagination] = useState({
        page: PAGINATION.PAGE,
        size: PAGINATION.SIZE,
        totalElements: 10,
        totalPages: 1,
    });

    const getListDebtReminder = async () => {
        const payload = {
            pageable: {
                page: pagination.page,
                size: pagination.size,
                sort: 'createdAt,desc',
            },
            createdByMyself: false,
        };

        try {
            const listDebt = await debtRemindersAPI.getList(payload);
            setListDebtReminder(listDebt?.content);

            if (!!listDebt?.content) {
                const paginationRes = {
                    ...pagination,
                    page: listDebt?.pageable?.pageNumber,
                    totalElements: listDebt?.totalElements,
                    totalPages: listDebt?.totalPages,
                };
                setPagination(paginationRes);
            }
        } catch (error) {
            console.log('get list debt reminder error >>> ', error);
        }
    };

    useEffect(() => {
        getListDebtReminder();
    }, [pagination.page, pagination.size]);

    const handleOpenMenu = (event, row) => {
        setOpen(event.currentTarget);
        setModalState((prev) => ({
            data: row,
            open: false,
        }));
    };

    const handleCloseMenu = () => {
        setOpen(null);
        setModalState((prev) => ({
            data: {},
            open: false,
        }));
    };

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

    const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), '');

    const isNotFound = !filteredUsers.length;
    const confirm = useConfirm();
    const { enqueueSnackbar } = useSnackbar();

    const handleConfirm = (fullname) => {
        confirm({
            description: (
                <Box component="p">
                    Xóa nợ này sẽ gửi thông báo đến{' '}
                    <Typography component="span" variant="h5">
                        {fullname}
                    </Typography>{' '}
                    bạn có chắc chắn thực hiện?
                </Box>
            ),
        })
            .then(async () => {
                enqueueSnackbar('Xóa thành công, thông báo đã được gửi!', {
                    variant: 'success',
                });
            })
            .catch(() => {
                /* ... */
                enqueueSnackbar('Xóa thất bại', {
                    variant: 'error',
                });
            });
    };

    const navigate = useNavigate();
    const handleNavigatePaymentDebt = () => {
        navigate(routesConfig.debtPayment('data-moi-ne'));
    };

    return (
        <>
            <Container>
                <HeaderAction
                    text={{
                        label: 'Danh sách nợ',
                        button: 'Thêm nhắc nợ',
                    }}
                />

                <Card>
                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <TableListHead
                                    isShowCheckBox={false}
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={listDebtReminder.length}
                                    onRequestSort={handleRequestSort}
                                />
                                <TableBody>
                                    {listDebtReminder
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                            const { id, accountNumber, content, amount, createdAt } = row;

                                            return (
                                                <TableRow
                                                    hover
                                                    key={id}
                                                    tabIndex={-1}
                                                >
                                                    <TableCell align="left">
                                                        <Label sx={{ textTransform: 'none' }}>
                                                            {accountNumber}
                                                        </Label>
                                                    </TableCell>

                                                    <TableCell align="left">
                                                        <Typography variant="subtitle2" noWrap>
                                                            {FORMAT_NUMBER.format(amount)} đ
                                                        </Typography>
                                                    </TableCell>

                                                    <TableCell align="left">
                                                        <Typography variant="subtitle2" maxWidth={200}>
                                                            {content}
                                                        </Typography>
                                                    </TableCell>

                                                    <TableCell align="left">
                                                        <Typography variant="subtitle2" noWrap>
                                                            {dateTimeConverter(createdAt)}
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
                                                        No results found for &nbsp;.
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
                <MenuItem sx={{ color: 'error.main' }} onClick={() => handleConfirm(modalState.data?.name)}>
                    <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                    {DELETE}
                </MenuItem>
                <MenuItem sx={{ color: 'success.main' }} onClick={() => handleNavigatePaymentDebt()}>
                    <FcMoneyTransfer style={{ marginRight: '16px', fontSize: '20px' }} />
                    Thanh toán
                </MenuItem>
            </Popover>

            <CustomModal
                open={modalState.open}
                setOpen={(value) =>
                    setModalState((prev) => ({
                        ...prev,
                        open: value,
                    }))
                }
            >
                <DebtReminderForm openModal={modalState.open} dataForm={modalState.data} i />
            </CustomModal>
        </>
    );
}
