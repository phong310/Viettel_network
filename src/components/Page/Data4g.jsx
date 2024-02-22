import SmsIcon from '@mui/icons-material/Sms';
import { Button, Card, CardActions, CardContent, Divider, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import ModalDetail from '../Modal/ModalDetail';

export default function Data4g() {

    const [openModal, setOpenModal] = useState({
        open: false,
        name: '',
        des: ''
    })

    const { open, name, des } = openModal

    const packOfData = [
        {
            name: 'MXH100',
            price: '100.000đ /30 ngày',
            data: '30GB + Gọi',
            syntax: 'MXH100 TN',
            phone: 9123,
            hot: false,
            register: 'Soạn MXH100 TN gửi 9123',
            description:'MXH100 Viettel là gói cước siêu tốc với 30GB dữ liệu, mỗi ngày 1GB và đặc biệt miễn phí không giới hạn truy cập Facebook, Youtube, Tik Tok ở tốc độ cao nhất. Gói cước này triển khai từ ngày 19/07/2023, áp dụng cho thuê bao trả trước và trả sau hòa mạng từ ngày 01/01/2023'
        },
        {
            name: 'MXH120',
            price: '120.000đ /30 ngày',
            data: '30GB + Gọi',
            syntax: 'MXH120 TN',
            phone: 9123,
            hot: false,
            register: 'Soạn MXH12 TN gửi 9123',
            description:'Đăng ký MXH120 của Viettel chỉ với mức giá là 120.000đ cho 30 ngày sử dụng bạn có ngay 30Gb data 4G tốc độ cao truy cập mạng internet trên điện thoại di động. Mỗi ngày bạn được sử dụng mức 1Gb data 4G tốc độ cao trong suốt 30 ngày để thỏa mái lướt nét xem tim túc, tìm kiếm thông tin để học tập và kết nối người thân.'
        },
        {
            name: 'MXH150',
            price: '150.000đ /30 ngày',
            data: '45GB + Gọi',
            syntax: 'MXH150 TN',
            phone: 9123,
            hot: false,
            register: 'Soạn MXH150 TN gửi 9123',
            description:'MXH150 Viettel – 150.000 đ / tháng là gói cước KHÔNG GIỚI HẠN DATA khi truy cập Tiktok, Youtube, Facebook và gọi nội mạng, ngoại thả ga miễn phí. Ngoài ra gói cước MXH150 còn có 45 GB DATA để quý khách sử dụng truy cập vào các công việc khác phục vụ làm việc, học tập, giải trí…'
        },
        {
            name: 'SD150',
            price: '150.000đ /30 ngày',
            data: '90GB',
            syntax: 'SD150 TN',
            phone: 9123,
            hot: true,
            register: 'Soạn SD150 gửi 9123',
            description: 'SD150 Viettel sẽ không làm bạn thất vọng với trữ lượng lên đến 90GB / tháng mà giá thành thì cực kì phải chăng giúp bạn có thể tiết kiệm chi phí cũng như có thêm nhiều trữ lượng hơn khi đăng ký gói cước này , để trải nghiệm gói cước này cùng nhanh tay đăng ký theo cú pháp được để ngay bên dưới bài viết này nhé.'
        },
    ]

    // const showAlert = (registerInfo) => {
    //     alert(registerInfo)
    // }

    const showAlertOrSendSMS = (registerInfo) => {
        // Kiểm tra xem trang web đang được truy cập từ thiết bị di động hay không
        const isMobile = window.innerWidth <= 768; // Giả sử độ rộng của thiết bị di động là 768px

        // Nếu là trên thiết bị di động, gửi tin nhắn
        if (isMobile) {
            console.log(123);
            window.location.href = `sms:${registerInfo}`;
        } else {
            // Nếu là trên web, hiển thị cảnh báo
            alert(registerInfo);
        }
    }

    const closeModal = () => {
        setOpenModal({ ...openModal, open: false })
    }

    const handleOpenModal = (newState) => {
        setOpenModal({ ...newState, open: true });
    };

    return (
        <>
            <Grid container justifyContent={'center'} sx={{ ...girdTitle }}>
                <Grid container alignItems={'center'} justifyContent={'flex-start'} maxWidth={1000} >
                    <Divider orientation="vertical" sx={{ ...styleDivider }} />
                    <Typography sx={{ ...styleTile }}>Gói mạng 3G/4G viettel</Typography>
                </Grid>
            </Grid>
            <Grid container sx={{ ...styleGridContainer }} justifyContent={'center'}>
                {packOfData.map((item, index) => {
                    return (
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
                                    <b style={{ color: '#EE0033' }}>{item.syntax}</b> gửi <b style={{ color: '#EE0033' }}>{item.phone}</b>
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" endIcon={<SmsIcon />} sx={{ ...buttonSend }} onClick={() => showAlertOrSendSMS(item.register)}>Soạn tin</Button>
                            </CardActions>
                            <CardActions sx={{ ...cartAction }}>
                                <Button variant="outlined" color='error' sx={{ ...btnDetail }} onClick={() => handleOpenModal({ name: item.name, des: item.description })}>Chi tiết</Button>
                            </CardActions>
                        </Card>
                    )
                })}
            </Grid>
            <ModalDetail open={open} handleClose={closeModal} nameOfPack={name} description={des}/>
        </>

    )
}

const girdTitle = {
    pt: 10,
    pb: 4,
    pl:{xs:4, sm:4, lg:0}
}
const styleGridContainer = {
    gap: 2,
    textAlign: 'center',
}

const cardContainer = {
    position: 'relative',
    maxWidth: 400,
    p: 2,
    overflow: 'visible',
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
    borderLeft: '5px solid #c50000'
}

const styleTile = {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#c50000',
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