import { Avatar, CardHeader } from '@mui/material';

function CardAccount({ fullname, account }) {
    return (
        <CardHeader
            sx={{ p: 3 }}
            avatar={<Avatar aria-label="recipe">R</Avatar>}
            title={fullname}
            subheader={account}
        />
    );
}

export default CardAccount;
