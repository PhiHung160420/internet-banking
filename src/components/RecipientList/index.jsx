import { Box, Stack } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { recipientAPI } from '~/api/recipientAPI';
import { PAGINATION } from '~/constant/pagination';
import { LoadingContext } from '~/providers/LoadingProvider';
import CardAccount from '../CardAccount';

function RecipientList({ onChooseRecipient }) {
    const [recipientList, setRecipientList] = useState([]);
    const { showLoading, hideLoading } = useContext(LoadingContext);
    const getListRecipient = async () => {
        showLoading();
        const payload = {
            page: PAGINATION.PAGE,
            size: 999,
            sort: 'createdAt,desc',
        };
        try {
            const res = await recipientAPI.getList(payload);
            setRecipientList(res?.content);
            hideLoading();
        } catch (error) {
            console.log(error);
            hideLoading();
        }
    };

    useEffect(() => {
        getListRecipient();
    }, []);

    return (
        <Stack>
            {recipientList.map((item) => (
                <Box
                    sx={{
                        cursor: 'pointer',
                        '&:hover': {
                            bgcolor: 'action.selected',
                            ml: -3,
                            mr: -3,
                            pl: 3,
                            pr: 3,
                        },
                    }}
                    onClick={() => onChooseRecipient(item)}
                >
                    <CardAccount
                        sx={{ p: 2 }}
                        fullname={item?.recipientAccountName}
                        account={item?.recipientAccountNumber}
                    />
                </Box>
            ))}
        </Stack>
    );
}

export default RecipientList;
