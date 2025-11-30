import React, { useState } from "react";
import "../../Pages/Dashboard.css";

const conversationsData = [
  {
    id: 1,
    username: "cinemafan01",
    movie: "Godzilla vs. Kong",
    comment: "This is a die-hard review clearly meant to entice viewers into engagement......",
    likes: 162,
    comments: 8,
    image: "../temp-film-img.png"
  },
  {
    id: 2,
    username: "filmcritic_jane",
    movie: "Dune: Part Two",
    comment: "Villeneuve's masterpiece. The cinematography alone deserves every award. A visual feast that honors the source material.",
    likes: 284,
    comments: 15,
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800"
  },
  {
    id: 3,
    username: "moviebuff_alex",
    movie: "Oppenheimer",
    comment: "Nolan at his finest. The way he weaves together timelines while maintaining emotional depth is remarkable.",
    likes: 421,
    comments: 23,
    image: "https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=800"
  }
];

const Conversations = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? conversationsData.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === conversationsData.length - 1 ? 0 : prev + 1
    );
  };

  const currentConvo = conversationsData[currentIndex];

  return (
    <section className="conversations-section">
      <div className="container">
        <div className="conversations-header fade-in-up">
          <h2 className="section-title">Join the Conversation</h2>
        </div>

        <div className="conversations-carousel fade-in-up">
          <button
            className="carousel-btn carousel-btn-prev"
            onClick={handlePrev}
            aria-label="Previous conversation"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>

          <div className="conversations-card" key={currentConvo.id}>
            <img
              src={currentConvo.image}
              alt={currentConvo.movie}
              className="card-background"
            />

            <div className="card-content-overlay">
              <div className="user-info">
                <div className="user-avatar">
                  {currentConvo.username.charAt(0).toUpperCase()}
                </div>
                <span className="username">{currentConvo.username}</span>
              </div>

              <h3 className="movie-title-review">{currentConvo.movie}</h3>

              <p className="comment-text">"{currentConvo.comment}"</p>

              <div className="card-actions">
                <button className="action-btn">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/>
                </svg>
                  <span>{currentConvo.likes}</span>
                </button>

                <button className="action-btn">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                  </svg>
                  <span>{currentConvo.comments}</span>
                </button>

                <button className="reply-btn">
                  Reply
                </button>
              </div>
            </div>
          </div>

          <button
            className="carousel-btn carousel-btn-next"
            onClick={handleNext}
            aria-label="Next conversation"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        <div className="carousel-dots">
          {conversationsData.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to conversation ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Conversations;