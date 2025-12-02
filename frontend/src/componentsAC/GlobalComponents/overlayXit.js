//deprecated delete me when done

import React from 'react';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function CloseButton({ onClick }) {
    return (
        <IconButton
            onClick={onClick}
            sx={{
                color: 'white',
                p: 0.5,
                '&:hover': {
                    bgcolor: 'transparent', // no background change
                    color: '#ccc',          // darken icon on hover
                },
            }}
        >
            <CloseIcon fontSize="medium" />
        </IconButton>
    );
}
