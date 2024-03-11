import { Box, Button, Card, CardActions, CardContent, CardMedia, Divider, Grid, Typography } from '@mui/material'
import SmsIcon from '@mui/icons-material/Sms';
import React from 'react'
import ModalDetail from '../Modal/ModalDetail';
import { useState } from 'react';
import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect } from 'react';
import { getALlCombo } from '../Api/apiRequest';
import { useDispatch, useSelector } from 'react-redux';

export default function ComboData() {
    const [openModal, setOpenModal] = useState({
        open: false,
        name: '',
        des: ''
    })
    const dataUser = useSelector((state) => state.auth.login?.currentUser)
    const dataCombo = useSelector((state) => state.combo.dataComboList?.allData)
    const dispatch = useDispatch()


    const [packOfData, setPackOfData] = useState([])

    const { open, name, des } = openModal

    const showAlertOrSendSMS = (registerInfo, phone, syntax) => {
        const isMobile = window.innerWidth <= 768; // Giả sử độ rộng của thiết bị di động là 768px

        // Nếu là trên thiết bị di động, gửi tin nhắn
        if (isMobile) {
            const message = encodeURIComponent(`${syntax}`);
            window.location.href = `sms:${phone}&body=${message}`;
        } else {
            alert(registerInfo);
        }
    }

    const closeModal = () => {
        setOpenModal({ ...openModal, open: false })
    }

    const handleOpenModal = (newState) => {
        setOpenModal({ ...newState, open: true });
    }


    useEffect(() => {
        getALlCombo(dispatch, dataUser?.accessToken)
        setPackOfData(dataCombo)
    }, [])

    return (
        <Box sx={{ bgcolor: '#dd3333', mt: 10, py: 4 }}>
            <Grid container justifyContent={'center'} sx={{ pb: 4 }}>
                <Grid container alignItems={'center'} justifyContent={'flex-start'} maxWidth={1000} >
                    <Divider orientation="vertical" sx={{ ...styleDivider }} />
                    <Typography sx={{ ...styleTile }}>Gói combo viettel mới ra mắt</Typography>
                </Grid>
            </Grid>
            <Grid container sx={{ ...styleGridContainer }} justifyContent={'center'}>
                <Swiper
                    slidesPerView={4}
                    className="mySwiper"
                    autoplay={{
                        delay: 1200,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                    breakpoints={{
                        1724: {
                            slidesPerView: 4,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                        500: {
                            slidesPerView: 2,
                        },
                        300: {
                            slidesPerView: 1,
                        },
                        100: {
                            slidesPerView: 1,
                        }
                    }}
                >
                    {packOfData.map((item, index) => {
                        return (
                            <SwiperSlide key={index} style={styleSwiper}>
                                <Card sx={{ ...cardContainer }} key={index}>
                                    {item.hot === 'yes' && <img src='https://goidataviettel.vn/wp-content/uploads/2023/07/goi-cuoc-hot.png' style={imgStyle} />}
                                    <CardContent>
                                        <Typography variant="h4" component="div" sx={{ ...typoName }}>
                                            {item.name}
                                        </Typography>
                                        <Divider />
                                        <Typography gutterBottom variant="h5" component="div" sx={{ ...typoPrice }}>
                                            {item.price}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ ...typoData }}>Data: <b style={{ color: '#576C8A' }}>{item.data}</b></Typography>
                                        <Divider />
                                        <Typography gutterBottom variant="h5" component="div" sx={{ ...typoSend }}>
                                            <b style={{ color: '#EE0033' }}>{item.syntax}</b>  gửi <b style={{ color: '#EE0033' }}>{item.phone}</b>
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button variant="contained" endIcon={<SmsIcon />} sx={{ ...buttonSend }} onClick={() => showAlertOrSendSMS(item.register, item.phone, item.syntax)}>Soạn tin</Button>
                                    </CardActions>
                                    <CardActions sx={{ ...cartAction }}>
                                        <Button variant="outlined" color='error' sx={{ ...btnDetail }} onClick={() => handleOpenModal({ name: item.name, des: item.description })}>Chi tiết</Button>
                                    </CardActions>
                                </Card>

                            </SwiperSlide>

                        )
                    })}
                </Swiper>

            </Grid>
            <ModalDetail open={open} handleClose={closeModal} nameOfPack={name} description={des} />
        </Box>
    )
}

const girdTitle = {
    pt: 10,
    pb: 4
}

const styleGridContainer = {
    gap: 4,
    textAlign: 'center',
    px: { xl: 54, lg: 30, md: 10, xs: 0 }
}

const cardContainer = {
    position: 'relative',
    overflow: 'visible',
    maxWidth: 400,
    p: 2,
    transition: 'transform .2s, box-shadow .2s',
    ':hover': {
        cursor: 'pointer',
        boxShadow: '0 0 11px rgba(33,33,33,.2)',
        transform: 'scale(1.05)',
    },
}

const styleSwiper = {
    height: 400,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

const imgStyle = {
    position: 'absolute',
    top: -12,
    right: -24,
    height: 'auto',
    maxWidth: '30%'
}

const styleDivider = {
    mr: 1,
    borderLeft: '5px solid white'
}

const styleTile = {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'uppercase'
}

const typoName = {
    pb: 2,
    color: '#576C8A',
    fontWeight: 'bold',
    fontSize: 28
}

const typoPrice = {
    pt: 1,
    fontSize: 20,
    color: '#EE0033',
    fontWeight: 'bold'
}

const typoData = {
    fontSize: 16,
    color: "#0A0A0A",
    pb: 1
}

const buttonSend = {
    width: '100%',
    bgcolor: '#EE0033',
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    '&:hover': {
        bgcolor: '#c50000',
    },
}

const cartAction = {
    display: 'flex', justifyContent: 'center'
}

const btnDetail = {
    color: '#EE0033',
    fontSize: 12
}

const typoSend = {
    pt: 1,
    fontSize: 16
}