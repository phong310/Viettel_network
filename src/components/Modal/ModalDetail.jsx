import { Backdrop, Box, Fade, IconButton, Modal, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import React from 'react'

export default function ModalDetail({ open, handleClose, nameOfPack, description }) {
  return (
      <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
              backdrop: {
                  timeout: 500,
              },
          }}
      >
          <Fade in={open}>
              <Box sx={style}>
                  <IconButton
                      aria-label="close"
                      onClick={handleClose}
                      sx={{
                          position: 'absolute',
                          top: 5,
                          right: 5,
                      }}
                  >
                      <CloseIcon />
                  </IconButton>
                  <Typography id="transition-modal-title" variant="h5" component="h6" sx={{ textAlign: 'center', fontWeight: 'bold', color: '#576C8A', }}>
                      {nameOfPack}
                  </Typography>
                  <Typography id="transition-modal-description" sx={{ mt: 2, p:2 }}>
                      {description}
                  </Typography>
              </Box>
          </Fade>
      </Modal>
  )
}
 
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%', 
    maxWidth: '500px',
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};