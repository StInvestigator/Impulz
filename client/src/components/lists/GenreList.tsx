import {Box, Typography} from "@mui/material";
import { Link } from "react-router-dom";
import GenreSpirale01 from "/src/assets/genre/genre_spirale_01.svg";
import GenreSpirale02 from "/src/assets/genre/genre_spirale_02.svg";
import GenreSpirale03 from "/src/assets/genre/genre_spirale_03.svg";

const GenreList = () => {
    const genres = {
        genre1: { id: "rock", name: "Rock" },
        genre2: { id: "pop", name: "Pop" },
        genre3: { id: "jazz", name: "Jazz" }
    };

    return (
        <Box
            display="flex"
            justifyContent="space-between"
            bgcolor="var(--columbia-blue)"
            width="100%"
            height="410px"
            padding="24px"
            boxSizing="border-box"
            borderRadius={"10px"}
            gap={3}
        >
            {/* Левая колонка */}
            <Box width="60%" display="flex" flexDirection="column" gap={2} height="100%">
                <Box
                    component={Link}
                    to={`/genres/${genres.genre1.id}`}
                    sx={{
                        position: 'relative',
                        flex: 1,
                        borderRadius: "10px",
                        textDecoration: 'none',
                        cursor: 'pointer',
                        overflow: 'hidden'
                    }}
                >
                    <Box
                        component="img"
                        src={GenreSpirale01}
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: "10px"
                        }}
                    />
                    <Typography
                        variant="h4"
                        sx={{
                            position: 'absolute',
                            top: '24px',
                            right: '24px',
                            color: 'var(--dark-purple)',
                            fontSize: '24px',
                            fontWeight: 'bold',
                        }}
                    >
                        {genres.genre1.name}
                    </Typography>
                </Box>

                <Box
                    component={Link}
                    to={`/genres/${genres.genre2.id}`}
                    sx={{
                        position: 'relative',
                        flex: 1,
                        borderRadius: "10px",
                        textDecoration: 'none',
                        cursor: 'pointer',
                        bgcolor: 'white',
                        overflow: 'hidden'
                    }}
                >
                    <Box
                        component="img"
                        src={GenreSpirale02}
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: "10px"
                        }}
                    />
                    <Typography
                        variant="h4"
                        sx={{
                            position: 'absolute',
                            bottom: '24px',
                            left: '24px',
                            color: 'var(--dark-purple)',
                            fontSize: '24px',
                            fontWeight: 'bold',
                        }}
                    >
                        {genres.genre2.name}
                    </Typography>
                </Box>
            </Box>

            {/* Правая колонка */}
            <Box
                component={Link}
                to={`/genres/${genres.genre3.id}`}
                sx={{
                    position: 'relative',
                    height: '100%',
                    width: 'auto',
                    borderRadius: "15px",
                    textDecoration: 'none',
                    cursor: 'pointer',
                    bgcolor: 'white',
                    overflow: 'hidden'
                }}
            >
                <Box
                    component="img"
                    src={GenreSpirale03}
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: "15px"
                    }}
                />
                <Typography
                    variant="h4"
                    sx={{
                        position: 'absolute',
                        bottom: '24px',
                        right: '24px',
                        color: 'var(--dark-purple)',
                        fontSize: '24px',
                        fontWeight: 'bold',
                    }}
                >
                    {genres.genre3.name}
                </Typography>
            </Box>
        </Box>
    );
};

export default GenreList;