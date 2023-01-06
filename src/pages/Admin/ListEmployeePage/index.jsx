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
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import accountAPI from '~/api/accountAPI';
import HeaderAction from '~/components/HeaderAction';
import Iconify from '~/components/iconify';
import Scrollbar from '~/components/scrollbar';
import TableListHead from '~/components/Table/TableListHead';
import TableListToolbar from '~/components/Table/TableListToolbar';
import { routesConfig } from '~/config/routesConfig';
import { ROLE_KEY } from '~/constant';
import { PAGINATION } from '~/constant/pagination';
import USERS from '~/_mock/user';

const TABLE_HEAD = [
    { id: 'name', label: 'Tên', alignRight: false },
    { id: 'email', label: 'Email', alignRight: false },
    { id: 'phone', label: 'Điện thoại', alignRight: false },
    { id: 'birthday', label: 'Ngày sinh', alignRight: false },
    { id: 'address', label: 'Địa chỉ', alignRight: false },
    { id: '', label: '', alignRight: false },
];

export default function ListEmployee() {
    const navigate = useNavigate();

    const confirm = useConfirm();

    const [open, setOpen] = useState(null);

    const [filterName, setFilterName] = useState('');

    const [rowData, setRowData] = useState({});

    const handleOpenMenu = (event, row) => {
        setOpen(event.currentTarget);
        setRowData(row);
    };

    const handleCloseMenu = () => {
        setOpen(null);
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
                if (result?.status === 200) {
                    handleCloseMenu();
                    fetchAccountList();
                    toast.success('Xoá tài khoản thành công');
                } else {
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
        setFilterName(event.target.value);
    };

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
            type: 'ROLE_EMPLOYEE',
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
                                        const { fullName, phoneNumber, address, email, birthday } = row;

                                        return (
                                            <TableRow hover key={phoneNumber} tabIndex={-1} role="checkbox">
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
