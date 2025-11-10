import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, TextField, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';

export default function EditableProfileSummary({ initialText = '', onSave }) {
    const MAX_CHARS = 120;

    const [text, setText] = useState(initialText);
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState(text);

    const inputRef = useRef(null);

    const handleSave = () => {
        setText(draft);
        setEditing(false);
        if (onSave) onSave(draft);
    };

    const handleChange = (e) => {
        const value = e.target.value;
        if (value.length <= MAX_CHARS) setDraft(value);
    };

    useEffect(() => {
        if (editing && inputRef.current) {
            inputRef.current.focus();
            const len = inputRef.current.value.length;
            inputRef.current.setSelectionRange(len, len);
        }
    }, [editing]);

    const PADDING = 12; // match top/left padding

    return (
        <Box
            sx={{
                position: 'relative',
                bgcolor: '#333',
                color: 'white',
                borderRadius: 2,
                p: 2, // adjust padding as needed
                minHeight: 50, // half-height
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                lineHeight: 1.5,
                overflow: 'hidden',
            }}
        >
            {/* Saved Typography */}
            {!editing && (
                <Typography sx={{ whiteSpace: 'pre-line', fontSize: '0.9rem', lineHeight: 1.5 }}>
                    {text || 'Your summary goes here...'}
                </Typography>
            )}

            {/* Editable TextField overlay */}
            {editing && (
                <TextField
                    inputRef={inputRef}
                    value={draft}
                    onChange={handleChange}
                    multiline
                    variant="standard"
                    autoFocus
                    sx={{
                        position: 'absolute',
                        top: PADDING,
                        left: PADDING,
                        width: `calc(100% - ${PADDING * 2}px)`,
                        height: `calc(100% - ${PADDING * 2}px)`,
                        bgcolor: 'transparent',
                        '& .MuiInputBase-input': {
                            color: 'white',
                            fontSize: '0.9rem',
                            lineHeight: 1.5,
                            padding: 0,
                            height: '100%',
                            overflow: 'hidden',
                            whiteSpace: 'pre-line',
                        },
                        '& .MuiInput-underline:before, & .MuiInput-underline:after': {
                            borderBottom: 'none',
                        },
                        '& .MuiInputBase-root:hover:not(.Mui-disabled):before': {
                            borderBottom: 'none',
                        },
                    }}
                />
            )}

            {/* Character count bottom left */}
            {editing && (
                <Typography
                    sx={{
                        position: 'absolute',
                        bottom: 4,
                        left: 8,
                        fontSize: '0.7rem',
                        color: 'rgba(255,255,255,0.7)',
                    }}
                >
                    {draft.length}/{MAX_CHARS}
                </Typography>
            )}

            {/* Check / Edit icon bottom right */}
            <Box sx={{ position: 'absolute', bottom: 4, right: 8 }}>
                {editing ? (
                    <IconButton onClick={handleSave} sx={{ color: 'white', p: 0.5 }}>
                        <CheckIcon fontSize="small" />
                    </IconButton>
                ) : (
                    <IconButton onClick={() => setEditing(true)} sx={{ color: 'white', p: 0.5 }}>
                        <EditIcon fontSize="small" />
                    </IconButton>
                )}
            </Box>
        </Box>
    );
}
