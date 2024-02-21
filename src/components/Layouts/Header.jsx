import { Box, Button, Grid, Typography, Drawer, List, ListItem, ListItemButton, Divider, Link } from '@mui/material'
import PhoneForwardedOutlinedIcon from '@mui/icons-material/PhoneForwardedOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import React, { useState } from 'react'
import styled from '@emotion/styled';
import { HeaderMobile } from './HeaderMobile';
import Home from '../Home/Home';
import Data4g from '../Page/Data4g';
import DataSieuToc from '../Page/DataSieuToc';
import ComboData from '../Page/ComboData';
import DataOffer from '../Page/DataOffer';

const CircleIconWrapper = styled(Box)({
    borderRadius: 50,
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
    color: '#cf2e2e',
    transition: 'color 0.3s',
    '&:hover': {
        cursor: 'pointer',
        backgroundColor: '#CFCFCF',
    },
});

const menuList = [
    {
        name: 'Đăng ký 3G 4G',
        target: 'dang-ky-4g',
        component: <Data4g />
    },
    {
        name: 'Combo',
        target: 'combo',
        component: <ComboData />
    },
    {
        name: 'Siêu tốc',
        target: 'sieu-toc',
        component: <DataSieuToc />
    },
    {
        name: 'Ưu đãi',
        target: 'uu-dai',
        component: <DataOffer />
    },
    {
        name: 'Tin tức',
        target: 'tin-tuc',
    },
    {
        name: 'Khuyến mãi',
        target: 'khuyen-mai',
    }
];

export default function Header() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleDrawerToggle = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const smoothScrollTo = (target) => {
        const targetElement = document.getElementById(target);
        const targetOffset = targetElement.offsetTop;
        const startPosition = window.scrollY;
        const distance = targetOffset - startPosition;
        const duration = 1000; // Thời gian cuộn (ms)

        let start = null;

        const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const percentage = Math.min(progress / duration, 1);

            window.scrollTo(0, startPosition + distance * percentage);

            if (progress < duration) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    };

    const reloadPage = () => {
        window.location.reload();
    };

    return (
        <Box>
            <Grid container spacing={3} sx={{ ...styleBoxContainer, display: { xs: 'none', sm: 'none', md: 'flex', } }}>
                <Grid item sm={12} md={4} lg={2} sx={{ ...styleImg }} onClick={reloadPage}>
                    <img src='https://3g4gviettel.vn/wp-content/uploads/2022/06/logo-3g4gviettel-vn.png' style={{ width: 200, height: 26 }} />
                </Grid>
                <Grid sm={12} md={4} lg={6} item sx={{ ...styleGridMenu }}>
                    {menuList.map((item, index) => {
                        return (
                            <Grid sx={{ ...styleMenu }} key={index}>
                                <Button onClick={() => smoothScrollTo(item.target)} sx={{ ...styleButtonMenu }}>{item.name}</Button>
                            </Grid>
                        )
                    })}
                    <Grid sx={{ ...styleMenuSearch }}>
                        <Button sx={{
                            ...styleTypoMenu
                        }}><SearchOutlinedIcon /></Button>

                    </Grid>
                </Grid>
                <Grid sm={12} md={4} lg={1} item sx={{ ...styleGridPhone }}>
                    <Grid item>
                        <CircleIconWrapper>
                            <PhoneForwardedOutlinedIcon />
                        </CircleIconWrapper>
                    </Grid>
                    <Grid item>
                        <Typography sx={{ color: "white", fontSize: 22, fontWeight: 600 }}>18008098</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <HeaderMobile isDrawerOpen={isDrawerOpen} menuList={menuList} handleDrawerToggle={handleDrawerToggle} smoothScrollTo={smoothScrollTo}/>
            <Grid container>
                <img src='https://3g4gviettel.vn/wp-content/uploads/2023/05/dang-ky-3g-4g-viettel-goi-cuoc-hot-nhat-1.jpg' style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                    maxWidth: '100%',
                    maxHeight: '100%',
                }} />
            </Grid>
            <Grid container justifyContent={'center'} alignContent={'center'} alignItems={'center'} sx={{ mt: 4, px:2 }}>
                <Typography sx={{ ...styleTypoRed, }}>
                    Gói cước cũ của bạn sẽ tự động gia hạn nếu còn đủ tiền trong tài khoản chính.
                    Để kiểm tra gói cước cũ, soạn tin KTTK gửi 191
                </Typography>
            </Grid>
            <Home sectionIds={menuList} />
        </Box>
    )
}

const styleBoxContainer = {
    bgcolor: '#dd3333',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    alignContents: 'center'
}

const styleMenu = {
    borderRadius: 2,
    padding: '4px 10px',
    bgcolor: '#8d0000',
    color: 'white',
}
const styleMenuSearch = {
    borderRadius: 2,
    bgcolor: '#8d0000',
    color: 'white',
}

const styleTypoMenu = {
    fontWeight: 600,
    textTransform: "uppercase",
    fontSize: 15,
    color: 'white'

}

const styleGridMenu = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 1,
    flexWrap: 'wrap',
    transition: 'color 0.3s',
}

styleGridMenu[':hover'] = {
    cursor: 'pointer',
};

const styleGridPhone = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 1,
}

const styleImg = {
    display: 'block'
}

styleImg[':hover'] = {
    cursor: 'pointer'
}

const styleTypoRed = {
    border: '2px dashed red',
    borderRadius: 2,
    padding: '10px 40px',
    display: 'flex',
    alignItems: 'center',
    height: 'auto',
    color: 'red',
}

const styleButtonMenu = {
    borderRadius: 2,
    padding: '0 10px',
    bgcolor: '#8d0000',
    color: 'white',
    fontWeight: 600,
    textTransform: "uppercase",
    fontSize: 15
}