import React from 'react';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

/**
 * AddToListButton
 * Extra compact circular icon button with white outline and plus symbol.
 *
 * Props:
 *  - onClick: function to handle click
 */
export default function AddToListButton({ onClick }) {
    return (
        <IconButton
            onClick={onClick}
            sx={{
                border: '1px solid white',
                borderRadius: '50%',
                color: 'white',
                backgroundColor: 'transparent',
                p: 0.2,             // very small padding
                minWidth: 'auto',
                minHeight: 'auto',
                '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                },
            }}
        >
            <AddIcon sx={{ fontSize: '0.9rem' }} />
        </IconButton>
    );
}
