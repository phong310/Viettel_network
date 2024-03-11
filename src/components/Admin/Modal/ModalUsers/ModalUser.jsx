import CloseIcon from '@mui/icons-material/Close';
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
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
import InputAdornment from '@mui/material/InputAdornment'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { LoadingButton } from '@mui/lab'
import * as yup from 'yup';

export default function ModalUser({ open, setOpen, setIsFetching, isEdit, setIsEdit, item, isFetching }) {
    const baseURL = import.meta.env.VITE_API_PRODUCTS;
    const urlApi = 'user-account/create-new'
    const urlUpdateApi = 'user-account/update'
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [phoneNumber, setPhoneNumber] = useState();
    const [isStatus, setIsStaus] = useState('')
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirm = () => setShowConfirmPass((showConfirm) => !showConfirm)

    const UserSchema = yup.object().shape({
        username: yup.string().required("Không được bỏ trống !"),
        email: yup.string().required("Không được bỏ trống !").email("Email Không hợp lệ"),
        password: yup.string().required("Không được bỏ trống !").min(6, 'Mật khẩu tối thiểu 6 ký tự'),
        confirmPass: yup.string().required("Không được bỏ trống !")
            .oneOf([yup.ref('password'), null], 'Mật khẩu phải trùng khớp'),
        phoneNumber: yup.string().required('Không được bỏ trống !'),
    })

    const handleClose = () => {
        setOpen(false)
        setIsEdit(false);
        setErrors({})
        setUsername('')
        setEmail('')
        setPassword('')
        setConfirmPass('')
        setPhoneNumber('')
        setIsStaus('')
    }

    const handleCallApi = async (e) => {
        e.preventDefault();
        setIsSubmitting(true)
        const newUser = {
            username: username,
            email: email,
            password: password,
            confirm: confirmPass,
            phone: phoneNumber,
            status: isStatus
        }
        try {
            await UserSchema.validate({ username, email, password, confirmPass, phoneNumber }, { abortEarly: false })
            isEdit ? await axios.put(`${baseURL}${urlUpdateApi}/${item?._id}`, newUser) : await axios.post(`${baseURL}${urlApi}`,newUser);
            isEdit ? toast.success('Cập nhật tài khoản thành công !') : toast.success('Thêm mới tài khoản thành công !')
            setIsFetching(!isFetching)
            handleClose()

        } catch (error) {
            if (error instanceof yup.ValidationError) {
                const newErrors = {};
                error.inner.forEach((e) => {
                    newErrors[e.path] = e.message;
                });
                setErrors(newErrors);
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    useEffect(() => {
        if(isEdit) {
            setUsername(item?.username)
            setEmail(item?.email)
            setPassword(item?.password)
            setConfirmPass(item?.confirm)
            setPhoneNumber(item?.phone)
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
                                    setUsername(e.target.value)
                                    setErrors(prevErrors => ({ ...prevErrors, username: '' }));
                                }}
                                fullWidth label="Tên tài khoản"
                                id="fullWidth"
                                sx={{ ...styleTextField }}
                                error={Boolean(errors.username)}
                                helperText={errors.username || ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                    setErrors(prevErrors => ({ ...prevErrors, email: '' }));
                                }}
                                fullWidth label="Email"
                                id="fullWidth"
                                sx={{ ...styleTextField }}
                                error={Boolean(errors.email)}
                                helperText={errors.email || ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                    setErrors(prevErrors => ({ ...prevErrors, password: '' }));
                                }}
                                fullWidth label="Mật khẩu"
                                id="fullWidth"
                                sx={{ ...styleTextField }}
                                error={Boolean(errors.password)}
                                helperText={errors.password || ''}
                                type={showPassword ? 'text' : 'password'}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={confirmPass}
                                onChange={(e) => {
                                    setConfirmPass(e.target.value)
                                    setErrors(prevErrors => ({ ...prevErrors, confirmPass: '' }));
                                }}
                                fullWidth label="Xác nhận mật khẩu"
                                id="fullWidth"
                                sx={{ ...styleTextField }}
                                error={Boolean(errors.confirmPass)}
                                helperText={errors.confirmPass || ''}
                                type={showConfirmPass ? 'text' : 'password'}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowConfirm}
                                                edge="end"
                                            >
                                                {showConfirmPass ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={phoneNumber}
                                onChange={(e) => {
                                    setPhoneNumber(e.target.value)
                                    setErrors(prevErrors => ({ ...prevErrors, phoneNumber: '' }));
                                }}
                                fullWidth label="SĐT"
                                id="fullWidth"
                                sx={{ ...styleTextField }}
                                error={Boolean(errors.phoneNumber)}
                                helperText={errors.phoneNumber || ''}
                            />
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
                    <LoadingButton type="submit" variant="contained" sx={{ ...styleBtnAdd }} loading={isSubmitting} onClick={handleCallApi} >
                        {isEdit ? 'Cập nhật' : 'Thêm'}
                    </LoadingButton>
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