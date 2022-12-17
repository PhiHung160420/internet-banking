import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';

function CustomModal({ open, setOpen, title, closeModalFunc, children, ...props }) {
    const handleClose = () => {
        closeModalFunc && closeModalFunc();
        setOpen(false);
    };
    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth={'xs'} {...props}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{children}</DialogContent>
        </Dialog>
    );
}

export default CustomModal;
