import { useAppDispatch } from "../hooks/redux";
import { useKeycloak } from "@react-keycloak/web";
import {setTrackActive} from "../store/reducers/PlayerSlice.ts";
import type {TrackSimpleDto} from "../models/DTO/TrackSimpleDto.ts";

export const usePlayTrack = () => {
    const dispatch = useAppDispatch();
    const { keycloak } = useKeycloak();

    const play = (track: TrackSimpleDto) => {
        if (keycloak?.authenticated) {
            dispatch(setTrackActive(track));
        } else {
            keycloak?.login();
        }
    };

    return { play };
};
