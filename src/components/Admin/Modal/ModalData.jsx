import CloseIcon from '@mui/icons-material/Close';
import {
    AppBar,
    Box,
    Button,
    Dialog,
    DialogContent,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Toolbar,
    Typography
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as yup from 'yup';

export default function ModalData({ open, setOpen, valueTab, setIsFetching, isEdit, setIsEdit, item, isFetching }) {
    const baseURL = import.meta.env.VITE_API_LOCAL;
    const urlApi = 'data-network/add-new'
    const urlUpdateApi = 'data-network/update'
    const handleClose = () => {
        setOpen(false);
        setIsEdit(false);
        setUserName('')
        setPrice('')
        setNetWork('')
        setSyntax('')
        setPhone('')
        setRegister('')
        setDescription('')
        setErrors('')
        setIsHot(false)
        setIsStaus(false)
    };
    const [username, setUserName] = useState('');
    const [price, setPrice] = useState('');
    const [network, setNetWork] = useState('');
    const [syntax, setSyntax] = useState('');
    const [phone, setPhone] = useState();
    const [register, setRegister] = useState('');
    const [description, setDescription] = useState('');
    const [typeData, setTypeData] = useState('data');
    const [errors, setErrors] = useState({});
    const [isHot, setIsHot] = useState(false);
    const [isStatus, setIsStaus] = useState(false)


    const DataSchema = yup.object().shape({
        username: yup.string().required('Không được bỏ trống !'),
        price: yup.string().required('Không được bỏ trống !'),
        network: yup.string().required('Không được bỏ trống !'),
        syntax: yup.string().required('Không được bỏ trống !'),
        phone: yup.string().required('Không được bỏ trống !'),
        register: yup.string().required('Không được bỏ trống !'),
        description: yup.string().required('Không được bỏ trống !'),
    })

    const handleCallApi = async (e) => {
        e.preventDefault();
        const newData = {
            name: username,
            price: price,
            data: network,
            syntax: syntax,
            phone: phone,
            hot: isHot,
            status: isStatus,
            register: register,
            description: description,
            type: typeData
        }
        try {
            await DataSchema.validate({ username, price, network, syntax, phone, register, description }, { abortEarly: false })
            isEdit ? await axios.put(`${baseURL}${urlUpdateApi}/${item?._id}`, newData) : await axios.post(`${baseURL}${urlApi}`, newData);
            isEdit ? toast.success("Cập nhật gói cước thành công") : toast.success("Thêm mới gói cước thành công");
            setIsFetching(!isFetching)
            setOpen(false)
            handleClose()
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                const newErrors = {};
                error.inner.forEach((e) => {
                    newErrors[e.path] = e.message;
                });
                setErrors(newErrors);
            }
        }
    }

    useEffect(() => {
        if (valueTab == 2) {
            setTypeData('data-combo')
        } else if (valueTab == 3) {
            setTypeData('data-sieutoc')
        } else if (valueTab == 4) {
            setTypeData('data-offer')
        } else {
            setTypeData('data')
        }
    }, [valueTab]);

    useEffect(() => {
        if (isEdit) {
            setUserName(item?.name)
            setPrice(item?.price)
            setNetWork(item?.data)
            setSyntax(item?.syntax)
            setPhone(item?.phone)
            setRegister(item?.register)
            setDescription(item?.description)
            setIsHot(item?.hot)
            setIsStaus(item?.status)
        }
    }, [item, isEdit])


    return (
        <Dialog open={open} maxWidth="md" sx={{ ...styleDialog }}>
            <AppBar sx={{ position: 'relative', bgcolor: '#dd3333' }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ ...styleTextTitle }}>
                        {isEdit ? 'Chỉnh sửa' : 'Thêm mới'}
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
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={username}
                                onChange={(e) => {
                                    setUserName(e.target.value)
                                    setErrors(prevErrors => ({ ...prevErrors, username: '' }));
                                }}
                                fullWidth label="Tên"
                                id="fullWidth"
                                sx={{ ...styleTextField }}
                                error={Boolean(errors.username)}
                                helperText={errors.username || ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={price}
                                onChange={(e) => {
                                    setPrice(e.target.value);
                                    setErrors(prevErrors => ({ ...prevErrors, price: '' }));
                                }}
                                fullWidth
                                label="Giá"
                                id="fullWidth"
                                sx={{ ...styleTextField }}
                                error={Boolean(errors.price)}
                                helperText={errors.price || ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={network}
                                onChange={(e) => {
                                    setNetWork(e.target.value);
                                    setErrors(prevErrors => ({ ...prevErrors, network: '' }));
                                }}
                                fullWidth
                                label="Gói cước"
                                id="fullWidth"
                                sx={{ ...styleTextField }}
                                error={Boolean(errors.network)}
                                helperText={errors.network || ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={syntax}
                                onChange={(e) => {
                                    setSyntax(e.target.value);
                                    setErrors(prevErrors => ({ ...prevErrors, syntax: '' }));
                                }}
                                fullWidth
                                label="Cú pháp"
                                id="fullWidth"
                                sx={{ ...styleTextField }}
                                error={Boolean(errors.syntax)}
                                helperText={errors.syntax || ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={phone}
                                onChange={(e) => {
                                    setPhone(e.target.value);
                                    setErrors(prevErrors => ({ ...prevErrors, phone: '' }))
                                }}
                                fullWidth
                                label="SĐT"
                                id="fullWidth"
                                sx={{ ...styleTextField }}
                                error={Boolean(errors.phone)}
                                helperText={errors.phone || ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={register}
                                onChange={(e) => {
                                    setRegister(e.target.value);
                                    setErrors(prevErrors => ({ ...prevErrors, register: '' }))
                                }}
                                fullWidth
                                label="Tin nhắn"
                                id="fullWidth"
                                sx={{ ...styleTextField }}
                                error={Boolean(errors.register)}
                                helperText={errors.register || ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                    setErrors(prevErrors => ({ ...prevErrors, description: '' }))
                                }}
                                multiline
                                rows={4}
                                maxRows={4}
                                fullWidth
                                label="Mô Tả"
                                sx={{ ...styleTextField }}
                                error={Boolean(errors.description)}
                                helperText={errors.description || ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth sx={{ ...styleTextField }}>
                                <InputLabel id="demo-simple-select-helper-label">Hot</InputLabel>
                                <Select
                                    label='Hot'
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={isHot}
                                    onChange={(e) => setIsHot(e.target.value)}
                                >
                                    <MenuItem value='yes'>Có</MenuItem>
                                    <MenuItem value='no'>Không</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth sx={{ ...styleTextField }}>
                                <InputLabel id="demo-simple-select-helper-label">Trạng thái</InputLabel>
                                <Select
                                    label='Trạng thái'
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={isStatus}
                                    onChange={(e) => setIsStaus(e.target.value)}
                                >
                                    <MenuItem value='active'>Kích hoạt</MenuItem>
                                    <MenuItem value='inactive'>Chưa kích hoạt</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

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
                    <Button variant="contained" sx={{ ...styleBtnAdd }} onClick={handleCallApi}>
                        {isEdit ? 'Cập nhật' : 'Thêm'}
                    </Button>
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
    },
    mb: 4
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

const styleTextField = {
    '& label': {
        color: 'gray',
        fontWeight: 'bold'
    },
    '& label.Mui-focused': {
        color: 'gray',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'gray',
            border: '1px solid'
        },
        '&:hover fieldset': {
            borderColor: 'gray',
            border: '1px solid'
        },
        '&.Mui-focused fieldset': {
            borderColor: 'gray',
            border: '2px solid'
        },
    }
}