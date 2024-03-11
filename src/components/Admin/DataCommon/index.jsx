import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DataCombo from '../DataCombo';
import DataOffer from '../DataOffer';
import DataPage from '../DataPage';
import SearchPanel from '../SearchPanel';
import SieuToc from '../SieuToc';

export default function index() {
    const [value, setValue] = useState('1');
    const [dataList, setDataList] = useState([])
    const [triggerSearch, setTriggerSearch] = useState(false)
    const [resetSearch, setResetSearch] = useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        setResetSearch(!resetSearch)
    },[value])



    return (
        <>
            <SearchPanel label='Tên gói cước' data={true} setDataList={setDataList} setTriggerSearch={setTriggerSearch} triggerSearch={triggerSearch} resetSearch={resetSearch}/>
            <TabContext value={value}>
                <Box sx={{ textAlign: 'center' }}>
                    <Box sx={{ display: 'inline-block' }}>
                        <TabList TabIndicatorProps={{
                            style: {
                                backgroundColor: "#dd3333"
                            }
                        }} onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Gói cước 3G/4G" value="1" sx={{ ...styleTabLabel }} />
                            <Tab label="Combo Viettel" value="2" sx={{ ...styleTabLabel }} />
                            <Tab label="Gói siêu tốc" value="3" sx={{ ...styleTabLabel }} />
                            <Tab label="Gói ưu đãi" value="4" sx={{ ...styleTabLabel }} />
                        </TabList>
                    </Box>
                </Box>
                <TabPanel value="1">
                    <DataPage tab={1} dataList={dataList} triggerSearch={triggerSearch} />
                </TabPanel>
                <TabPanel value="2">
                    <DataCombo tab={2} dataList={dataList} triggerSearch={triggerSearch} />
                </TabPanel>
                <TabPanel value="3">
                    <SieuToc tab={3} dataList={dataList} triggerSearch={triggerSearch} />
                </TabPanel>
                <TabPanel value="4">
                    <DataOffer tab={4} dataList={dataList} triggerSearch={triggerSearch} />
                </TabPanel>
            </TabContext>
        </>
    )
}

const styleTabLabel = {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#dd3333',
    '&.Mui-selected': {
        color: '#dd3333',
    },
}