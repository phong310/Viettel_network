import { Box, Button, Divider, Drawer, Grid, List, ListItem, ListItemButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react'

export const HeaderMobile = ({ menuList, handleDrawerToggle, isDrawerOpen, smoothScrollTo }) => {
    return (
        <>
            <Grid container sx={{ ...styleHeaderMobile }}>
                <Grid item sx={{ ...styleImg}} xs={10}>
                    <img src='https://3g4gviettel.vn/wp-content/uploads/2022/06/logo-3g4gviettel-vn.png' style={{ width: 200, height: 26 }} />
                </Grid>
                <Grid item xs={2} sx={{ textAlign: 'right' }}>
                    <Button onClick={handleDrawerToggle} sx={{ color: 'white' }}>
                        <MenuIcon />
                    </Button>
                </Grid>
            </Grid>

            <Drawer anchor="left" open={isDrawerOpen} onClose={handleDrawerToggle}>
                <Box sx={{ ...styleBoxList }} role="presentation" onClick={handleDrawerToggle} onKeyDown={handleDrawerToggle}>
                    <List>
                        {menuList.map((item, index) => {
                            return (
                                <>
                                    <ListItem key={index}>
                                        <ListItemButton sx={{ ...styleItemButton }} onClick={() => smoothScrollTo(item.target)}>
                                            {item.name}
                                        </ListItemButton>
                                    </ListItem>
                                    <Divider />
                                </>
                            )
                        })}
                    </List>
                </Box>
            </Drawer>
        </>
    )
}


const styleHeaderMobile = {
    display: { sm: 'flex', md: 'none' },
    bgcolor: '#dd3333',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
}

const styleImg = {
    display: 'block',
    textAlign: 'center'
}

styleImg[':hover'] = {
    cursor: 'pointer'
}

const styleItemButton = {
    color: '#666666D9', 
    fontWeight: 600, 
    textTransform: 'uppercase', 
    fontSize: 14
}

const styleBoxList = {
    width: 250, 
    bgcolor: '#FFFFFFF2'
}