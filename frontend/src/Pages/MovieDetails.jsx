import React from 'react';
import FilmDetailBanner from '../componentsAC/MovieDetailComponents/FilmDetailBanner';
import SummaryGenreCastCard from '../componentsAC/MovieDetailComponents/AboutGenreCastCard';
import AlwaysVisTextBox from '../componentsAC/MovieDetailComponents/AlwaysVisTextBox';
import ReviewsFilterBar from '../componentsAC/GlobalComponents/ReviewsFilterBar';
import GlobalCommentCard from '../componentsAC/GlobalComponents/GlobalCommentCard';
import YourLists from '../Components/Dashboard/YourLists';
import CloseButton from '../componentsAC/GlobalComponents/overlayXit';
import './MovieDetails.css';

// Step 1/2 before connecting data

export default function MovieDetails({
    open = true,
    bannerImage = '../temp-film-img.png',
    movieTitle = 'Shin Godzilla',
    rating = 'PG13',
    year = '2017',
    imdbRating = '8.8',
    matchPercent = 99,
    likes = 103,
    commentsCount = 11,
    fetchSummary,
    genreCastData = {},
    userNotes = '',
    comments = [],
    onClose,
}) {
    const BANNER_HEIGHT = 400;

    if (!open) return null;

    return (
        <div className="movie-details-overlay">
            <div className="movie-details-container">
                {/* Close button */}
                <div className="movie-details-close">
                    <CloseButton onClick={onClose} />
                </div>

                {/* Film Banner with Overlay Card */}
                <div className="movie-details-banner">
                    <FilmDetailBanner image={bannerImage} height={BANNER_HEIGHT} />

                    {/* Card overlay - bottom of banner */}
                    <div className="movie-details-card-overlay">
                        <div className="movie-details-card-content">
                            <div className="movie-details-title-row">
                                <h1 className="movie-details-title">{movieTitle}</h1>
                                <span className="movie-details-match">{matchPercent}% Match</span>
                            </div>

                            <div className="movie-details-smart-summary">
                                <h3 className="summary-label">Smart Summary</h3>
                                <p className="summary-text">
                                    Users highlight... Users highlight... Users highlight... Users highlight... Users highlight... Users highlight...
                                </p>
                            </div>

                            <div className="movie-details-meta">
                                <span className="meta-item">{rating}</span>
                                <span className="meta-item">{year}</span>
                                <span className="meta-item">IMDB {imdbRating}</span>
                                <button className="meta-likes">
                                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/>
                                    </svg>
                                    {likes}
                                </button>
                                <button className="meta-comments">
                                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                                    </svg>
                                    {commentsCount}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Summary, Genre, Cast Card */}
                <div className="movie-details-section">
                    <SummaryGenreCastCard data={genreCastData} />
                </div>

                {/* Always visible notes box */}
                <div className="movie-details-section">
                    <AlwaysVisTextBox
                        initialText={userNotes}
                        onSave={(text) => console.log('Notes saved', text)}
                    />
                </div>

                {/* Reviews filter bar */}
                <div className="movie-details-section">
                    <ReviewsFilterBar
                        onFilterChange={(filter) => console.log('Filter selected:', filter)}
                    />
                </div>

                {/* Comments section */}
                <div className="movie-details-comments">
                    {comments.length > 0 ? (
                        comments.map((c, idx) => (
                            <div key={idx} className="movie-details-comment">
                                <GlobalCommentCard
                                    movieTitle={c.movieTitle}
                                    commentText={c.commentText}
                                    likes={c.likes}
                                    replies={c.replies}
                                    onViewClick={() => console.log('View:', c)}
                                    onLikeClick={() => console.log('Like:', c)}
                                    onReplyClick={() => console.log('Reply:', c)}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="movie-details-no-comments">
                            No reviews yet.
                        </div>
                    )}
                </div>

                {/* More button */}
                <div className="movie-details-section">
                    <div className="movie-details-more-btn">
                        More
                    </div>
                </div>

                {/* More Like This */}
                <div className="movie-details-recommendations">
                    <YourLists />
                </div>

                {/* Featured In */}
                <div className="movie-details-recommendations">
                    <YourLists />
                </div>
            </div>
        </div>
    );
}