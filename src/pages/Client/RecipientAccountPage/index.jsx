import { useEffect, useState } from 'react';
// @mui
import {
    Avatar,
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
    Tooltip,
    Typography,
} from '@mui/material';

// sections
// mock
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import { recipientAPI } from '~/api/recipientAPI';
import CustomModal from '~/components/CustomModal';
import RecipientAccountForm from '~/components/forms/RecipientAccount';
import HeaderAction from '~/components/HeaderAction';
import Iconify from '~/components/iconify';
import Label from '~/components/label';
import Scrollbar from '~/components/scrollbar';
import TableListHead from '~/components/Table/TableListHead';
import { DELETE, EDIT } from '~/constant';
import { PAGINATION } from '~/constant/pagination';
import { useNavigate } from 'react-router-dom';
import { routesConfig } from '~/config/routesConfig';

const TABLE_HEAD = [
    { id: 'name', label: 'Số tài khoản', alignRight: false },
    { id: 'balance', label: 'Tên gợi nhớ', alignRight: false },
    { id: '', label: 'Thao tác', alignRight: true },
];

export default function RecipientAccount() {
    const [modalState, setModalState] = useState({
        open: false,
        data: {},
    });

    const navigate = useNavigate();

    const [isUpdate, setIsUpdate] = useState(false);

    const [open, setOpen] = useState(null);

    const [order, setOrder] = useState('asc');

    const [orderBy, setOrderBy] = useState('name');

    const [filterName, setFilterName] = useState('');

    const [listRecipient, setListRecipient] = useState([]);

    const [rowData, setRowData] = useState({});

    const [pagination, setPagination] = useState({
        page: PAGINATION.PAGE,
        size: PAGINATION.SIZE,
        totalElements: 10,
        totalPages: 1,
    });

    const getListRecipient = async () => {
        const payload = {
            page: pagination.page,
            size: pagination.size,
            sort: 'createdAt,desc',
        };
        try {
            const res = await recipientAPI.getList(payload);

            setListRecipient(res?.content);

            if (!!res?.content) {
                const paginationRes = {
                    ...pagination,
                    page: res?.pageable?.pageNumber,
                    totalElements: res?.totalElements,
                    totalPages: res?.totalPages,
                };
                setPagination(paginationRes);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getListRecipient();
    }, [pagination.page, pagination.size]);

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
        setRowData(row);
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

    // const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

    const isNotFound = !listRecipient?.length && !!filterName;

    const handleCreateRecipient = async (account, name) => {
        try {
            const result = await recipientAPI.create(account, name);
            if (result?.id) {
                setModalState({
                    data: {},
                    open: false,
                });
                getListRecipient();
                return toast.success('Tạo tài khoản gợi nhớ thành công');
            }
            // return toast.error('Tạo tài khoản gợi nhớ thất bại');
        } catch (error) {
            // return toast.error('Tạo tài khoản gợi nhớ thất bại');
            return toast.error(error?.message);
        }
    };

    const handleUpdateRecipient = async (id, account, name) => {
        try {
            const result = await recipientAPI.update(id, account, name);
            if (result?.id) {
                const currRecipient = [...listRecipient]?.map((item) => {
                    if (item?.id === id) {
                        return {
                            ...item,
                            recipientAccountNumber: result?.recipientAccountNumber,
                            reminiscentName: result?.reminiscentName,
                        };
                    }
                    return item;
                });
                setListRecipient(currRecipient);
                setModalState({
                    data: {},
                    open: false,
                });
                return toast.success('Cập nhật tài khoản gợi nhớ thành công');
            }
            // return toast.error('Cập nhật tài khoản gợi nhớ thất bại');
        } catch (error) {
            // return toast.error('Cập nhật tài khoản gợi nhớ thất bại');
            return toast.error(error?.message);
        }
    };

    const handleDeleteRecipient = async (id) => {
        try {
            const result = await recipientAPI.delete(id);
            if (result) {
                setModalState({
                    data: {},
                    open: false,
                });
                setOpen(null);
                getListRecipient();
                return toast.success('Xoá tài khoản gợi nhớ thành công');
            }
            // return toast.error('Xoá tài khoản gợi nhớ thất bại');
        } catch (error) {
            // return toast.error('Xoá tài khoản gợi nhớ thất bại');
            return toast.error(error?.message);
        }
    };

    const handleTransfer = () => {
        navigate(routesConfig.transfer, {
            state: {
                accountInfo: rowData,
            },
        });
    };

    return (
        <>
            <Container>
                <HeaderAction
                    text={{
                        label: 'Danh sách tài khoản người nhận',
                        button: 'Thêm người nhận',
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
                                    rowCount={listRecipient?.length}
                                    onRequestSort={handleRequestSort}
                                />
                                <TableBody>
                                    {listRecipient?.map((row) => {
                                        const { id, recipientAccountNumber, reminiscentName } = row;
                                        return (
                                            <TableRow hover key={id} tabIndex={-1}>
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                    padding="none"
                                                    style={{ paddingLeft: '20px' }}
                                                >
                                                    <Stack direction="row" alignItems="center" spacing={2}>
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

                <MenuItem onClick={handleTransfer}>
                    <Iconify icon={'mdi:hand-coin'} sx={{ mr: 2 }} />
                    Chuyển tiền
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
