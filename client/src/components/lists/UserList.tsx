import type { FC } from "react";
import UserAverageItem from "../items/user/UserAverageItem";
import { Box } from "@mui/material";

interface UserListProps {
    users: string[]
}

const UserList: FC<UserListProps> = ({users}) => {
    return (
        <Box display={"grid"} sx={{
            gridTemplateColumns: "repeat(5, 1fr)"
        }} gap={3}>
            {users.map((user, index) =>
                <UserAverageItem key={index} user={user}/>
            )}
        </Box>
    );
}

export default UserList