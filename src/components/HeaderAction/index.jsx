import { Button, Stack, Typography } from '@mui/material';
import React from 'react';
import Iconify from '../iconify';

function HeaderAction({ text = { label: 'Tiêu đề', button: 'Thêm mới' }, hasAdd }) {
    return (
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
                {text.label}
            </Typography>
            {!!hasAdd && (
                <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                    {text.button}
                </Button>
            )}
        </Stack>
    );
}

export default HeaderAction;
