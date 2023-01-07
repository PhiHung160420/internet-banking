import React from 'react';
import { useDispatch } from 'react-redux';
import { authAPI } from '~/api/authAPI';
import { actGetAuthInfo } from '~/store/action/authActions';

function useGetInfo() {
    const dispatch = useDispatch();
    const getAccountInfo = async () => {
        try {
            const res = await authAPI.getInfo();
            dispatch(actGetAuthInfo(res));
        } catch (error) {
            console.log(error);
        }
    };
    return getAccountInfo;
}

export default useGetInfo;
