import React, { useState, useRef, useEffect } from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { fetchWithAuth } from '../../api/client'; // your auth-aware fetch

export default function EditableTextBox({ movieId, initialText = '', onCommentPosted }) {
    const [text, setText] = useState(initialText);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
            const len = inputRef.current.value.length;
            inputRef.current.setSelectionRange(len, len);
        }
    }, []);

    const handleSend = async () => {
        const trimmedText = text.trim();
        if (!trimmedText || loading) return;

        setLoading(true);

        try {
            const payload = {
                movie_id: movieId,
                body: trimmedText,
            };

            const savedReview = await fetchWithAuth('/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            // Notify parent of new comment
            if (onCommentPosted) onCommentPosted(savedReview);

            // Clear the input
            setText('');
            if (inputRef.current) inputRef.current.focus();
        } catch (err) {
            console.error('Failed to post review:', err);
            alert('Failed to post review. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                bgcolor: '#333',
                color: 'white',
                p: 1,
                display: 'flex',
                flexDirection: 'column',
                opacity: 0.9,
                borderRadius: 2, // rounded corners
                boxShadow: '0 0 4px rgba(255,255,255,0.4)', // subtle inner shadow for depth
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
                placeholder="Leave a review..."
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

            {/* Send icon button */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                <IconButton
                    onClick={handleSend}
                    disabled={!text.trim() || loading}
                    sx={{
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
