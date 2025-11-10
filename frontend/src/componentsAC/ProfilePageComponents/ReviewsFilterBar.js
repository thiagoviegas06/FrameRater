import React, { useState } from 'react';
import { Box, Typography, Select, MenuItem, FormControl } from '@mui/material';

export default function ReviewsFilterBar({
                                             filterOptions = ['New', 'Most Replies', 'Most Liked'],
                                             onFilterChange,
                                         }) {
    const [filter, setFilter] = useState(filterOptions[0]);

    const handleChange = (event) => {
        setFilter(event.target.value);
        if (onFilterChange) onFilterChange(event.target.value);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                py: 1,
                bgcolor: 'transparent',
            }}
        >
            {/* Left: Reviews title */}
            <Typography
                sx={{
                    fontWeight: 600,
                    color: 'white',
                    fontSize: '0.95rem',
                    paddingX: '0.1rem',
                }}
            >
                Reviews
            </Typography>

            {/* Right: Filter dropdown */}
            <FormControl
                variant="standard"
                sx={{
                    minWidth: 140,
                    '& .MuiInputBase-root': {
                        border: 'none',
                        padding: 0,
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        color: 'white',
                        display: 'flex',
                        alignItems: 'right',
                    },
                    '& .MuiSelect-select': {
                        padding: '4px 8px',
                        display: 'flex',
                        alignItems: 'right',

                    },
                    '& .MuiSvgIcon-root': { color: 'white', fontSize: '1rem' },
                }}
            >
                <Select
                    value={filter}
                    onChange={handleChange}
                    disableUnderline
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                mt: 1,
                                bgcolor: '#222', // match parent
                                color: 'white',
                            },
                        },
                        MenuListProps: {
                            sx: {
                                '& .Mui-selected': {
                                    bgcolor: '#2a2a2a !important', // slightly lighter than parent
                                },
                                '& .MuiMenuItem-root:hover': {
                                    bgcolor: '#333 !important', // hover effect for all
                                },
                            },
                        },
                    }}
                    sx={{
                        '& .MuiSelect-select:focus': {
                            backgroundColor: 'transparent',
                        },
                    }}
                >
                    {filterOptions.map((option) => (
                        <MenuItem
                            key={option}
                            value={option}
                            sx={{
                                bgcolor: '#222',
                                fontSize: '0.95rem',
                                fontWeight: 500,
                            }}
                        >
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
