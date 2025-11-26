import React, { useState, useRef, useEffect } from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export default function EditableTextBox({ initialText = '', onSend }) {
    const [text, setText] = useState(initialText);
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
            const len = inputRef.current.value.length;
            inputRef.current.setSelectionRange(len, len);
        }
    }, []);

    const handleSend = () => {
        if (!text.trim()) return;
        if (onSend) onSend(text.trim());
        setText(''); // clear input after sending
        if (inputRef.current) inputRef.current.focus(); // keep focus
    };

    return (
        <Box
            sx={{
                bgcolor: '#333',
                color: 'white',
                borderRadius: 2,
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
            }}
        >
            {/* Text area */}
            <TextField
                inputRef={inputRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                multiline
                minRows={3}
                variant="standard"
                placeholder="Type your reply..."
                sx={{
                    width: '100%',
                    bgcolor: 'transparent',
                    '& .MuiInputBase-input': {
                        color: 'white',
                        fontSize: '0.95rem',
                        lineHeight: 1.5,
                        padding: 0,
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

            {/* Send icon button bottom right */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                <IconButton
                    onClick={handleSend}
                    disabled={!text.trim()}
                    sx={{
                        bgcolor: '#555',
                        '&:hover': { bgcolor: '#666' },
                        color: 'white',
                        width: 30,
                        height: 30,
                        padding: 0,
                    }}
                >
                    <SendIcon sx={{ fontSize: 18 }} />
                </IconButton>
            </Box>
        </Box>
    );
}
