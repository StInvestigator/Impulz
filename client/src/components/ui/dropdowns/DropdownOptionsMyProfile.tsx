import { Box, Menu, MenuItem, Typography } from "@mui/material";
import EditNicknameOrPhotoIcon from "../../../assets/profile-icons/EditNicknameOrPhotoIcon.svg";
import EditEmailOrPassIcon from "../../../assets/profile-icons/EditEmailOrPassIcon.svg";
import ProfileUserIcon from "../../../assets/profile-icons/ProfileUserIcon.svg";
import CopyLinkIcon from "../../../assets/profile-icons/CopyLinkIcon.svg";


interface DropdownMyProfileProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
}

export default function DropdownMyProfile({
  anchorEl,
  open,
  onClose,
}: DropdownMyProfileProps) {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 2,
          minWidth: 400,
        },
      }}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <MenuItem onClick={onClose}>
        <Box component="img" src={EditNicknameOrPhotoIcon} width={"14px"} height={"14px"} mr={1.5}/>
        <Typography variant="mainRL">
          Змінити нікнейм та/або фото виконавця
        </Typography>
      </MenuItem>
      <MenuItem onClick={onClose}>
        <Box component="img" src={EditEmailOrPassIcon} width={"14px"} height={"14px"} mr={1.5}/>
        <Typography variant="mainRL">
          Змінити електронну пошту та/або пароль
        </Typography>
      </MenuItem>      
      <MenuItem onClick={onClose}>
        <Box component="img" src={ProfileUserIcon} width={"14px"} height={"14px"} mr={1.5}/>
        <Typography variant="mainRL">
          Переключитись на профіль користувача
        </Typography>
      </MenuItem>      
      <MenuItem onClick={onClose}>
        <Box component="img" src={CopyLinkIcon} width={"14px"} height={"14px"} mr={1.5}/>
        <Typography variant="mainRL">
          Копіювати посилання на сторінку
        </Typography>
      </MenuItem>
    </Menu>
  );
}
