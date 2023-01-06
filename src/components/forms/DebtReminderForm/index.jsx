// @mui
import { yupResolver } from '@hookform/resolvers/yup';
import { Label } from '@material-ui/icons';
import { LoadingButton } from '@mui/lab';
import {
    Avatar,
    Box,
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
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { debtRemindersAPI } from '~/api/debtReminderAPI';
import { recipientAPI } from '~/api/recipientAPI';
import AccountTransform from '~/components/AccountTransform';
import CustomModal from '~/components/CustomModal';
import InputField from '~/components/modules/form/InputField';
import TableListHead from '~/components/Table/TableListHead';
import { SUBMIT, UPDATE } from '~/constant';
import { actGetAccountInfo } from '~/store/action/transferAction';
// components

// ----------------------------------------------------------------------

const schema = yup.object().shape({
    account: yup
        .string()
        .required('Số tài khoản không được bỏ trống')
        .matches(/^[0-9]+$/, 'Số tài khoản chỉ chứa kí tự số'),
    amount: yup
        .number()
        .required('Số tiền là bắt buộc')
        .typeError('Số tiền cần chuyển phải là một số')
        .min(10000, 'Số tiền thấp nhất là 10.000 VND'),
});

const TABLE_HEAD = [
    { id: 'name', label: 'Số tài khoản', alignRight: false },
    { id: 'balance', label: 'Tên gợi nhớ', alignRight: false },
];

export default function DebtReminderForm({ dataForm, isUpdate, openModal, handleCloseModal }) {
    const initValue = { account: '', account_name: '' };
    const updateValue = {
        ...initValue,
        account: dataForm.name,
    };
    const { control, handleSubmit, watch, setValue, getValues } = useForm({
        defaultValues: isUpdate ? updateValue : initValue,
        resolver: yupResolver(schema),
    });
    const [visibleRecipientModal, setVisibleRecipientModal] = useState(false);
    const [recipientList, setRecipientList] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const emptyRows = useMemo(() => {
        return page > 0 ? Math.max(0, (1 + page) * rowsPerPage - recipientList.length) : 0;
    }, [recipientList]);

    const getListRecipient = async () => {
        try {
            const result = await recipientAPI.getList();
            if (result?.content) {
                setRecipientList(result?.content);
            }
        } catch (error) {
            console.log('get list recipient error >>> ', error);
        }
    };

    useEffect(() => {
        getListRecipient();
    }, []);

    const onSubmit = async (data) => {
        try {
            const { account, amount, note } = data;
            const submitData = {
                amount,
                content: note || '',
                debtAccountNumber: account,
            };
            const result = await debtRemindersAPI.create(submitData);
            if (result?.id) {
                handleCloseModal();
                return toast.success('Tạo nhắc nợ thành công');
            }
            return toast.error('Tạo nhắc nợ thất bại');
        } catch (error) {
            return toast.error('Tạo nhắc nợ thất bại');
        }
    };

    const dispatch = useDispatch();
    useEffect(() => {
        if (!openModal) {
            dispatch(actGetAccountInfo({}));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openModal]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    return (
        <Box my={2} component={'form'} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                <AccountTransform
                    isUpdate={isUpdate}
                    openModal={openModal}
                    control={control}
                    name="account"
                    watch={watch}
                    handleClickIcon={async () => {
                        setVisibleRecipientModal(true);
                    }}
                />

                <InputField name="amount" label="Số tiền VND" control={control} />

                <InputField name="note" label="Nội dung nhắc nợ" multiline rows={4} control={control} />
            </Stack>

            <LoadingButton sx={{ my: 2 }} fullWidth size="large" type="submit" variant="contained">
                {isUpdate ? UPDATE : SUBMIT}
            </LoadingButton>

            {visibleRecipientModal && (
                <CustomModal
                    open={visibleRecipientModal}
                    setOpen={() => setVisibleRecipientModal(false)}
                    title={'Danh sách người nhận'}
                    maxWidth={'sm'}
                >
                    <TableContainer>
                        <Table>
                            <TableListHead
                                isShowCheckBox={false}
                                order={'asc'}
                                orderBy={'name'}
                                headLabel={TABLE_HEAD}
                                rowCount={recipientList}
                            />
                            <TableBody>
                                {recipientList
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        const { id, recipientAccountName, recipientAccountNumber, reminiscentName } =
                                            row;
                                        return (
                                            <TableRow
                                                hover
                                                key={id}
                                                tabIndex={-1}
                                                sx={{
                                                    cursor: 'pointer',
                                                    background:
                                                        getValues('account') === recipientAccountNumber
                                                            ? '#f0f0f0'
                                                            : '',
                                                }}
                                                onClick={() => {
                                                    setValue('account', recipientAccountNumber);
                                                    setVisibleRecipientModal(false);
                                                }}
                                            >
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
                                                        <div>{recipientAccountNumber}</div>
                                                    </Stack>
                                                </TableCell>

                                                <TableCell align="left">
                                                    <Typography variant="subtitle2" noWrap>
                                                        {reminiscentName}
                                                    </Typography>
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
                        </Table>
                    </TableContainer>
                    <TablePagination
                        labelRowsPerPage="Dòng trên trang"
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={recipientList.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </CustomModal>
            )}
        </Box>
    );
}
