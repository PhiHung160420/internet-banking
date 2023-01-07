import {
    Box,
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
import { useConfirm } from 'material-ui-confirm';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import accountAPI from '~/api/accountAPI';
import HeaderAction from '~/components/HeaderAction';
import Iconify from '~/components/iconify';
import Label from '~/components/label';
import Scrollbar from '~/components/scrollbar';
import TableListHead from '~/components/Table/TableListHead';
import TableListToolbar from '~/components/Table/TableListToolbar';
import { routesConfig } from '~/config/routesConfig';
import { PAGINATION } from '~/constant/pagination';

const TABLE_HEAD = [
    { id: 'name', label: 'Tên', alignRight: false },
    { id: 'email', label: 'Email', alignRight: false },
    { id: 'phone', label: 'Điện thoại', alignRight: false },
    { id: 'accountNumber', label: 'Số tài khoản', alignRight: false },
    { id: 'active', label: 'Trạng thái', alignRight: false },
    { id: '', label: '', alignRight: false },
];

export default function EmployeeListCustomer() {
    const navigate = useNavigate();

    const confirm = useConfirm();

    const [open, setOpen] = useState(null);

    const [filterName, setFilterName] = useState('');

    const [rowData, setRowData] = useState({});

    const [pagination, setPagination] = useState({
        page: PAGINATION.PAGE,
        size: PAGINATION.SIZE,
        totalElements: 10,
        totalPages: 1,
    });

    const [accountList, setAccountList] = useState([]);

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

            setAccountList(res?.content);

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

    const handleLockAccount = () => {
        confirm({
            description: (
                <Box component="p">
                    Bạn có chắc muốn khoá tài khoản{' '}
                    <Typography component="span" variant="subtitle1">
                        {rowData?.accountNumber}
                    </Typography>{' '}
                    ?
                </Box>
            ),
        })
            .then(async () => {
                const result = await accountAPI.lockById(rowData?.id);

                if (result?.status === 200) {
                    handleCloseMenu();
                    fetchAccountList();

                    toast.success('Khoá tài khoản thành công');
                } else {
                    toast.success('Khoá tài khoản thất bại');
                }
            })
            .catch((error) => {
                toast.error(error?.message);
            });
    };

    const handleUnLockAccount = () => {
        confirm({
            description: (
                <Box component="p">
                    Bạn có chắc muốn mở khoá tài khoản{' '}
                    <Typography component="span" variant="subtitle1">
                        {rowData?.accountNumber}
                    </Typography>{' '}
                    ?
                </Box>
            ),
        })
            .then(async () => {
                const result = await accountAPI.unLockById(rowData?.id);
                if (result?.status === 200) {
                    handleCloseMenu();
                    fetchAccountList();

                    toast.success('Mở khoá tài khoản thành công');
                } else {
                    toast.success('Mở khoá tài khoản thất bại');
                }
            })
            .catch((error) => {
                toast.error(error?.message);
            });
    };

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
                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <TableListHead
                                    isShowCheckBox={false}
                                    headLabel={TABLE_HEAD}
                                    rowCount={accountList?.length}
                                />
                                <TableBody>
                                    {accountList?.map((row) => {
                                        const { fullName, phoneNumber, email, accountNumber, active } = row;
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

                                                <TableCell align="left">
                                                    <Label
                                                        sx={{ cursor: 'pointer' }}
                                                        style={{}}
                                                        color={active ? 'success' : 'error'}
                                                    >
                                                        {active ? 'Đang hoạt động' : 'Bị khoá'}
                                                    </Label>
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

                                {!accountList?.length && (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                                <Paper
                                                    sx={{
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    <Typography variant="h6" paragraph>
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
                {!rowData?.active ? (
                    <MenuItem onClick={handleUnLockAccount}>
                        <Iconify icon={'mdi:account-lock-open-outline'} sx={{ mr: 2 }} />
                        Mở khoá tài khoản
                    </MenuItem>
                ) : (
                    <></>
                )}

                {rowData?.active ? (
                    <MenuItem onClick={handleLockAccount}>
                        <Iconify icon={'mdi:account-lock-outline'} sx={{ mr: 2 }} />
                        Khoá tài khoản
                    </MenuItem>
                ) : (
                    <></>
                )}
            </Popover>
        </>
    );
}
