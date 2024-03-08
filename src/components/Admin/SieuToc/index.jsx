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
import { getALlCombo, getALlSieuToc } from '../../Api/apiRequest';
import { createAxios } from '../../Interceptor';
import { loginSuccess } from '../../Redux/authSlice';
import AddIcon from '@mui/icons-material/Add';
import ModalData from '../Modal/ModalData';
import ModalDelete from '../Modal/ModalDelete';


const columns = [
    {
        id: 'name',
        label: "Tên",
        minWidth: 40,
        align: 'left'
    },
    {
        id: 'price',
        label: 'Giá',
        minWidth: 170,
        align: 'left'
    },
    {
        id: 'data',
        label: 'Gói cước',
        minWidth: 170,
        align: 'left'
    },
    {
        id: 'syntax',
        label: 'Cú pháp',
        minWidth: 170,
        align: 'left'
    },
    {
        id: 'phone',
        label: 'SĐT',
        minWidth: 100,
        align: 'left'
    },
    {
        id: 'hot',
        label: 'Hot',
        minWidth: 100,
        align: 'left',
    },
    {
        id: 'register',
        label: 'Tin nhắn',
        minWidth: 170,
        align: 'left'
    },
    {
        id: 'description',
        label: 'Mô tả',
        minWidth: 200,
        align: 'left'
    },
    {
        id: 'status',
        label: 'Trạng thái',
        minWidth: 170,
        align: 'left',
    },
    {
        id: 'actions',
        label: '',
        minWidth: 170,
        align: 'left'
    }
];


export default function SieuToc({ tab, dataList, triggerSearch }) {
    const dataUser = useSelector((state) => state.auth.login?.currentUser)
    const dataSieuToc = useSelector((state) => state.sieutoc.dataSieuTocList?.allData)
    const dispatch = useDispatch();
    const MAX_DESCRIPTION_LENGTH = 30;
    let axiosJWT = createAxios(dataUser, dispatch, loginSuccess);
    const [openModal, setOpenModal] = useState(false)
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [itemData, setItemDate] = useState()
    const [isFetching, setIsFetching] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [isDetail, setIsDetail] = useState(false)



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

    const handleDelete = (item) => {
        setOpenModalDelete(true)
        setItemDate(item)
    }

    const handleDetail = (item) => {
        setIsDetail(true)
        setOpenModalDelete(true)
        setItemDate(item)
    }

    const handleUpdate = (item) => {
        setIsEdit(true);
        setItemDate(item);
        setOpenModal(true)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        if (dataUser?.accessToken) {
            getALlSieuToc(dispatch, dataUser?.accessToken)
        }
    }, [dataUser, isFetching])

    useEffect(() => {
        if (dataList.length > 0) {
            const DataSearch = dataList.filter((item) => {
                if (item.type === 'data-sieutoc') return item
            })
            setRowData(DataSearch)
        } else {
            setRowData(dataSieuToc)
        }

    }, [dataSieuToc, dataList, triggerSearch])

    return (
        <Box sx={{ ...styleBoxContainer }}>
            <Paper sx={{ width: '100%', overflow: 'hidden', }}>
                <TableCell sx={{ ...tableCellTitle }}>
                    <Typography variant='h5'>Danh sách gói siêu tốc  <Chip label={rowData?.length} color="error" /></Typography>
                    <Button variant="contained" startIcon={<AddIcon />} sx={{ ...styleBtnAdd }} onClick={() => setOpenModal(true)}>
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
                                                } else if (column.id === 'hot') {
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            <Chip variant="outlined" label={value === "yes" ? "Có" : "Không"} color={value === "yes" ? "success" : "error"} />
                                                        </TableCell>
                                                    )
                                                } else if (column.id === 'status') {
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            <Chip variant="outlined" label={value === "active" ? "Kích hoạt" : "Chưa kích hoạt"} color={value === "active" ? "success" : "error"} />
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
            <ModalData
                open={openModal}
                setOpen={setOpenModal}
                valueTab={tab}
                setIsFetching={setIsFetching}
                isFetching={isFetching}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                item={itemData}
            />
            <ModalDelete
                open={openModalDelete}
                setOpen={setOpenModalDelete}
                item={itemData}
                setIsFetching={setIsFetching}
                isFetching={isFetching}
                valueTab={tab}
                setIsDetail={setIsDetail}
                isDetail={isDetail}
            />
        </Box>

    )
}

const styleBoxContainer = {
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
    // p: 4
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