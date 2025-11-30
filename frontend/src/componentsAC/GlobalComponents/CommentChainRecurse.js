import React from 'react';
import { Box } from '@mui/material';
import GlobalCommentCard from './GlobalCommentCard';

/**
 * CommentChain
 *
 * Props:
 *  - comments: array of comment objects
 *      Each comment object:
 *          {
 *              id: string or number,
 *              movieTitle: string,
 *              commentText: string,
 *              likes: number,
 *              replies: number,
 *              children: [] // nested comment objects
 *          }
 *  - depth: used internally to track indentation level
 */
export default function CommentChain({ comments = [], depth = 0 }) {
    const indentSize = 16; // pixels per nesting level

    return (
        <Box>
            {comments.map((comment) => (
                <Box key={comment.id} sx={{ ml: depth * indentSize, mt: 1 }}>
                    <GlobalCommentCard
                        movieTitle={comment.movieTitle}
                        commentText={comment.commentText}
                        likes={comment.likes}
                        replies={comment.replies}
                        onLikeClick={() => console.log('Liked', comment.id)}
                        onReplyClick={() => console.log('Reply to', comment.id)}
                        onViewClick={() => console.log('View comment chain for', comment.id)}
                    />
                    {comment.children && comment.children.length > 0 && (
                        <CommentChain comments={comment.children} depth={depth + 1} />
                    )}
                </Box>
            ))}
        </Box>
    );
}
