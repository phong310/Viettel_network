import { Box, Button, Card, CardActions, CardContent, Divider, Grid, Typography } from '@mui/material'
import SmsIcon from '@mui/icons-material/Sms';
import React from 'react'
import { useState } from 'react';
import ModalDetail from '../Modal/ModalDetail';

export default function DataSieuToc() {

    const [openModal, setOpenModal] = useState({
        open: false,
        name: '',
        des: ''
    })

    const { open, name, des } = openModal

    const packOfData = [
        {
            name: 'ST70K',
            price: '70.000đ /30 ngày',
            data: '15GB',
            syntax: 'ST70K TN',
            phone: 9123,
            hot:false,
            register:'Soạn ST70K TN gửi 9123',
            description: 'Với ST70K Viettel là gói cước 4G với chỉ 70.000đ / tháng của Viettel cung cấp.Bạn sẽ nhận được 15GB / tháng data 4G tốc độ cao.Mỗi ngày bạn nhận được 500MB data lướt web với tốc độ cao.Nhanh tay đăng ký nhận ưu đãi thôi nào.'
        },
        {
            name: 'SD90',
            price: '90.000đ /30 ngày',
            data: '45GB',
            syntax: 'SD90 TN',
            phone: 9123,
            hot: true,
            register:'Soạn SD90 TN gửi 9123',
            description:'Nếu trước đây các gói cước mạng 30GB/ tháng có giá thành 100.000đ thì giờ đây khi có mặt trên thị trường mạng thì SD90 Viettel làm nhiều người dùng bất ngờ với cước phí vô cùng rẻ chỉ với 90.000đ nhưng nhận ngay lên đến không chỉ 30GB mà là 45GB / tháng tương đương với 1,5GB / ngày giúp các thuê bao đăng ký gói cước có thế sử dụng Internet mỗi ngày.'
        },
        {
            name: 'ST120K',
            price: '120.000đ /30 ngày',
            data: '60GB',
            syntax: 'ST120K TN',
            phone: 9123,
            hot: true,
            register:'Soạn ST120K TN gửi 9123',
            description: 'ST120K Viettel là một trong những gói cước 4G Viettel tháng được các chủ thuê bao di động Viettel đăng ký sử dụng nhiều nhất. Đối với những khách hàng có nhu cầu làm việc, xem phim, nghe nhạc, chơi game… thường xuyên trên di động, dung lượng data truy cập tốc độ cao của các gói 4G tháng như gói ST70K (500MB/ngày), gói ST90 (1GB/ngày) thực sự không đáp ứng đủ. Trong khi các gói cước 4G Viettel 1 năm lại cần phải bỏ ra một khoản chi phí tương đối cao ngay lập tức để đăng ký sử dụng.Nắm bắt nhu cầu này, nhà mạng Viettel đã ra mắt gói ST120K phù hợp với nhu cầu của số đông sinh viên, người đi làm với mức thu nhập trung bình khá.Bạn sẽ nhận được 30GB / tháng, mỗi ngày sẽ nhận được 2GB tốc độ cao.Ngoài ra, bạn sẽ được lưu trữ 25GB dữ liệu trên Lifebox.ĐẶC BIỆT, bạn sẽ được xem phim miễn phí trên ứng dụng TV360.'
        },
        {
            name: 'ST150K',
            price: '150.000đ /30 ngày',
            data: '90GB',
            syntax: 'ST150K TN',
            phone: 9123,
            hot: false,
            register:'Soạn ST150K TN gửi 9123', 
            description:'Gói cước ST150K Viettel ưu đãi 90GB DATA lưu lượng tốc độ cao sử dụng trong 30 ngày. ST150K của Viettel được áp dụng cho nhu cầu đăng ký các gói 3G/4G Viettel để truy cập internet với giá cước 150.000đ. Khách hàng được tận hưởng 90GB (3GB/ngày) data tốc độ cao với những trải nghiệm 4G vô cùng tuyệt vời. Ngoài ra, gói cước ST150K còn ưu đãi miễn phí 25GB dữ liệu LifeBox và miễn phí xem ứng dụng TV360.'
        },
    ]

    const showAlert = (registerInfo) => {
        alert(registerInfo)
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
                  <Typography sx={{ ...styleTile }}>Gói siêu tốc viettel</Typography>
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
                                  <b style={{ color: '#EE0033' }}>{item.syntax}</b>  gửi <b style={{ color: '#EE0033' }}>{item.phone}</b>
                              </Typography>
                          </CardContent>
                          <CardActions>
                              <Button variant="contained" endIcon={<SmsIcon />} sx={{ ...buttonSend }} onClick={() => showAlert(item.register)}>Soạn tin</Button>
                          </CardActions>
                          <CardActions sx={{ ...cartAction }}>
                              <Button variant="outlined" color='error' sx={{ ...btnDetail }} onClick={() => handleOpenModal({ name: item.name, des: item.description })}>Chi tiết</Button>
                          </CardActions>
                      </Card>
                  )
              })}
          </Grid>
          <ModalDetail open={open} handleClose={closeModal} nameOfPack={name} description={des} />
      </>
  )
}

const girdTitle = {
    pt: 10,
    pb: 2
}

const styleGridContainer = {
    gap: 3,
    textAlign: 'center',
}

const cardContainer = {
    position:'relative',
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