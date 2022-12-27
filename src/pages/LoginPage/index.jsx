import { Navigate } from 'react-router-dom';
import { ROLE_KEY } from '~/constant';
// @mui
import { Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import LoginForm from '~/components/forms/LoginForm';
import Logo from '~/components/logo';
import useResponsive from '~/hooks/useResponsive';

const StyledRoot = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));

const StyledSection = styled('div')(({ theme }) => ({
    width: '100%',
    maxWidth: 480,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    boxShadow: theme.customShadows.card,
    backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
}));

function LoginPage() {
    const mdUp = useResponsive('up', 'md');

    return localStorage.getItem(ROLE_KEY) ? (
        <Navigate to={'/'} />
    ) : (
        <>
            <StyledRoot>
                <Logo
                    sx={{
                        position: 'fixed',
                        top: { xs: 16, sm: 24, md: 40 },
                        left: { xs: 16, sm: 24, md: 40 },
                    }}
                />

                {mdUp && (
                    <StyledSection>
                        <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                            {`Chào mừng quý khách \n Đã đến với ngân hàng của chúng tôi`}
                        </Typography>
                        <img src="/assets/illustrations/illustration_login.png" alt="login" />
                    </StyledSection>
                )}

                <Container maxWidth="sm">
                    <StyledContent>
                        <Typography variant="h4" gutterBottom>
                            Đăng nhập
                        </Typography>
                        <LoginForm />
                    </StyledContent>
                </Container>
            </StyledRoot>
        </>
    );
}

export default LoginPage;
