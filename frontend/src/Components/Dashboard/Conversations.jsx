// import React, { useState } from "react";
// import "../../Pages/Dashboard.css";

// const conversationsData = [
//   {
//     id: 1,
//     username: "cinemafan01",
//     movie: "Godzilla vs. Kong",
//     comment: "This is a die-hard review clearly meant to entice viewers into engagement......",
//     likes: 162,
//     comments: 8,
//     image: "../temp-film-img.png"
//   },
//   {
//     id: 2,
//     username: "filmcritic_jane",
//     movie: "Dune: Part Two",
//     comment: "Villeneuve's masterpiece. The cinematography alone deserves every award. A visual feast that honors the source material.",
//     likes: 284,
//     comments: 15,
//     image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800"
//   },
//   {
//     id: 3,
//     username: "moviebuff_alex",
//     movie: "Oppenheimer",
//     comment: "Nolan at his finest. The way he weaves together timelines while maintaining emotional depth is remarkable.",
//     likes: 421,
//     comments: 23,
//     image: "https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=800"
//   }
// ];

// const Conversations = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const handlePrev = () => {
//     setCurrentIndex((prev) =>
//       prev === 0 ? conversationsData.length - 1 : prev - 1
//     );
//   };

//   const handleNext = () => {
//     setCurrentIndex((prev) =>
//       prev === conversationsData.length - 1 ? 0 : prev + 1
//     );
//   };

//   const currentConvo = conversationsData[currentIndex];

//   return (
//     <section className="conversations-section">
//       <div className="container">
//         <div className="conversations-header fade-in-up">
//           <h2 className="section-title">Join the Conversation</h2>
//         </div>

//         <div className="conversations-carousel fade-in-up">
//           <button
//             className="carousel-btn carousel-btn-prev"
//             onClick={handlePrev}
//             aria-label="Previous conversation"
//           >
//             <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
//             </svg>
//           </button>

//           <div className="conversations-card" key={currentConvo.id}>
//             <img
//               src={currentConvo.image}
//               alt={currentConvo.movie}
//               className="card-background"
//             />

//             <div className="card-content-overlay">
//               <div className="user-info">
//                 <div className="user-avatar">
//                   {currentConvo.username.charAt(0).toUpperCase()}
//                 </div>
//                 <span className="username">{currentConvo.username}</span>
//               </div>

//               <h3 className="movie-title-review">{currentConvo.movie}</h3>

//               <p className="comment-text">"{currentConvo.comment}"</p>

//               <div className="card-actions">
//                 <button className="action-btn">
//                 <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/>
//                 </svg>
//                   <span>{currentConvo.likes}</span>
//                 </button>

//                 <button className="action-btn">
//                   <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
//                   </svg>
//                   <span>{currentConvo.comments}</span>
//                 </button>

//                 <button className="reply-btn">
//                   Reply
//                 </button>
//               </div>
//             </div>
//           </div>

//           <button
//             className="carousel-btn carousel-btn-next"
//             onClick={handleNext}
//             aria-label="Next conversation"
//           >
//             <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
//             </svg>
//           </button>
//         </div>

//         <div className="carousel-dots">
//           {conversationsData.map((_, index) => (
//             <button
//               key={index}
//               className={`carousel-dot ${index === currentIndex ? "active" : ""}`}
//               onClick={() => setCurrentIndex(index)}
//               aria-label={`Go to conversation ${index + 1}`}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Conversations;








// src/Components/Dashboard/Conversations.jsx
import React, { useEffect, useState } from "react";
import { API_BASE } from "../../api/config";
import { auth } from "../../firebase";
import "../../Pages/Dashboard.css";

