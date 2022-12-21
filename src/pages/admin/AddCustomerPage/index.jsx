import { Box, Container, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { AccountProfile } from '~/components/account/account-profile';
import { AccountProfileDetails } from '~/components/account/account-profile-details';

export default function AddCustomer() {
    const [user, setUser] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        address: '',
        birthday: '',
        password: '',
        confirmPassword: '',
    });

    return (
        <>
            <Container maxWidth="xl">
                <Typography sx={{ mb: 3 }} variant="h4">
                    Tạo tài khoản
                </Typography>

                <Grid container spacing={3}>
                    <Grid item lg={4} md={6} xs={12}>
                        <AccountProfile user={user} />
                    </Grid>

                    <Grid item lg={8} md={6} xs={12}>
                        <AccountProfileDetails user={user} setUserInfo={(value) => setUser({ ...user, ...value })} />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
