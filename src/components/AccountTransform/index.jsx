import { Save } from '@material-ui/icons';
import { IconButton, TextField, Tooltip } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { FaAddressBook } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import accountAPI from '~/api/accountAPI';
import { recipientAPI } from '~/api/recipientAPI';
import { LoadingContext } from '~/providers/LoadingProvider';

import { actGetAccountInfo } from '~/store/action/transferAction';
import CustomModal from '../CustomModal';
import RecipientAccountForm from '../forms/RecipientAccount';
import InputField from '../modules/form/InputField';
import RecipientList from '../RecipientList';

function AccountTransform({ control, name, watch, isUpdate, openModal, setValueForm, handleClickIcon }) {
    //onGetAccountInfo is function get Account info when callAPi get info success
    const location = useLocation();

    const accountInfo = location?.state?.accountInfo;

    const accountVal = watch(name);

    const { showLoading, hideLoading } = useContext(LoadingContext);

    const [open, setOpen] = useState();

    const [openSave, setOpenSave] = useState();

    const [isChooseRecipient, setChooseRecipient] = useState(false);

    const dispatch = useDispatch();

    const { account_info } = useSelector((state) => state.transferReducer);

    useEffect(() => {
        if (accountInfo) {
            setValueForm(name, accountInfo?.recipientAccountNumber);
            fetchAccountInfo(accountInfo?.recipientAccountNumber);
        }
    }, []);

    const fetchAccountInfo = async (accNumber) => {
        showLoading();
        try {
            const res = await accountAPI.getInfoAccountByAccountNumber(accNumber);
            dispatch(
                actGetAccountInfo({
                    fullname: res?.fullName,
                    account_number: res?.accountNumber,
                }),
            );
            hideLoading();
        } catch (error) {
            toast.error(error?.message || 'Có lỗi xảy ra vui lòng thử lại');
            hideLoading();
            dispatch(actGetAccountInfo({}));
        }
    };

    const handleOnBlurInput = () => {
        if (accountVal) {
            fetchAccountInfo(accountVal);
        } else if (!accountVal) {
            dispatch(actGetAccountInfo({}));
        }
        setChooseRecipient(false);
    };

    const handleChooseRecipientAccount = (account) => {
        setValueForm(name, account?.recipientAccountNumber);
        dispatch(
            actGetAccountInfo({
                fullname: account?.recipientAccountName,
                account_number: account?.recipientAccountNumber,
            }),
        );
        //Close modal
        setChooseRecipient(true);
        setOpen(false);
    };

    useEffect(() => {
        if (openModal && isUpdate) {
            fetchAccountInfo();
        }
    }, [openModal, isUpdate]);
    const handleCreateRecipient = async (account, name) => {
        try {
            const result = await recipientAPI.create(account, name);
            setOpenSave(false);

            return toast.success('Tạo tài khoản gợi nhớ thành công');

            // return toast.error('Tạo tài khoản gợi nhớ thất bại');
        } catch (error) {
            // return toast.error('Tạo tài khoản gợi nhớ thất bại');
            return toast.error(error?.message);
        }
    };

    return (
        <>
            <InputField
                control={control}
                name={name}
                label="Số tài khoản"
                disabled={isUpdate}
                InputProps={{
                    onBlur: () => handleOnBlurInput(),
                    endAdornment: (
                        <Tooltip title="Danh sách người nhận">
                            <IconButton edge="end" onClick={() => setOpen(true)}>
                                <FaAddressBook fontSize={'18px'} />
                            </IconButton>
                        </Tooltip>
                    ),
                }}
            />
            {account_info?.fullname && (
                <TextField
                    value={account_info?.fullname}
                    label="Tên người nhận"
                    disabled
                    InputProps={{
                        endAdornment: !isChooseRecipient && (
                            <Tooltip title="Lưu người nhận">
                                <IconButton edge="end" onClick={() => setOpenSave(true)}>
                                    <Save fontSize={'18px'} />
                                </IconButton>
                            </Tooltip>
                        ),
                    }}
                />
            )}

            <CustomModal title={'Danh sách người nhận của bạn'} open={open} setOpen={(value) => setOpen(value)}>
                <RecipientList onChooseRecipient={handleChooseRecipientAccount} />
            </CustomModal>

            <CustomModal title={'Lưu người nhận mới'} open={openSave} setOpen={(value) => setOpenSave(value)}>
                <RecipientAccountForm
                    dataForm={{}}
                    isUpdate={isUpdate}
                    handleCreateRecipient={(account, name) => handleCreateRecipient(account, name)}

                    // handleUpdateRecipient={(id, account, name) => handleUpdateRecipient(id, account, name)}
                />
            </CustomModal>
        </>
    );
}

export default AccountTransform;
