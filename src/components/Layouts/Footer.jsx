import { Box, Button, Grid, Typography } from '@mui/material'
import React from 'react'

export default function Footer() {
    return (
        <Box sx={{ bgcolor: '#dd3333', mt:10}}>
            <Grid container justifyContent={'center'} sx={{py:4, px:14}} spacing={2}>
                <Grid item xs={12} sm={4} md={3} lg={2} sx={{ ...styleGridList }} >
                    <h3>Thông tin liên hệ</h3>
                    <img src='https://3g4gviettel.vn/wp-content/uploads/2022/02/logo-3g4gviettel.png' style={{
                        width: '90%',
                        height: 'auto', 
                        objectFit: 'cover',
                        maxWidth: '100%',
                        maxHeight: '100%',
                    }} />
                    <Typography sx={{ fontSize: 12 }}>Đơn vị cung cấp: <b>Viettel</b></Typography>
                </Grid>
                <Grid item xs={12} sm={4} md={3}lg={2} sx={{ ...styleGridList }} >
                    <h3>4g viettel</h3>
                    <Button sx={{ ...styleButton }}>Các gói cước 4g viettel</Button>
                    <Button sx={{ ...styleButton }}>Gói combo nghe gọi viettel</Button>
                    <Button sx={{ ...styleButton }}>Đăng ký 4g ngắn ngày</Button>
                </Grid>
                <Grid item xs={12} sm={4} md={3}lg={2} sx={{ ...styleGridList }} >
                    <h3>3g viettel</h3>
                    <Button sx={{ ...styleButton }}>Các gói cước 3g mimax viettel</Button>
                    <Button sx={{ ...styleButton }}>Kiểm tra dung lượng viettel</Button>
                    <Button sx={{ ...styleButton }}>Mua thêm data viettel</Button>
                </Grid>
                <Grid item xs={12} sm={4} md={3}lg={2} sx={{ ...styleGridList }} >
                    <h3>Tổng đài hỗ trợ</h3>
                    <Typography sx={{ fontSize: 12 }}>Tổng đài Viettel: 28008098 hoặc 198 (miễn phí)</Typography>
                    <Button sx={{ ...styleTerm }}>Điều khoản chung</Button>
                </Grid>

            </Grid>
            <Grid container justifyContent={'center'} sx={{ ...stylelastGrid }}>
                <Typography sx={{ ...stylelastTypo }}> © 2024 by <b style={{textTransform:'uppercase'}}>TheWind-Viettel</b></Typography>
            </Grid>
        </Box>
    )
}

const styleGridList = {
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'flex-start', 
    justifyContent: 'flex-start',
    gap:2,
    color:'white',
    textTransform:'uppercase',
}

const styleButton = {
    border:'1px solid',
    borderRadius: 2,
    padding: '1px 10px',
    color: 'white',
    fontSize: 12
}

styleButton[':hover'] = {
    bgcolor:'white',
    color:'black',
    borderColor: 'white'
}

const styleTerm = {
    color:'white',
    fontWeight:"bold"
}

const stylelastTypo = {
    color:'white',
}

const stylelastGrid = {
    bgcolor: '#8d0000', 
    p: 2, 
    mt: 4
}