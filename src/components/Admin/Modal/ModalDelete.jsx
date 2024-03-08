import CloseIcon from '@mui/icons-material/Close';
import {
    AppBar,
    Box,
    Button,
    Dialog,
    DialogContent,
    Grid,
    IconButton,
    Toolbar,
    Typography
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function ModalDelete({ open, setOpen, item, setIsFetching, isFetching, valueTab, isDetail, setIsDetail }) {
    const baseURL = import.meta.env.VITE_API_LOCAL;
    const urlApi = 'data-network'

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            await axios.delete(`${baseURL}${urlApi}/${item?._id}`)
            setIsFetching(!isFetching)
            setOpen(false)
            toast.success("Xóa thành công !")

        } catch (e) {
            console.log("ERR:", e)
            toast.warning("Xóa thất bại !");
        }
    }

    const handleClose = () => {
        setOpen(false)
        setIsDetail(false)
    }



    return (
        <Dialog open={open} maxWidth="lg" sx={{ ...styleDialog }}>
            <AppBar sx={{ position: 'relative', bgcolor: '#dd3333' }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ ...styleTextTitle }}>
                        {isDetail ? 'Chi tiết' : 'Xóa'}
                    </Typography>
                    <IconButton
                        edge="end"
                        color="inherit"
                        aria-label="close"
                        sx={{ ...iconButton }}
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <DialogContent>
                <Box
                    sx={{ ...styleBoxContainer }}
                    component="form"
                    noValidate
                    autoComplete="off"
                >
                    {isDetail ? JSON.stringify(item) : <Typography>Bạn có chắc muốn xóa gói <b style={{ color: '#dd3333' }}>{item?.name}</b> </Typography>}
                </Box>
            </DialogContent>
            <Box
                sx={{ padding: '0px 10px 30px 10px' }}
                component="form"
                noValidate
                autoComplete="off"
            >
                <Grid container spacing={2} justifyContent={'center'} sx={{ gap: 1 }} >
                    <Button variant="outlined" color='error' onClick={handleClose}>
                        Hủy
                    </Button>
                    {
                        !isDetail && <Button variant="contained" sx={{ ...styleBtnAdd }} onClick={handleDelete}>
                            Xóa
                        </Button>
                    }
                </Grid>

            </Box>
        </Dialog>
    )
}

const styleDialog = {
    '.MuiDialogContent-root': { padding: { xs: 1, sm: 2 } },
    '& .MuiDialog-container': {
        '& .MuiDialog-paper': {
            margin: '16px'
        }
    },
}

const styleTextTitle = {
    fontSize: { xs: 14, sm: 16 },
    textTransform: 'uppercase'
}

const iconButton = {
    marginLeft: 'auto'
}

const styleBoxContainer = {
    padding: { xs: '10px 12px', sm: '10px 30px' },
    position: 'relative',
    overflow: 'auto',
    '::-webkit-scrollbar': { width: 4, height: 8 },
    '::-webkit-scrollbar-thumb': {
        backgroundColor: '#F0F0F0'
    }
}

const styleBtnAdd = {
    bgcolor: '#dd3333',
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    '&:hover': {
        bgcolor: '#c50000',
    },
}
