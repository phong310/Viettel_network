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

export default function ComboData() {
    const [openModal, setOpenModal] = useState({
        open: false,
        name: '',
        des: ''
    })

    const { open, name, des } = openModal
    const packOfData = [
        {
            name: '3N',
            price: '30.000đ /3 ngày',
            data: '15GB + Gọi',
            syntax: '3N TN',
            phone: 9123,
            hot: false,
            register: 'Soạn 3N TN gửi 9123',
            description: "Gói cước 3N của Viettel là gói cước combo ưu đãi áp dụng cho tất cả thuê bao di động trả trước, trả sau không cần điều kiện. Khi tham gia gói bạn sẽ được nhận đến 5GB/ngày, miễn phí gọi nội mạng dưới 20 phút, 15 phút gọi ngoại mạng, miễn phí nhắn tin nội mạng. Tất cả ưu đãi chỉ có giá 30.000đ/ ngày mà thôi quá rẻ để bạn tận hưởng niềm vui dùng sim cả ngày."
        },
        {
            name: '7N',
            price: '70.000đ /7 ngày',
            data: '35GB + Gọi',
            syntax: '7N TN',
            phone: 9123,
            hot: true,
            register: 'Soạn 7N TN gửi 9123',
            description: 'Gói cước Combo Viettel 1 tuần mới nhất vừa được ra mắt từ ngày 10/06/2022, khi đăng ký gói 7N Viettel bạn sẽ nhận được ưu đãi hấp dẫn bao gồm: 5GB/ngày x 7 ngày, miễn phí 20 phút/ cuộc gọi nội mạng, miễn phí SMS nội mạng, 35 phút ngoại mạng va đặc biệt được miễn phí xem truyền hình trên app TV360 gói Basic trong 1 tuần.'
        },
        {
            name: 'ST90',
            price: '90.000đ /30 ngày',
            data: '30GB',
            syntax: 'ST90 TN',
            phone: 9123,
            hot: true,
            register: 'Soạn ST90 TN gửi 9123',
            description: 'Đăng ký ST90 Viettel là gói cước 4G theo tháng chỉ với 90.000đ bạn sẽ có ngay 30GB/tháng tốc độ cao để truy cập mạng Internet. Mỗi ngày bạn sẽ nhận được 1GB tốc độ cao để sử dụng, đây là mức ưu đãi hấp dẫn cước phí lại vô cùng “hạt dẻ”, nhanh tay đăng ký để cùng trải nghiệm những ưu đãi hấp dẫn.'
        },
        {
            name: 'SD120',
            price: '120.000đ /30 ngày',
            data: '60GB',
            syntax: 'SD120 TN',
            phone: 9123,
            hot: false,
            register: 'Soạn SD120 TN gửi 9123',
            description: 'SD120 Viettel sẽ là 1 lựa chọn hoàn hảo nếu như nhu cầu mỗi ngày của thuê bao là truy cập thường xuyên vào Internet với trữ lượng lên đến 60GB cho cả chu kỳ đăng ký mà giá thành thanh toán chỉ có 120.000đ '
        },
        {
            name: 'ST90',
            price: '90.000đ /30 ngày',
            data: '30GB',
            syntax: 'ST90 TN',
            phone: 9123,
            hot: true,
            register: 'Soạn ST90 TN gửi 9123',
            description: 'Đăng ký ST90 Viettel là gói cước 4G theo tháng chỉ với 90.000đ bạn sẽ có ngay 30GB/tháng tốc độ cao để truy cập mạng Internet. Mỗi ngày bạn sẽ nhận được 1GB tốc độ cao để sử dụng, đây là mức ưu đãi hấp dẫn cước phí lại vô cùng “hạt dẻ”, nhanh tay đăng ký để cùng trải nghiệm những ưu đãi hấp dẫn.'
        },
        {
            name: 'SD120',
            price: '120.000đ /30 ngày',
            data: '60GB',
            syntax: 'SD120 TN',
            phone: 9123,
            hot: false,
            register: 'Soạn SD120 TN gửi 9123',
            description: 'SD120 Viettel sẽ là 1 lựa chọn hoàn hảo nếu như nhu cầu mỗi ngày của thuê bao là truy cập thường xuyên vào Internet với trữ lượng lên đến 60GB cho cả chu kỳ đăng ký mà giá thành thanh toán chỉ có 120.000đ '
        },
    ]

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
                                    {item.hot && <img src='https://goidataviettel.vn/wp-content/uploads/2023/07/goi-cuoc-hot.png' style={imgStyle} />}
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