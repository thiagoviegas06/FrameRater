import React, { useState } from 'react';
import { Box } from '@mui/material';
import FilmDetailOverlay from './FullMovieDetailBox';

export default function TestOverlay() {
    const [open, setOpen] = useState(true);

    const dummyComments = [
        { movieTitle: 'Sample Movie', commentText: 'This movie was amazing!', likes: 12, replies: 3 },
        { movieTitle: 'Sample Movie', commentText: 'Not my favorite, but good effects.', likes: 5, replies: 1 },
        { movieTitle: 'Sample Movie', commentText: 'I loved the soundtrack!', likes: 7, replies: 0 },
    ];

    const dummyFetchSummary = async () => {
        return "This is a smart summary of the film. It explains the plot, characters, and gives a brief overview.";
    };

    const dummyGenreCastData = {
        genres: ['Action', 'Adventure'],
        cast: ['Actor One', 'Actor Two', 'Actor Three'],
        imdbSummary: 'A thrilling action-adventure film set in a futuristic world.',
        rating: 'PG-13',
        year: 2025,
        imdbRating: 8.2,
    };

    return (
        <Box
            sx={{
                position: 'relative',
                width: '100vw',
                height: '100vh',
                backgroundImage: 'url("https://www.lifewire.com/thmb/RFgtDZQ-qNkv_BPKZ3hfHot8T1Y=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/fandango-at-home-vudu-free-movies-7d0b665536274c308422a88c4361fd91.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <FilmDetailOverlay
                open={open}
                bannerImage="https://imgs.search.brave.com/YlLtGK2qXoIFnjficAMfY2dnUDjDpu3WhjQT3-Qc1gM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMz/NDY3MTYyMC9waG90/by9nb2R6aWxsYS5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/V0JBU01MVTJFSTg2/N3RaQ2lXdVNNQUVl/NElSZWtYMzM0Wk00/cTU0U1JrWT0"
                movieTitle="Godzilla 5ever"
                summaryText="This is a smart summary of the film. It explains the plot, characters, and gives a brief overview."
                genreCastData={dummyGenreCastData}
                userNotes="Here is a sample text that the user can see or interact with."
                comments={dummyComments}
                onClose={() => setOpen(false)}
            />
        </Box>
    );
}
