import { Box, Button, Card, CardActions, CardContent, CardMedia, Divider, Grid, Typography } from '@mui/material'
import RedeemIcon from '@mui/icons-material/Redeem';
import LanguageIcon from '@mui/icons-material/Language';
import SmsIcon from '@mui/icons-material/Sms';
import React from 'react'
import { useState } from 'react';
import ModalDetail from '../Modal/ModalDetail';
import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";

export default function DataOffer() {
    const [openModal, setOpenModal] = useState({
        open: false,
        name: '',
        des: ''
    })

    const { open, name, des } = openModal

    const packOfData = [
        {
            name: 'V90C',
            price: '90.000đ /30 ngày',
            data: '30GB + Gọi',
            syntax: 'V90C TN',
            phone: 9123,
            hot: false,
            register: 'Soạn V90C TN gửi 9123',
            description: 'Sở hữu ưu đãi tích hợp với giá cước siêu rẻ khi đăng ký gói cước V90C thì còn gì tuyệt vời hơn. Vậy làm thế nào để đăng ký gói V90C nhận được ngay ưu đãi khủng? Thông tin dưới đây rất chi tiết để khách hàng có thể để dễ dàng đăng ký gói cước khuyến mãi V90C nhanh chóng, đơn giản nhất.'
        },
        {
            name: 'V120B',
            price: '120.000đ /30 ngày',
            data: '45GB + Gọi',
            syntax: 'V120B TN',
            phone: 9123,
            hot: false,
            register: 'Soạn V120B TN gửi 9123',
            description: 'Bạn đang tìm kiếm gói cước để đáp ứng nhu cầu nghe gọi và sử dụng Internet thường xuyên vậy V120B Viettel sẽ không làm bạn thất vọng, với ưu đãi vô cùng hời mức chi phí siêu rẻ , chỉ với 120.000đ cho 1 lần đăng ký thành công , nhanh tay đăng ký gói cước này ngay với cú pháp được để bên dưới bài viết này nhé.'
        },
        {
            name: 'V150B',
            price: '150.000đ /30 ngày',
            data: '60GB + Gọi',
            syntax: 'V150B TN',
            phone: 9123,
            hot: false,
            register: 'Soạn V150B TN gửi 9123',
            description: 'Nếu với trữ lượng 1GB mỗi ngày là chưa đủ với nhu cầu sử dụng mạng của bạn thì V150B Viettel sẽ là cứu cánh ngay cho bạn lúc này , với trữ lượng lên đến 2GB mỗi ngày và miễn phí phút gọi hai chiều , quả là 1 gói cước đáng giá phải không nào.'
        },
        {
            name: 'V200C',
            price: '200.000đ /30 ngày',
            data: '120GB + Gọi',
            syntax: 'V200C TN',
            phone: 9123,
            hot: true,
            register: 'Soạn V200C TN gửi 9123',
            description: 'Gói cước V200C Viettel là một trong các gói combo data điện thoại và SMS khủng nhất của mạng Viettel hiện nay. V200C Viettel được áp dụng cho nhu cầu đăng ký thoại nội mạng kèm data 3G/4G để truy cập internet với giá cước 200.000đ. Khách hàng được tận hưởng 120GB data tốc độ cao, thoại nội mạng thả ga mà không mất phí và có 25GB dữ liệu lưu trữ trên Lifebox, miễn phí xem phim trên Viettel TV. Với những ưu đãi vô cùng hấp dẫn trên, V200C Viettel gần như là một gói cước hoàn hảo thỏa mãn mọi đối tượng và nhu cầu của người dùng'
        },
        {
            name: 'V150B',
            price: '150.000đ /30 ngày',
            data: '60GB + Gọi',
            syntax: 'V150B TN',
            phone: 9123,
            hot: false,
            register: 'Soạn V150B TN gửi 9123',
            description: 'Nếu với trữ lượng 1GB mỗi ngày là chưa đủ với nhu cầu sử dụng mạng của bạn thì V150B Viettel sẽ là cứu cánh ngay cho bạn lúc này , với trữ lượng lên đến 2GB mỗi ngày và miễn phí phút gọi hai chiều , quả là 1 gói cước đáng giá phải không nào.'
        },
        {
            name: 'V200C',
            price: '200.000đ /30 ngày',
            data: '120GB + Gọi',
            syntax: 'V200C TN',
            phone: 9123,
            hot: true,
            register: 'Soạn V200C TN gửi 9123',
            description: 'Gói cước V200C Viettel là một trong các gói combo data điện thoại và SMS khủng nhất của mạng Viettel hiện nay. V200C Viettel được áp dụng cho nhu cầu đăng ký thoại nội mạng kèm data 3G/4G để truy cập internet với giá cước 200.000đ. Khách hàng được tận hưởng 120GB data tốc độ cao, thoại nội mạng thả ga mà không mất phí và có 25GB dữ liệu lưu trữ trên Lifebox, miễn phí xem phim trên Viettel TV. Với những ưu đãi vô cùng hấp dẫn trên, V200C Viettel gần như là một gói cước hoàn hảo thỏa mãn mọi đối tượng và nhu cầu của người dùng'
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
    };

    const offerData = () => {
        window.open('https://3g4gviettel.vn/khuyen-mai/', '_blank');
    }

    const news = () => {
        window.open('https://3g4gviettel.vn/tin-tuc/', '_blank');
    }


    return (
        <>
            <Box sx={{ bgcolor: '#dd3333', mt: 10, py: 4 }}>
                <Grid container justifyContent={'center'} sx={{ pb: 4, pl: { xs: 4, sm: 4, lg: 0 } }}>
                    <Grid container alignItems={'center'} justifyContent={'flex-start'} maxWidth={1000} >
                        <Divider orientation="vertical" sx={{ ...styleDivider }} />
                        <Typography sx={{ ...styleTile }}>Gói ưu đãi viettel</Typography>
                    </Grid>
                </Grid>
                <Grid container sx={{ ...styleGridContainer }} justifyContent={'center'}>
                    <Swiper
                        slidesPerView={4}
                        className="mySwiper"
                        autoplay={{
                            delay: 1000,
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
            <Grid container justifyContent={'center'} sx={{ mt: 10, gap: 2, p: { xs: 5, sm: 0, lg: 0 } }}>
                <Grid item xs={12} sm={4} lg={3} alignItems={'center'} sx={{ ...styleLastGrid }}>
                    <Grid sx={{ ...styleLastTypo }}>
                        <RedeemIcon />
                    </Grid>
                    <Divider orientation="vertical" />
                    <Grid>
                        <Button onClick={offerData}>
                            <Typography sx={{ ...styleLastTypo }}>Khuyến mãi</Typography>
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={4} lg={3} alignItems={'center'} sx={{ ...styleLastGrid }}>
                    <Grid sx={{ ...styleLastTypo }}>
                        <LanguageIcon />
                    </Grid>
                    <Divider orientation="vertical" />
                    <Grid>
                        <Button onClick={news}>
                            <Typography sx={{ ...styleLastTypo }}>Tin tức</Typography>
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

const styleGridContainer = {
    gap: 2,
    textAlign: 'center',
    px: { xl: 54, lg: 30, md: 10, xs: 0 }
}

const styleSwiper = {
    height: 400,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
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

const styleLastGrid = {
    display: 'flex',
    gap: 2,
    border: '2px solid #ebebeb',
    p: 2,
}

const styleLastTypo = {
    color: '#dd3333',
    fontSize: 20,
    fontWeight: 'bold'
}