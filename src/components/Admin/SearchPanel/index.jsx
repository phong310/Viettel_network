import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SearchIcon from '@mui/icons-material/Search';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import axios from 'axios';
import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function SearchPanel({ label, data, setDataList, setTriggerSearch, triggerSearch, resetSearch }) {
    const baseURL = import.meta.env.VITE_API_PRODUCTS;
    const [nameSearch, setNameSearch] = useState('');
    const [hotSearch, setHotSearch] = useState('');
    const [statusSearch, setStatusSearch] = useState('')

    const handleSearch = async () => {
        try {
            const res = data ? await axios.get(`${baseURL}data-network/search?name=${nameSearch}&hot=${hotSearch}&status=${statusSearch}`)
                : await axios.get(`${baseURL}user-account/search?username=${nameSearch}&status=${statusSearch}`);
            if (res.data.length > 0) {
                setDataList(res.data)
            } else {
                toast.warning('Không tìm thấy !')
            }
            setTriggerSearch(!triggerSearch)
        } catch (e) {
            console.log("Err search: ", e)
        }
    }

    const reset_search = () => {
        setNameSearch('')
        setStatusSearch('')
        setHotSearch('')
        setDataList([])
    }

    useEffect(() => {
        reset_search()
    }, [resetSearch])

    return (
        <Box sx={{ ...styleBoxContainer }}>
            <Accordion TransitionComponent={false}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    sx={{ ...styleTitle }}
                >
                    Tìm kiếm
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container alignItems={'center'} spacing={2}>
                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                id="outlined-basic"
                                label={label}
                                variant="outlined"
                                sx={{ ...styleTextField }}
                                value={nameSearch}
                                onChange={(e) => setNameSearch(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <FormControl fullWidth sx={{ ...styleTextField }}>
                                <InputLabel id="demo-simple-select-helper-label">Trạng thái</InputLabel>
                                <Select
                                    label='Trạng thái'
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={statusSearch}
                                    onChange={(e) => setStatusSearch(e.target.value)}
                                >
                                    <MenuItem value='active'>Kích hoạt</MenuItem>
                                    <MenuItem value='inactive'>Chưa kích hoạt</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        {data && <Grid item xs={12} md={3}>
                            <FormControl fullWidth sx={{ ...styleTextField }}>
                                <InputLabel id="demo-simple-select-label">Hot</InputLabel>
                                <Select
                                    label='Hot'
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={hotSearch}
                                    onChange={(e) => setHotSearch(e.target.value)}
                                >
                                    <MenuItem value='yes'>Có</MenuItem>
                                    <MenuItem value='no'>Không</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>}


                        <Grid item xs={12}>
                            <Stack direction="row" justifyContent={'flex-end'} spacing={1}>
                                <Button variant="contained" color='error' sx={{ ...btnDetail }} startIcon={<SearchIcon />} onClick={handleSearch}>Tìm kiếm</Button>
                                <Button variant="contained" color='error' sx={{ ...btnDetail }} startIcon={<RestartAltIcon />} onClick={reset_search}>Reset</Button>
                            </Stack>

                        </Grid>

                    </Grid>
                </AccordionDetails>
            </Accordion>
        </Box>


    )
}

const styleBoxContainer = {
    // boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
    m: 4
}

const styleTitle = {
    fontWeight: "bold",
    textTransform: 'uppercase',
    color: '#dd3333'
}
const btnDetail = {
    color: 'white',
    fontSize: 12,
    backgroundColor: '#dd3333'
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
            border: '1px solid'
        },
        '&:hover fieldset': {
            borderColor: 'gray',
            border: '1px solid'
        },
        '&.Mui-focused fieldset': {
            borderColor: 'gray',
            border: '2px solid'
        },
    }
}