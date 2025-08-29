import { Box, IconButton, Typography } from '@mui/material';
import { type FC } from 'react'
import playImage from "../../../assets/play.svg";


interface UserItemProps {
  user: string;
}


const UserAverageItem: FC<UserItemProps> = ({user}) => {

  return (
    <Box
      width="100%"
      boxSizing={"border-box"}
      borderRadius={"1000px 1000px 0 0"}
    >
      <Box
        bgcolor="gray"
        mx={"auto"}
        borderRadius={"50%"}
        sx={{ width: "90%", aspectRatio: "1 / 1" }}
      />
      <Box
        display="flex"
        justifyContent="space-between"
        padding={"12px 24px"}
        boxSizing={"border-box"}
        alignItems="center"
        width={"100%"}
        bgcolor={"#B9B9B9"}
        marginTop={"10px"}
        borderRadius={"10px"}
      >
        <Box display={"flex"} flexDirection={"column"}>
          <Typography variant={"mainSbL"} display={"flex"} alignItems={"center"}>
            {user}
          </Typography>
        </Box>
        <IconButton sx={{ padding: 0 }}>
          <Box
            component={"img"}
            src={playImage}
            borderRadius={"50%"}
            width={"30px"}
            height={"30px"}
          />
        </IconButton>
      </Box>
    </Box>
  );
}

export default UserAverageItem
