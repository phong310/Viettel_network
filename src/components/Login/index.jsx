
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { LoadingButton } from '@mui/lab'
import { Box, Grid, Container as MContainer, Paper, Stack, TextField, Typography, styled } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { LoginUser } from '../Api/apiRequest'
import settingPng from '/src/assets/settings.png'
import viettelPng from '/src/assets/viettel.png'


export const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const loginSchema = yup.object().shape({
        username: yup.string().required('Không được bỏ trống !'),
        password: yup.string().required('Không được bỏ trống !'),
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsSubmitting(true)
        const loginUser = {
            username: username,
            password: password
        }
        try {
            await loginSchema.validate({ username, password }, { abortEarly: false });
            LoginUser(loginUser, dispatch, navigate)
            setIsSubmitting(false)
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                const newErrors = {};
                error.inner.forEach((e) => {
                    newErrors[e.path] = e.message;
                });
                setErrors(newErrors);
            }
            setIsSubmitting(false)
        }
    }


    return (
        <Container maxWidth="xs">
            <StyledPaper>
                <Stack alignItems="center">
                    <Grid container sx={{ ...gridImg }} gap={1} onClick={() => navigate('/')}>
                        <img src={viettelPng} alt="logo" width={200} />
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
                                        setUsername(e.target.value);
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
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setErrors(prevErrors => ({ ...prevErrors, password: '' }));
                                    }}
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
                        </Grid>

                        <Grid container justifyContent="center">
                            <LoadingButton
                                type="submit"
                                variant="contained"
                                sx={{ ...styleButtonLogin }}
                                onClick={handleLogin}
                                loading={isSubmitting}
                            >
                                Đăng nhập
                            </LoadingButton>
                        </Grid>
                        <Grid container justifyContent="space-around">
                            <Link style={{ textDecoration: 'none', color: '#dd3333' }} to="/register">
                                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                    Tạo tài khoản?
                                </Typography>
                            </Link>
                            <Link style={{ textDecoration: 'none', color: '#dd3333' }} to="#">
                                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                    Quên mật khẩu?
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