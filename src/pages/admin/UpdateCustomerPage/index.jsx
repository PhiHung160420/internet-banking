import { Box, Container, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AccountProfile } from '~/components/account/account-profile';
import { AccountProfileDetails } from '~/components/account/account-profile-details';
import { routesConfig } from '~/config/routesConfig';
import { ROLE_EMPLOYEE } from '~/constant';

export default function UpdateCustomer() {
    const location = useLocation();
    console.log(location);
    const { dataUser, isUpdate } = location.state;

    const [user, setUser] = useState();
    return (
        <>
            <Container maxWidth="xl">
                <Typography sx={{ mb: 3 }} variant="h4">
                    Cập nhật tài khoản
                </Typography>

                <Grid container spacing={3}>
                    <Grid item lg={4} md={6} xs={12}>
                        <AccountProfile user={user} namePlaceholder={user?.fullName || dataUser?.fullName} />
                    </Grid>

                    <Grid item lg={8} md={6} xs={12}>
                        <AccountProfileDetails
                            role={ROLE_EMPLOYEE}
                            user={dataUser}
                            isUpdate={isUpdate}
                            setUserInfo={(value) => setUser({ ...user, ...value })}
                            redirectUrl={routesConfig.customers}
                        />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
