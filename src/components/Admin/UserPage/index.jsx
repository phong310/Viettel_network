import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Box, Button, Chip, IconButton, TablePagination, Tooltip, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUser } from '../../Api/apiRequest';
import { createAxios } from '../../Interceptor';
import { loginSuccess } from '../../Redux/authSlice';
import ModalUser from '../Modal/ModalUsers/ModalUser';
import SearchPanel from '../SearchPanel';
import ModalDe from '../Modal/ModalUsers/ModalDe';


const columns = [
  {
    id: 'username',
    label: "Tên tài khoản",
    minWidth: 40,
    align: 'left'
  },
  {
    id: 'email',
    label: 'Email',
    minWidth: 170,
    align: 'left'
  },
  {
    id: 'password',
    label: 'Mật Khẩu',
    minWidth: 170,
    align: 'left'
  },
  {
    id: 'phone',
    label: 'SĐT',
    minWidth: 170,
    align: 'left'
  },
  {
    id: 'status',
    label: 'Trạng thái',
    minWidth: 170,
    align: 'left'
  },
  {
    id: 'actions',
    label: '',
    minWidth: 170,
    align: 'left'
  }
];

export default function UserPage() {
  const dataUser = useSelector((state) => state.auth.login?.currentUser)
  const userData = useSelector((state) => state.user.userList?.userData)
  const [isFetching, setIsFetching] = useState(false)
  const dispatch = useDispatch();
  const MAX_DESCRIPTION_LENGTH = 30;
  let axiosJWT = createAxios(dataUser, dispatch, loginSuccess);
  const [openAdd, setOpenAdd] = useState(false)
  const [itemData, setItemData] = useState()
  const [isEdit, setIsEdit] = useState(false)
  const [isDetail, setIsDetail] = useState(false)
  const [openModalDelete, setOpenModalDelete] = useState(false)
  const [dataList, setDataList] = useState([])
  const [triggerSearch, setTriggerSearch] = useState(false)


  const truncateDescription = (description) => {
    if (description.length > MAX_DESCRIPTION_LENGTH) {
      return description.substring(0, MAX_DESCRIPTION_LENGTH) + '...';
    }
    return description;
  }

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rowData, setRowData] = useState([])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleUpdate = (item) => {
    setIsEdit(true)
    setItemData(item)
    setOpenAdd(true)
  }

  const handleDelete = (item) => {
    setOpenModalDelete(true)
    setItemData(item)
  }

  const handleDetail = (item) => {
    setOpenModalDelete(true)
    setIsDetail(true)
    setItemData(item)
  }

  useEffect(() => {
    if (dataUser?.accessToken) {
      getAllUser(dispatch, dataUser?.accessToken)
    }
  }, [dataUser, isFetching])


  useEffect(() => {
    if (dataList.length > 0) {
      setRowData(dataList)
    } else {
      setRowData(userData)
    }
  }, [userData, dataList, triggerSearch])

  return (
    <>
      <SearchPanel label="Tên tài khoản" data={false} setDataList={setDataList} setTriggerSearch={setTriggerSearch} triggerSearch={triggerSearch} />
      <Box sx={{ ...styleBoxContainer }}>
        <Paper sx={{ width: '100%', overflow: 'hidden', }}>
          <TableCell sx={{ ...tableCellTitle }}>
            <Typography variant='h5'>Danh sách tài khoản</Typography>
            <Button variant="contained" startIcon={<AddIcon />} sx={{ ...styleBtnAdd }} onClick={() => setOpenAdd(true)}>
              Thêm mới
            </Button>
          </TableCell>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead >
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                      sx={{ ...styleTableRow }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rowData
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, idx) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={idx}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          if (column.id === 'description') {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {truncateDescription(value)}
                              </TableCell>
                            );
                          } else if (column.id === 'status') {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <Chip variant="outlined" label={value === 'active' ? "Kích hoạt" : " Chưa kích hoạt"} color={value === 'active' ? "success" : "error"} />
                              </TableCell>
                            )
                          }
                          else if (column.id === 'actions') {
                            return (
                              <TableCell key={column.id} align={column.align} >
                                <IconButton aria-label="edit" size="small" sx={{ ...colorMain }} onClick={() => handleUpdate(row)}>
                                  <Tooltip title="Chỉnh sửa" placement="top">
                                    <EditIcon />
                                  </Tooltip>
                                </IconButton>
                                <IconButton aria-label="edit" size="small" sx={{ ...colorMain }} onClick={() => handleDetail(row)}>
                                  <Tooltip title="Chi tiết" placement="top">
                                    <RemoveRedEyeIcon />
                                  </Tooltip>
                                </IconButton>
                                <IconButton aria-label="delete" size="small" sx={{ ...colorMain }} onClick={() => handleDelete(row)}>
                                  <Tooltip title="Xóa" placement="top">
                                    <DeleteIcon />
                                  </Tooltip>
                                </IconButton>
                              </TableCell>
                            );
                          } else {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {value}
                              </TableCell>
                            );
                          }
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rowData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <ModalUser
          open={openAdd}
          setOpen={setOpenAdd}
          isFetching={isFetching}
          setIsFetching={setIsFetching}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          item={itemData}
        />
        <ModalDe
          open={openModalDelete}
          setOpen={setOpenModalDelete}
          item={itemData}
          setIsFetching={setIsFetching}
          isFetching={isFetching}
          setIsDetail={setIsDetail}
          isDetail={isDetail}
        />
      </Box>
    </>

  )
}

const styleBoxContainer = {
  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
  p: 4
}

const styleTableRow = {
  backgroundColor: '#dd3333',
  color: 'white',
  fontWeight: 'bold'
}

const colorMain = {
  color: '#dd3333'
}

const tableCellTitle = {
  borderBottomColor: 'white',
  fontWeight: 'bold',
  color: "#dd3333",
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
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