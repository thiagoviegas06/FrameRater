import React, { useEffect, useState } from "react";
import '../../Pages/LandingPage.css';

const testimonials = [
  {
    text: "FrameRatr makes it so easy to track what I've watched and discover new films.",
    name: "Sarah Chen",
    role: "Film Enthusiast",
  },
  {
    text: "The UI feels like a premium streaming platform, but tailored to my taste.",
    name: "Michael Rodriguez",
    role: "Designer & Movie Lover",
  },
  {
    text: "I love how reviews feel like a conversation instead of a score dump.",
    name: "Emily Thompson",
    role: "Tech Professional",
  },
];

const Reviews = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const current = testimonials[index];

  return (
    <section className="reviews-section">
      <div className="container">
        <div className="reviews-header fade-in-up">
          <h2 className="section-title">What People Are Saying</h2>
        </div>

        <div className="reviews-card fade-in-up" key={index}>
          <div className="reviews-content">
            <svg className="quote-icon" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
            </svg>

            <p className="reviews-text">{current.text}</p>

            <div className="reviews-author">
              <div className="author-avatar">
                {current.name.charAt(0)}
              </div>
              <div className="author-info">
                <p className="author-name">{current.name}</p>
                <p className="author-role">{current.role}</p>
              </div>
            </div>
          </div>

          <div className="reviews-dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`reviews-dot ${i === index ? "active" : ""}`}
                onClick={() => setIndex(i)}
                aria-label={`View testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;