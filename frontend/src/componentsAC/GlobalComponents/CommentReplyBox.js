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
 *  - depth: number (used internally for indentation)
 *  - indentSize: number (pixels per nesting level, default 16)
 *  - maxIndent: number (maximum pixels to indent, optional)
 */
export default function CommentChain({
                                         comments = [],
                                         depth = 0,
                                         indentSize = 16,
                                         maxIndent = 64,
                                     }) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {comments.map((comment) => {
                const indent = Math.min(depth * indentSize, maxIndent);

                return (
                    <Box key={comment.id} sx={{ ml: indent }}>
                        <GlobalCommentCard
                            movieTitle={comment.movieTitle}
                            commentText={comment.commentText}
                            likes={comment.likes}
                            replies={comment.replies}
                            onLikeClick={() => console.log('Liked', comment.id)}
                            onReplyClick={() => console.log('Reply to', comment.id)}
                            onViewClick={() =>
                                console.log('View comment chain for', comment.id)
                            }
                        />
                        {comment.children?.length > 0 && (
                            <CommentChain
                                comments={comment.children}
                                depth={depth + 1}
                                indentSize={indentSize}
                                maxIndent={maxIndent}
                            />
                        )}
                    </Box>
                );
            })}
        </Box>
    );
}
