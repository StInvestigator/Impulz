import { useState } from "react";

interface ContextMenuState {
    mouseX: number;
    mouseY: number;
    trackId: number;
}

export const useMediaContextMenu = () => {
    const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);

    const handleContextMenu = (event: React.MouseEvent, trackId: number) => {
        event.preventDefault();
        setContextMenu({
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
            trackId,
        });
    };

    const handleCloseContextMenu = () => {
        setContextMenu(null);
    };

    return {
        contextMenu,
        handleContextMenu,
        handleCloseContextMenu,
    };
};