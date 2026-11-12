import React, { useState } from 'react';
import { StarRating } from '@nova/ui';

export const MobileReviewCard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="px-margin py-8 bg-surface-container-low border-t border-outline-variant/30">
      <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/40">
        <button
          type="button"
          className="w-full flex items-center justify-between text-left cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-title-editorial font-title-editorial text-primary text-[20px]">
            Thoughts on my Website? Many thanks
          </span>
          <span className="material-symbols-outlined text-secondary text-[22px]">
            {isOpen ? 'expand_less' : 'expand_more'}
          </span>
        </button>

        {isOpen && (
          <div className="pt-4 mt-3 border-t border-outline-variant/20">
            {submitted ? (
              <div className="p-4 text-center text-primary">
                <span className="material-symbols-outlined text-secondary text-3xl mb-1">check_circle</span>
                <p className="text-body-md font-medium">Thank you for your feedback!</p>
                <p className="text-body-sm text-on-surface-variant text-[12px] mt-0.5">
                  Your review has been submitted successfully.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-label-caps font-label-caps text-on-surface-variant uppercase tracking-wider mb-1">
                    Your Rating
                  </label>
                  <StarRating rating={rating} interactive onRatingChange={setRating} size="sm" />
                </div>

                <div>
                  <label className="block text-label-caps font-label-caps text-on-surface-variant uppercase tracking-wider mb-1">
                    Title of Review
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Summary of your thoughts"
                    className="w-full bg-transparent border-0 border-b border-outline-variant/60 focus:border-secondary focus:ring-0 px-0 py-1.5 text-body-sm font-body-sm text-primary placeholder-on-surface-variant/40 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-label-caps font-label-caps text-on-surface-variant uppercase tracking-wider mb-1">
                    Review
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Write your review here..."
                    className="w-full bg-transparent border-0 border-b border-outline-variant/60 focus:border-secondary focus:ring-0 px-0 py-1.5 text-body-sm font-body-sm text-primary placeholder-on-surface-variant/40 resize-none transition-colors"
                  />
                </div>

                <p className="text-body-sm font-body-sm text-on-surface-variant/80 text-[12px] italic pt-1 leading-normal">
                  This review is based on my own experience and is my genuine opinion.
                </p>

                <button
                  type="submit"
                  className="w-full h-11 bg-secondary text-on-secondary text-label-caps font-label-caps uppercase rounded-lg hover:bg-secondary-fixed transition-colors cursor-pointer mt-2"
                >
                  Submit Review
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

