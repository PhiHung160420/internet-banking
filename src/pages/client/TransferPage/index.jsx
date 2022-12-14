import { Avatar, Card, CardHeader, Grid, IconButton, Typography } from '@mui/material';
import { Container, Stack } from '@mui/system';
import React, { useState } from 'react';
import HeaderAction from '~/components/HeaderAction';
import { menuTransfer } from '~/components/Transfer/data';
import TransferMenu from '~/components/Transfer/TransferMenu';
import { MdMoreVert } from 'react-icons/md';
import TransferForm from '~/components/forms/TransferForm';

function TransferPage() {
    const [selected, setSelected] = useState(menuTransfer[0].type);
    return (
        <>
            <Container>
                <HeaderAction text={{ label: 'Chuyển khoản' }} />

                <Grid container spacing={2}>
                    <Grid item xs={7}>
                        <Stack gap={2} p={4}>
                            <Card>
                                <CardHeader
                                    sx={{ p: 3 }}
                                    avatar={<Avatar aria-label="recipe">R</Avatar>}
                                    action={
                                        <IconButton sx={{ display: 'flex' }} aria-label="settings">
                                            <MdMoreVert sx={{ alignItems: 'center' }} />
                                        </IconButton>
                                    }
                                    title={
                                        <Stack>
                                            <Typography sx={{ fontWeight: 500 }} variant="subtitle1" component={'p'}>
                                                Nguồn tiền
                                            </Typography>
                                            <Typography sx={{ fontWeight: 500 }} variant="subtitle2">
                                                07887818012
                                            </Typography>
                                            <Typography variant="h5">07887818012</Typography>
                                        </Stack>
                                    }
                                />
                            </Card>
                            <Typography ml={2} variant="h5" component="h5">
                                CHUYỂN TIỀN ĐẾN
                            </Typography>

                            <Card sx={{ p: 3 }}>
                                <TransferForm selected={selected} />
                            </Card>
                        </Stack>
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={4}>
                        <TransferMenu selected={selected} setSelected={setSelected} />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default TransferPage;
