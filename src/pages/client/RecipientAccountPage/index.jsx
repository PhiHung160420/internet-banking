import { filter } from 'lodash';
import { useEffect, useState } from 'react';
// @mui
import {
    Card,
    Table,
    Stack,
    Paper,
    Avatar,
    Popover,
    TableRow,
    MenuItem,
    TableBody,
    TableCell,
    Container,
    Typography,
    IconButton,
    TableContainer,
    TablePagination,
    Tooltip,
} from '@mui/material';

// sections
// mock
import USERLIST from '~/_mock/user';
import Iconify from '~/components/iconify';
import Scrollbar from '~/components/scrollbar';
import Label from '~/components/label';
import TableListHead from '~/components/Table/TableListHead';
import HeaderAction from '~/components/HeaderAction';
import { DELETE, EDIT } from '~/constant';
import CustomModal from '~/components/CustomModal';
import RecipientAccountForm from '~/components/forms/RecipientAccount';
import { toast } from 'react-toastify';
import {
    createRecipientAccount,
    deleteRecipientAccount,
    getRecipientAccount,
    updateRecipientAccount,
} from '~/services/recipient';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'name', label: 'Số tài khoản', alignRight: false },
    { id: 'balance', label: 'Tên gợi nhớ', alignRight: false },
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

export default function RecipientAccount() {
    const [modalState, setModalState] = useState({
        open: false,
        data: {},
    });
    const [isUpdate, setIsUpdate] = useState(false);
    const [open, setOpen] = useState(null);
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [listRecipinent, setListRecipinent] = useState([]);

    const getListRecipinent = async () => {
        try {
            const result = await getRecipientAccount();
            if (result?.data) {
                setListRecipinent(result?.data);
            }
        } catch (error) {
            console.log('getListRecipinent error >>> ', error);
        }
    };

    useEffect(() => {
        getListRecipinent();
    }, []);

    const handleOpenModal = (update, data) => {
        setModalState((prev) => ({
            ...prev,
            open: true,
        }));
        setIsUpdate(update);
    };

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

    const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

    const isNotFound = !filteredUsers.length && !!filterName;

    const handleCreateRecipient = async (account, name) => {
        try {
            const result = await createRecipientAccount(account, name);
            if (result?.data?.id) {
                setModalState({
                    data: {},
                    open: false,
                });
                getListRecipinent();
                return toast.success('Tạo tài khoản gợi nhớ thành công');
            }
            return toast.error('Tạo tài khoản gợi nhớ thất bại');
        } catch (error) {
            return toast.error('Tạo tài khoản gợi nhớ thất bại');
        }
    };

    const handleUpdateRecipient = async (id, account, name) => {
        try {
            const result = await updateRecipientAccount(id, account, name);
            if (result?.data?.id) {
                const currRecipient = [...listRecipinent]?.map((item) => {
                    if (item?.id === id) {
                        return {
                            ...item,
                            recipientAccountNumber: result?.data?.recipientAccountNumber,
                            reminiscentName: result?.data?.reminiscentName,
                        };
                    }
                    return item;
                });
                setListRecipinent(currRecipient);
                setModalState({
                    data: {},
                    open: false,
                });
                return toast.success('Cập nhật tài khoản gợi nhớ thành công');
            }
            return toast.error('Cập nhật tài khoản gợi nhớ thất bại');
        } catch (error) {
            return toast.error('Cập nhật tài khoản gợi nhớ thất bại');
        }
    };

    const handleDeleteRecipient = async (id) => {
        try {
            const result = await deleteRecipientAccount(id);
            if (result) {
                setModalState({
                    data: {},
                    open: false,
                });
                setOpen(null);
                getListRecipinent();
                return toast.success('Xoá tài khoản gợi nhớ thành công');
            }
            return toast.error('Xoá tài khoản gợi nhớ thất bại');
        } catch (error) {
            return toast.error('Xoá tài khoản gợi nhớ thất bại');
        }
    };

    return (
        <>
            <Container>
                <HeaderAction
                    text={{
                        label: 'Danh sách tài khoản người nhận',
                        button: 'Thêm thiết lập',
                    }}
                    hasAdd
                    onClick={() => handleOpenModal(false, {})}
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
                                    rowCount={listRecipinent.length}
                                    onRequestSort={handleRequestSort}
                                />
                                <TableBody>
                                    {listRecipinent
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                            const {
                                                id,
                                                recipientAccountName,
                                                recipientAccountNumber,
                                                reminiscentName,
                                            } = row;
                                            return (
                                                <TableRow hover key={id} tabIndex={-1}>
                                                    <TableCell
                                                        component="th"
                                                        scope="row"
                                                        padding="none"
                                                        style={{ paddingLeft: '20px' }}
                                                    >
                                                        <Stack direction="row" alignItems="center" spacing={2}>
                                                            <Tooltip title={recipientAccountName} placement={`top`}>
                                                                <Avatar>{recipientAccountName[0]}</Avatar>
                                                            </Tooltip>
                                                            <Label sx={{ textTransform: 'none' }}>
                                                                {recipientAccountNumber}
                                                            </Label>
                                                        </Stack>
                                                    </TableCell>

                                                    <TableCell align="left">
                                                        <Typography variant="subtitle2" noWrap>
                                                            {reminiscentName}
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
                        labelRowsPerPage="Dòng trên trang"
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={listRecipinent.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
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
                <MenuItem onClick={() => handleOpenModal(true)}>
                    <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                    {EDIT}
                </MenuItem>

                <MenuItem
                    sx={{ color: 'error.main' }}
                    onClick={() => {
                        setModalState((prev) => ({
                            ...prev,
                            open: true,
                            isDelete: true,
                        }));
                    }}
                >
                    <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                    {DELETE}
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
                title={modalState?.isDelete ? 'Xác nhận xoá' : isUpdate ? 'Chỉnh sửa' : 'Tạo mới'}
            >
                {modalState?.isDelete ? (
                    <>
                        <div>Bạn xác nhận xoá dữ liệu này</div>
                        <LoadingButton
                            sx={{ my: 2 }}
                            fullWidth
                            size="large"
                            variant="contained"
                            color="error"
                            onClick={() => handleDeleteRecipient(modalState?.data?.id)}
                        >
                            Xoá
                        </LoadingButton>
                    </>
                ) : (
                    <RecipientAccountForm
                        dataForm={modalState.data}
                        isUpdate={isUpdate}
                        handleCreateRecipient={(account, name) => handleCreateRecipient(account, name)}
                        handleUpdateRecipient={(id, account, name) => handleUpdateRecipient(id, account, name)}
                    />
                )}
            </CustomModal>
        </>
    );
}
