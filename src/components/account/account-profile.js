import { Avatar, Box, Card, CardContent, Divider, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { PLACEHOLDER_AVATAR } from '~/constant';

const useStyles = makeStyles({
    leftContainer: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
    },
    avatar: {
        height: 64,
        mb: 2,
        width: 64,
    },
});

export const AccountProfile = (props) => {
    const styles = useStyles();
    const { user, namePlaceholder} = props;

    return (
        <Card {...props}>
            <CardContent>
                <Box className={styles.leftContainer}>
                    <Avatar src={PLACEHOLDER_AVATAR} className={styles.avatar} />

                    <Typography color="textPrimary" gutterBottom variant="h5">
                        {user?.fullName || namePlaceholder || 'Vui lòng nhập tên nhân viên'}
                    </Typography>
                </Box>
            </CardContent>
            <Divider />
        </Card>
    );
};
