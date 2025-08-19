import {useEffect} from 'react';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { Box, Grid, IconButton } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import sharik from "../assets/mp3/butyrka-sharik.mp3"
import { pauseTrack, playTrack, setCurrentTime, setDuration, setVolume } from '../store/reducers/PlayerSlice';
import TrackProgress from './TrackProgress';


let audio: HTMLAudioElement;

const Player = () => {
    const {pause, currentTime, duration, volume} = useAppSelector(state => state.player)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!audio) {
            audio = new Audio()
            audio.src = sharik
            audio.onloadedmetadata = () => {
                dispatch(setDuration(Math.ceil(audio.duration)))
            }
            audio.ontimeupdate = () => {
                dispatch(setCurrentTime(Math.ceil(audio.currentTime)))
            }
        }
    }, [])

    const play = () => {
        if (pause) {
            dispatch(playTrack())
            audio.play()
        } else {
            dispatch(pauseTrack())
            audio.pause()
        }
    }

    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.volume = Number(e.target.value) / 100
        dispatch(setVolume(Number(e.target.value)))
    }


    const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.currentTime = Number(e.target.value)
        dispatch(setCurrentTime(Number(e.target.value)))
    }


    return (
        <Box height={"60px"} width={"100%"} position={"fixed"} bottom={0} display={"flex"} alignItems={"center"} padding={"0 10px"} bgcolor={"lightgray"} boxSizing={"border-box"} sx={{
            zIndex: (theme) => theme.zIndex.drawer + 2
        }}>
            <IconButton onClick={play}>
                {pause
                    ? <PlayCircleIcon/>
                    : <PauseCircleIcon/>
                }
            </IconButton>
            <Grid container direction="column" sx={{width: 200, margin: '0 20px'}}>
                <Box>Бутырка-Шарик</Box>
                <Box sx={{fontSize: 12, color: 'gray'}}>OopsSorry228</Box>
            </Grid>
            <TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime}/>
            <VolumeUpIcon sx={{marginLeft: 'auto'}}/>
            <TrackProgress left={volume} right={100} onChange={changeVolume}/>
        </Box>
    );
};

export default Player;