const Conversations = () => {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const buildImageUrl = (movie) => {
    if (!movie) return "/temp-film-img.png";
    if (movie.backdrop_path) {
      return `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
    }
    if (movie.poster_path) {
      return `https://image.tmdb.org/t/p/w780${movie.poster_path}`;
    }
    return "/temp-film-img.png";
  };

  // ---------- FAVORITES-BASED SLIDES (real reviews) ----------
  const loadFavoriteSlides = async (headers) => {
    try {
      const favRes = await fetch(`${API_BASE}/api/favorites/movies`, {
        headers,
      });
      if (!favRes.ok) return [];

      const favorites = await favRes.json();
      if (!Array.isArray(favorites) || favorites.length === 0) return [];

      const slides = [];

      // Look at up to 3 favorites & grab one review each if possible
      for (const favMovie of favorites.slice(0, 3)) {
        try {
          const revRes = await fetch(
            `${API_BASE}/api/movies/${favMovie.id}/reviews`
          );
          if (!revRes.ok) continue;

          const reviews = await revRes.json();
          if (!Array.isArray(reviews) || reviews.length === 0) continue;

          const review = reviews[0];

          slides.push({
            id: `fav-${favMovie.id}-${review.id}`,
            username: review.display_name || "FrameRatr user",
            movie: favMovie.title,
            comment: review.body,
            likes: 0,
            comments: 1,
            image: buildImageUrl(favMovie),
          });
        } catch (err) {
          console.warn("Error loading review for favorite:", err);
        }
      }

      return slides;
    } catch (err) {
      console.warn("Favorite slide load failed:", err);
      return [];
    }
  };

  // ---------- FALLBACK: TOP 3 TRENDING MOVIES ----------
  const loadTrendingSlides = async (count = 3) => {
    try {
      const res = await fetch(`${API_BASE}/api/tmdb/trending/movies`);
      if (!res.ok) {
        console.error("Trending request not OK:", res.status);
        return [];
      }

      const data = await res.json();
      const results = Array.isArray(data.results) ? data.results : [];
      if (!results.length) return [];

      const selected = results.slice(0, count);

      return selected.map((m, idx) => ({
        id: `trend-${m.id}-${idx}`,
        username: "FrameRatr community",
        movie: m.title || m.name,
        comment:
          m.overview ||
          "This film is trending now. Be the first to add your review!",
        likes: m.vote_count || 0,
        comments: 0,
        image: buildImageUrl(m),
      }));
    } catch (err) {
      console.error("Trending slides failed:", err);
      return [];
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchBannerData = async () => {
      try {
        let headers = {};
        const user = auth.currentUser;
        let allSlides = [];

        // 1) Try favorites-based slides if logged in
        if (user) {
          const token = await user.getIdToken();
          headers.Authorization = `Bearer ${token}`;
          const favoriteSlides = await loadFavoriteSlides(headers);
          if (favoriteSlides.length) {
            allSlides = favoriteSlides;
          }
        }

        // 2) If no favorites slides, fallback to 3 trending movies
        if (!allSlides.length) {
          const trendingSlides = await loadTrendingSlides(3);
          allSlides = trendingSlides;
        }

        if (isMounted) {
          setSlides(allSlides);
          setCurrentIndex(0);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchBannerData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );
  };

  if (loading) {
    return (
      <section className="conversations-section">
        <div className="container">
          <div className="conversations-header fade-in-up">
            <h2 className="section-title">Join the Conversation</h2>
          </div>
          <p className="comment-text">Loading conversation...</p>
        </div>
      </section>
    );
  }

  if (!slides.length) {
    // Nothing to show
    return null;
  }

  const currentConvo = slides[currentIndex];

  return (
    <section className="conversations-section">
      <div className="container">
        <div className="conversations-header fade-in-up">
          <h2 className="section-title">Join the Conversation</h2>
        </div>

        <div className="conversations-carousel fade-in-up">
          {slides.length > 1 && (
            <button
              className="carousel-btn carousel-btn-prev"
              onClick={handlePrev}
              aria-label="Previous conversation"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}

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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                    />
                  </svg>
                  <span>{currentConvo.likes}</span>
                </button>

                <button className="action-btn">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <span>{currentConvo.comments}</span>
                </button>

                <button className="reply-btn">Reply</button>
              </div>
            </div>
          </div>

          {slides.length > 1 && (
            <button
              className="carousel-btn carousel-btn-next"
              onClick={handleNext}
              aria-label="Next conversation"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}
        </div>

        {slides.length > 1 && (
          <div className="carousel-dots">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${
                  index === currentIndex ? "active" : ""
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to conversation ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Conversations;


