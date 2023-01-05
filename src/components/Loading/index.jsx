import { Box, CircularProgress } from '@mui/material';

const LoadingComponent = ({ inline, text }) => {
    console.log('log');
    return (
        <Box
            sx={{
                backgroundColor: 'rgba(52, 52, 52, 0.2)',
                position: 'fixed',
                zIndex: '10000',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
            }}
        >
            <CircularProgress
                sx={{
                    position: 'absolute',
                    zIndex: '10001',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
                color="success"
            />
        </Box>
    );
};

export default LoadingComponent;
