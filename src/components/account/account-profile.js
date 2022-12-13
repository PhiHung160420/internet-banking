import { Avatar, Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

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

const user = {
    avatar: '/static/images/avatars/avatar_6.png',
    city: 'Los Angeles',
    country: 'USA',
    jobTitle: 'Senior Developer',
    name: 'Katarina Smith',
    timezone: 'GTM-7',
};

export const AccountProfile = (props) => {
    const styles = useStyles();
    return (
        <Card {...props}>
            <CardContent>
                <Box className={styles.leftContainer}>
                    <Avatar src={user.avatar} className={styles.avatar} />

                    <Typography color="textPrimary" gutterBottom variant="h5">
                        {user.name}
                    </Typography>
                </Box>
            </CardContent>
            <Divider />
            <CardActions>
                <Button color="primary" fullWidth variant="text">
                    Tải hình ảnh
                </Button>
            </CardActions>
        </Card>
    );
};
