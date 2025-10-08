import { Box, IconButton, Typography } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import addImage from "../../assets/addImage.svg";
import { useRef } from "react";

interface Step1Props {
  image: string | null;
  setImage: (img: string | null) => void;
}

const Step1 = ({ image, setImage }: Step1Props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
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
        Завантаж обкладинку альбому
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
            формат: JPG/PNG
          </Typography>
        </Box>
        <Box display="flex">
          <CheckIcon sx={{ width: 20, height: 20, color: 'var(--orange-peel)' }} />
          <Typography variant="mainRL" display="flex" justifyContent="center">
            розмір: мін. 292×360 px
          </Typography>
        </Box>
        <Box display="flex">
          <CheckIcon sx={{ width: 20, height: 20, color: 'var(--orange-peel)' }} />
          <Typography variant="mainRL" display="flex" justifyContent="center">
            вага файлу: до 5 МБ
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
              src={image}
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