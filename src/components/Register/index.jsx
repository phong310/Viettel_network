
import { LoadingButton } from '@mui/lab'
import { Box, Grid, Container as MContainer, Paper, Stack, TextField, Typography, styled } from '@mui/material'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import settingPng from '/src/assets/settings.png'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import axios from 'axios'
import { toast } from 'react-toastify'
import * as yup from 'yup'

export const Register = () => {
    const navigate = useNavigate();
    const baseURL = import.meta.env.VITE_API_LOCAL;
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [errors, setErrors] = useState({});
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;


    const registerSchema = yup.object().shape({
        username: yup.string().required("Không được bỏ trống !"),
        email: yup.string().required("Không được bỏ trống !").email("Email Không hợp lệ"),
        password: yup.string().required("Không được bỏ trống !").min(6, 'Mật khẩu tối thiểu 6 ký tự'),
        confirmPass: yup.string().required("Không được bỏ trống !")
            .oneOf([yup.ref('password'), null], 'Mật khẩu phải trùng khớp'),
    })

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirm = () => setShowConfirmPass((showConfirm) => !showConfirm)

    const handleRegister = async (e) => {
        e.preventDefault();
        const newUser = {
            username: username,
            email: email,
            password: password,
            confirm: confirmPass
        }
        try {
            await registerSchema.validate({ username, email, password, confirmPass }, { abortEarly: false });
            await axios.post(`${baseURL}auth/register`, newUser)
            toast.success("Đăng ký thành công !")
            navigate('/login')

        } catch (error) {
            if (error instanceof yup.ValidationError) {
                const newErrors = {};
                error.inner.forEach((e) => {
                    newErrors[e.path] = e.message;
                });
                setErrors(newErrors);
            } else {
                toast.error("Đăng ký không thành công")
            }
        }
    }



    return (
        <Container maxWidth="xs">
            <StyledPaper>
                <Stack alignItems="center">
                    <Grid container sx={{ ...gridImg }} gap={1} onClick={() => navigate('/')}>
                        <h1 style={{ color: '#dd3333' }}>ĐĂNG KÝ</h1>
                        <img src={settingPng} alt="logo" width={40} />
                    </Grid>

                    <Box component="form" noValidate sx={{ mt: 4 }}>
                        <Grid container sx={{
                            ...styleGridTextField
                        }}>
                            <Grid item xs={12}>
                                <TextField
                                    value={username}
                                    onChange={(e) => {
                                        setUsername(e.target.value)
                                        setErrors(prevErrors => ({ ...prevErrors, username: '' }));
                                    }}
                                    fullWidth
                                    label="Tài khoản"
                                    variant="outlined"
                                    sx={{ ...styleTextField }}
                                    error={Boolean(errors.username)}
                                    helperText={errors.username || ''}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                        setErrors(prevErrors => ({ ...prevErrors, email: '' }));
                                    }}
                                    fullWidth
                                    label="Email"
                                    variant="outlined"
                                    sx={{ ...styleTextField }}
                                    error={Boolean(errors.email)}
                                    helperText={errors.email || ''}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                        setErrors(prevErrors => ({ ...prevErrors, password: '' }));
                                    }}
                                    type={showPassword ? 'text' : 'password'}
                                    fullWidth
                                    label="Mật khẩu"
                                    variant="outlined"
                                    sx={{ ...styleTextField }}
                                    error={Boolean(errors.password)}
                                    helperText={errors.password || ''}
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
                            <Grid item xs={12}>
                                <TextField
                                    value={confirmPass}
                                    onChange={(e) => {
                                        setConfirmPass(e.target.value)
                                        setErrors(prevErrors => ({ ...prevErrors, confirmPass: '' }));
                                    }}
                                    type={showConfirmPass ? 'text' : 'password'}
                                    fullWidth
                                    label="Nhập lại mật khẩu"
                                    variant="outlined"
                                    sx={{ ...styleTextField }}
                                    error={Boolean(errors.confirmPass)}
                                    helperText={errors.confirmPass || ''}
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
                        </Grid>

                        <Grid container justifyContent="center">
                            <LoadingButton
                                type="submit"
                                variant="contained"
                                sx={{ ...styleButtonLogin }}
                                onClick={handleRegister}
                            // loading={isSubmitting}
                            >
                                Tạo tài khoản
                            </LoadingButton>
                        </Grid>
                        <Grid container justifyContent="space-around">
                            <Link style={{ textDecoration: 'none', color: '#dd3333' }} to="/login">
                                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                    Có tài khoản?Đăng nhập
                                </Typography>
                            </Link>

                        </Grid>
                    </Box>
                </Stack>
            </StyledPaper>
        </Container>
    )
}

const Container = styled(MContainer)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
})

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(6, 4),
    borderRadius: theme.spacing(2),
}))

const styleButtonLogin = {
    mt: 3,
    mb: 4,
    height: 50,
    width: 200,
    bgcolor: '#dd3333',
}
styleButtonLogin[':hover'] = {
    bgcolor: '#dd3333',
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
            border: '2px solid'
        },
        '&:hover fieldset': {
            borderColor: 'gray',
            border: '2px solid'
        },
        '&.Mui-focused fieldset': {
            borderColor: 'gray',
            border: '2px solid'
        },
    },
}

const styleGridTextField = {
    justifyContent: "center",
    alignItems: "center",
    alignContent: 'center',
    textAlign: 'center',
    gap: 3
}

const gridImg = {
    justifyContent: 'center',
    alignItems: 'center'
}
gridImg[':hover'] = {
    cursor: 'pointer',
};