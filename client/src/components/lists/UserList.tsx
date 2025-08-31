import type { FC } from "react";
import UserAverageItem from "../items/user/UserAverageItem";
import { Box } from "@mui/material";
import type { UserSimpleDto } from "../../models/DTO/UserSimpleDto";

interface UserListProps {
    users: UserSimpleDto[]
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