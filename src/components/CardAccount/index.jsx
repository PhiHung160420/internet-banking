import { Avatar, CardHeader } from '@mui/material';

function CardAccount({ fullname, account, sx }) {
    return (
        <CardHeader
            sx={{ p: 3, ...sx }}
            avatar={<Avatar aria-label="recipe">R</Avatar>}
            title={fullname}
            subheader={account}
        />
    );
}

export default CardAccount;
