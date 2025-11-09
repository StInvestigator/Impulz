import { Box, Menu, MenuItem, Typography } from "@mui/material";
import EditNicknameOrPhotoIcon from "../../../assets/profile-icons/EditNicknameOrPhotoIcon.svg";
import EditEmailOrPassIcon from "../../../assets/profile-icons/EditEmailOrPassIcon.svg";
import ProfileUserIcon from "../../../assets/profile-icons/ProfileUserIcon.svg";
import { useTranslation } from "react-i18next";

interface DropdownMyProfileProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  onEditProfile: () => void;
  onChangeEmailAndPassword: () => void;
}

export default function DropdownMyProfile({
                                            anchorEl,
                                            open,
                                            onClose,
                                            onEditProfile,
                                            onChangeEmailAndPassword
                                          }: DropdownMyProfileProps) {
  const { t } = useTranslation("profile");

  const handleEditProfile = () => {
    onEditProfile();
    onClose();
  };

    const handleChangeEmailAndPassword = () => {
        onChangeEmailAndPassword();
        onClose();
    };

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
        <MenuItem onClick={handleEditProfile}>
          <Box component="img" src={EditNicknameOrPhotoIcon} width={"14px"} height={"14px"} mr={1.5}/>
          <Typography variant="mainRL">
            {t("change-nickname-photo")}
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleChangeEmailAndPassword}>
          <Box component="img" src={EditEmailOrPassIcon} width={"14px"} height={"14px"} mr={1.5}/>
          <Typography variant="mainRL">
            {t("change-email-password")}
          </Typography>
        </MenuItem>
        <MenuItem onClick={onClose}>
          <Box component="img" src={ProfileUserIcon} width={"14px"} height={"14px"} mr={1.5}/>
          <Typography variant="mainRL">
            {t("switch-to-user-profile")}
          </Typography>
        </MenuItem>
      </Menu>
  );
}