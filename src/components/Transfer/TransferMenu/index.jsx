import { Box, Divider, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import React from 'react';
import { menuTransfer } from '../data';

function TransferMenu({ selected, setSelected }) {
    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: 360,
                border: '1px solid black',
                borderRadius: 2,
            }}
        >
            <List
                sx={{ color: 'text.primary', bgcolor: 'action.selected' }}
                component="nav"
                aria-label="main mailbox folders"
            >
                <Typography ml={2} variant="h5" component={'h5'}>
                    Dịch vụ
                </Typography>
            </List>
            <Divider />
            <List component="nav" aria-label="secondary mailbox folder">
                {menuTransfer.map((item) => (
                    <ListItemButton
                        sx={{
                            '&.Mui-selected': {
                                bgcolor: 'action.selected',
                                color: 'text.primary',
                                fontWeight: 'fontWeightBold',
                            },
                        }}
                        divider
                        selected={selected === item.type}
                        onClick={(event) => setSelected(item.type)}
                    >
                        <ListItemText primary={item.title} />
                    </ListItemButton>
                ))}
            </List>
        </Box>
    );
}

export default TransferMenu;
