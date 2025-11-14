import { useState } from "react";

interface ContextMenuState {
    mouseX: number;
    mouseY: number;
    id: string | number;
}

export const useContextMenu = () => {
    const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);

    const handleContextMenu = (event: React.MouseEvent, id: string | number) => {
        event.preventDefault();
        setContextMenu({
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
            id,
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