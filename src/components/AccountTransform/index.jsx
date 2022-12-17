import { IconButton, TextField } from '@mui/material';
import { useEffect } from 'react';
import { FaAddressBook } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { actGetAccountInfo } from '~/store/action/transferAction';
import InputField from '../modules/form/InputField';

function AccountTransform({ control, name, watch, isUpdate, openModal }) {
    //onGetAccountInfo is function get Account info when callAPi get info success

    const accountVal = watch(name);

    const dispatch = useDispatch();

    const { account_info } = useSelector((state) => state.transferReducer);

    const fetchAccountInfo = async (accNumber) => {
        try {
            //Call API

            dispatch(
                actGetAccountInfo({
                    fullname: 'TRAN THI LUNG LINH',
                    account_number: accountVal,
                }),
            );
        } catch (error) {
            console.log(error);
            dispatch(actGetAccountInfo({}));
        }
    };

    const handleOnBlurInput = () => {
        if (accountVal) {
            fetchAccountInfo();
        } else {
            dispatch(actGetAccountInfo({}));
        }
    };

    useEffect(() => {
        if (openModal && isUpdate) {
            fetchAccountInfo();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openModal, isUpdate]);

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
                        <IconButton edge="end">
                            <FaAddressBook fontSize={'18px'} />
                        </IconButton>
                    ),
                }}
            />
            {account_info?.fullname && <TextField value={account_info?.fullname} label="Tên người nhận" disabled />}
        </>
    );
}

export default AccountTransform;
