import { Menu, MenuItem, Typography } from "@mui/material";

interface TrackContextMenuProps {
    contextMenu: { mouseX: number; mouseY: number } | null;
    onClose: () => void;
    trackId: number;
    onAddToPlaylist: (trackId: number) => void;
}

export const TrackContextMenu: React.FC<TrackContextMenuProps> = ({
                                                                      contextMenu,
                                                                      onClose,
                                                                      trackId,
                                                                      onAddToPlaylist,
                                                                  }) => {
    const handleAddToPlaylist = () => {
        onAddToPlaylist(trackId);
        onClose();
    };

    return (
        <Menu
            open={contextMenu !== null}
            onClose={onClose}
            anchorReference="anchorPosition"
            anchorPosition={
                contextMenu !== null
                    ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                    : undefined
            }
            PaperProps={{
                sx: {
                    backgroundColor: "var(--dark-purple)",
                    color: "white",
                    borderRadius: "8px",
                    minWidth: "200px",
                }
            }}
        >
            <MenuItem onClick={handleAddToPlaylist}>
                <Typography variant="mainRM"
                    sx={{
                        color: "var(--columbia-blue)"
                    }}
                >
                    Добавить в плейлист
                </Typography>
            </MenuItem>
        </Menu>
    );
};