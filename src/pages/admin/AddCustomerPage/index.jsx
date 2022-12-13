import { useTheme } from '@mui/material/styles';
import { Box, Container, Grid, Typography } from '@mui/material';
import { AccountProfile } from '~/components/account/account-profile';
import { AccountProfileDetails } from '~/components/account/account-profile-details';

export default function AddCustomer() {
    const theme = useTheme();

    return (
        <>
            <Container maxWidth="xl">
                <Typography sx={{ mb: 3 }} variant="h4">
                    Tạo tài khoản
                </Typography>

                <Grid container spacing={3}>
                    <Grid item lg={4} md={6} xs={12}>
                        <AccountProfile />
                    </Grid>

                    <Grid item lg={8} md={6} xs={12}>
                        <AccountProfileDetails />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}