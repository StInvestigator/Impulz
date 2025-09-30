import { Box, IconButton, Modal } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { type FC, type ReactNode } from 'react'

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 668,
  minHeight: 300,
  bgcolor: 'var(--dark-purple)',
  borderRadius: 4,
  boxSizing: "border-box",
  p: 3,
};

interface MyModalProps {
  open: boolean,
  setOpen: (open: boolean) => void,
  children: ReactNode,
}

const MyModal: FC<MyModalProps> = ({ open, setOpen, children }) => {
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={modalStyle}>
          <Box display={"flex"} justifyContent={"flex-end"}>
            <IconButton onClick={() => setOpen(false)} sx={{
              padding: 0
            }}>
              <CloseIcon sx={{
                width: "20px",
                height: "20px",
                color: "var(--orange-peel)"
              }}/>
            </IconButton>
          </Box>
          {/* Контент */}
          {children}
        </Box>
      </Modal>
  )
}

export default MyModal
