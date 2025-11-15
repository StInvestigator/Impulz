import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePlayTrack } from "../../../hooks/usePlayTrack.tsx";

const TrackLinkHandler = () => {
    const { trackId } = useParams<{ trackId: string }>();
    const { playTrackById } = usePlayTrack();
    const navigate = useNavigate();
    const hasProcessed = useRef(false);

    useEffect(() => {
        if (hasProcessed.current) return;
        const handleTrackPlay = async () => {
            if (trackId) {
                const id = Number(trackId);
                if (!isNaN(id)) {
                    try {
                        await playTrackById(id);
                    } catch (error) {
                        console.error('Error playing track:', error);
                        hasProcessed.current = true;
                        navigate("/notFound", { replace: true });
                        return;
                    }
                } else {
                    hasProcessed.current = true;
                    navigate("/notFound", { replace: true });
                    return;
                }
            }
            hasProcessed.current = true;
            navigate("/", { replace: true });
        };

        handleTrackPlay();
    }, [trackId, playTrackById, navigate]);
};

export default TrackLinkHandler;