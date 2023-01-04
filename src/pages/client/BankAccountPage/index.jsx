import { useEffect, useState } from 'react';
// @mui
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
import { useSnackbar } from 'notistack';
import accountAPI from '~/api/accountAPI';
import HeaderAction from '~/components/HeaderAction';
import Iconify from '~/components/iconify';
import Label from '~/components/label';
import Scrollbar from '~/components/scrollbar';
import TableListHead from '~/components/Table/TableListHead';
import TableListToolbar from '~/components/Table/TableListToolbar';
import { PAGINATION } from '~/constant/pagination';

const TABLE_HEAD = [
    { id: 'name', label: 'Tài khoản', alignRight: false },
    { id: 'balance', label: 'Số dư hiện tại', alignRight: false },
    { id: 'status', label: 'Trạng thái', alignRight: false },
    { id: '' },
];

export default function BankAccountPage() {
    const [open, setOpen] = useState(null);

    const [filterName, setFilterName] = useState('');

    const [accounts, setAccounts] = useState([]);

    const [pagination, setPagination] = useState({
        page: PAGINATION.PAGE,
        size: PAGINATION.SIZE,
        totalElements: 10,
        totalPages: 1,
    });

    const handleOpenMenu = (event) => {
        setOpen(event.currentTarget);
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
        setFilterName(event.target.value);
    };

    const isNotFound = !accounts?.length && !!filterName;

    const confirm = useConfirm();
    const { enqueueSnackbar } = useSnackbar();

    const handleConfirm = (account = '222') => {
        confirm({
            description: (
                <Box component="p">
                    Bạn có chắc chọn tài khoản{' '}
                    <Typography component="span" variant="h5">
                        {account}
                    </Typography>{' '}
                    làm tài khoản thanh toán?
                </Box>
            ),
        })
            .then(async () => {
                enqueueSnackbar('Thay đổi tài khoản thanh toán thành công', {
                    variant: 'success',
                });
            })
            .catch(() => {
                enqueueSnackbar('Thay đổi tài khoản thanh toán thất bại', {
                    variant: 'error',
                });
            });
    };

    const fetchAccounts = async () => {
        try {
            const res = await accountAPI.getMyAccounts();
            console.log('res: ', res);

            setAccounts([{ ...res }]);

            // const paginationRes = {
            //     ...pagination,
            //     page: res?.pageable?.pageNumber,
            //     totalElements: res?.totalElements,
            //     totalPages: res?.totalPages,
            // };
            // setPagination(paginationRes);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAccounts();
    }, []);

    return (
        <>
            <Container>
                <HeaderAction
                    text={{
                        label: 'Danh sách tài khoản',
                    }}
                />

                <Card>
                    <TableListToolbar filterName={filterName} onFilterName={handleFilterByName} />

                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <TableListHead isShowCheckBox={false} headLabel={TABLE_HEAD} />
                                <TableBody>
                                    {accounts?.map((row) => {
                                        const { id, accountNumber, type, balance } = row;

                                        return (
                                            <TableRow hover key={id} tabIndex={-1} role="">
                                                <TableCell component="th" scope="row" padding="left">
                                                    <Stack direction="row" alignItems="center">
                                                        <Typography variant="subtitle2" noWrap>
                                                            {accountNumber}
                                                        </Typography>
                                                    </Stack>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Label sx={{ textTransform: 'none' }}>{balance}</Label>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Label
                                                        sx={{ textTransform: 'none', cursor: 'pointer' }}
                                                        color={(type === 'PAYMENT' && 'success') || 'error'}
                                                        onClick={() => handleConfirm(accountNumber)}
                                                    >
                                                        {type === 'PAYMENT'
                                                            ? 'Tài khoản thanh toán'
                                                            : 'Tài khoản thường'}
                                                    </Label>
                                                </TableCell>

                                                <TableCell align="right">
                                                    <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
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
                <MenuItem>
                    <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                    Edit
                </MenuItem>

                <MenuItem sx={{ color: 'error.main' }}>
                    <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                    Delete
                </MenuItem>
            </Popover>
        </>
    );
}
