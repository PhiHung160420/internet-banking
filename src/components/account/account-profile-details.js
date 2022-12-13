import { useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, TextField } from '@mui/material';

const states = [
    {
        value: '1',
        label: 'Nhân viên thường',
    },
    {
        value: '2',
        label: 'Nhân viên thu ngân',
    },
    {
        value: '3',
        label: 'Nhân viên kế toán',
    },
];

export const AccountProfileDetails = (props) => {
    const [values, setValues] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        role: '',
    });

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <form autoComplete="off" noValidate {...props}>
            <Card>
                <CardHeader title="Thông tin chi tiết" />
                <Divider />
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item md={12} xs={12}>
                            <TextField
                                fullWidth
                                helperText=""
                                label="Họ tên"
                                name="fullName"
                                onChange={handleChange}
                                required
                                value={values.fullName}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                onChange={handleChange}
                                required
                                value={values.email}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                label="Số điện thoại"
                                name="phone"
                                onChange={handleChange}
                                type="number"
                                value={values.phone}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                label="Địa chỉ"
                                name="country"
                                onChange={handleChange}
                                required
                                value={values.address}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                label="Chức vụ"
                                name="state"
                                onChange={handleChange}
                                required
                                select
                                SelectProps={{ native: true }}
                                value={values.state}
                                variant="outlined"
                            >
                                {states.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        p: 2,
                    }}
                >
                    <Button color="primary" variant="contained">
                        Lưu
                    </Button>
                </Box>
            </Card>
        </form>
    );
};
