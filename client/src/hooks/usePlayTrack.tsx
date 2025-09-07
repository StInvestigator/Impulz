import { useAppDispatch } from "../hooks/redux";
import { useKeycloak } from "@react-keycloak/web";
import { setPlaylist, setCurrentTrack } from "../store/reducers/PlayerSlice.ts";
import type { TrackSimpleDto } from "../models/DTO/TrackSimpleDto.ts";

export const usePlayTrack = () => {
    const dispatch = useAppDispatch();
    const { keycloak } = useKeycloak();

    const playSingle = (track: TrackSimpleDto) => {
        if (keycloak?.authenticated) {
            dispatch(setPlaylist([track]));
        } else {
            keycloak?.login();
        }
    };

    const playPlaylist = (tracks: TrackSimpleDto[], startIndex: number = 0) => {
        if (keycloak?.authenticated) {
            dispatch(setPlaylist(tracks));
            if (startIndex > 0) {
                dispatch(setCurrentTrack(startIndex));
            }
        } else {
            keycloak?.login();
        }
    };

    return { playSingle, playPlaylist };
};