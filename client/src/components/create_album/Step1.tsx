import { Box, IconButton, Typography } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import addImage from "../../assets/addImage.svg";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

interface Step1Props {
  image: File | null;
  setImage: (img: File | null) => void;
}

const Step1 = ({ image, setImage }: Step1Props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {t} = useTranslation("step1")

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Box>
      <Typography
        variant="h3"
        color="var(--columbia-blue)"
        display="flex"
        justifyContent="center"
        mt={2}
      >
        {t("title-upload-album-cover")}
      </Typography>

      <Box
        display="flex"
        justifyContent="space-around"
        color="white"
        mt={2}
      >
        <Box display="flex">
          <CheckIcon sx={{ width: 20, height: 20, color: 'var(--orange-peel)' }} />
          <Typography variant="mainRL" display="flex" justifyContent="center">
            {t("title-rule-1")}
          </Typography>
        </Box>
        <Box display="flex">
          <CheckIcon sx={{ width: 20, height: 20, color: 'var(--orange-peel)' }} />
          <Typography variant="mainRL" display="flex" justifyContent="center">
            {t("title-rule-2")}
          </Typography>
        </Box>
        <Box display="flex">
          <CheckIcon sx={{ width: 20, height: 20, color: 'var(--orange-peel)' }} />
          <Typography variant="mainRL" display="flex" justifyContent="center">
            {t("title-rule-3")}
          </Typography>
        </Box>
      </Box>

      {/* Обёртка изображения с кнопкой удаления */}
      <Box
        width="292px"
        height="360px"
        bgcolor="white"
        borderRadius="10px"
        mt={3}
        display="flex"
        justifyContent="center"
        alignItems="center"
        mx="auto"
        sx={{ cursor: 'pointer', position: 'relative' }}
        onClick={!image ? handleBoxClick : undefined}
      >
        {image ? (
          <>
            <Box
              component="img"
              src={URL.createObjectURL(image)}
              alt="preview"
              sx={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '10px' }}
            />
            {/* Крестик */}
            <IconButton
              onClick={handleRemoveImage}
              sx={{
                position: 'absolute',
                top: 4,
                right: 4,
                backgroundColor: 'rgba(0,0,0,0.5)',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.7)',
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </>
        ) : (
          <Box component="img" src={addImage} alt="addImage" />
        )}
      </Box>

      {/* Скрытый input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </Box>
  );
};

export default Step1;