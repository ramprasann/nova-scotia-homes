import React, { useState } from 'react';
import {
  StarRating,
  Button,
  Input,
  Textarea,
  Label,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
} from '@nova/ui';

export const ReviewSection: React.FC = () => {
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="w-full py-16 bg-surface-container-low border-t border-outline-variant/30">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <Badge variant="gold" className="mb-3">
          Feedback &amp; Impressions
        </Badge>
        <h3 className="text-2xl sm:text-headline-sm font-headline-sm text-primary mb-3">
          Thoughts on my Website? Many thanks
        </h3>
        <p className="text-sm font-body-sm text-on-surface-variant font-light mb-8 max-w-lg mx-auto">
          Your feedback ensures our Atlantic real estate portfolio continues to serve you effectively.
        </p>

        <Card className="bg-surface-container-lowest p-6 sm:p-8 border border-outline-variant/60 shadow-lg luxury-card-shadow text-left">
          <CardHeader className="p-0 mb-6">
            <CardTitle className="text-xl font-title-editorial">Share Your Experience</CardTitle>
            <CardDescription>
              We appreciate honest reviews from clients, visitors, and fellow Nova Scotians.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0">
            {submitted ? (
              <div className="p-6 sm:p-8 text-center text-primary bg-surface-container-low rounded-2xl border border-secondary/40 space-y-2">
                <span className="material-symbols-outlined text-secondary text-5xl mb-1">check_circle</span>
                <p className="text-xl sm:text-2xl font-title-editorial font-medium">Thank you for your valuable feedback!</p>
                <p className="text-sm text-on-surface-variant font-light">Your review has been submitted successfully.</p>
                <Button
                  variant="gold"
                  size="sm"
                  className="mt-4"
                  onClick={() => {
                    setSubmitted(false);
                    setTitle('');
                    setContent('');
                  }}
                >
                  Write Another Review
                </Button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <Label className="mb-2.5">
                    Your Rating
                  </Label>
                  <div className="flex items-center gap-3">
                    <StarRating rating={rating} interactive onRatingChange={setRating} size="lg" />
                    <span className="text-xs font-semibold text-secondary uppercase tracking-wider">
                      {rating}.0 of 5.0
                    </span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="review-title" className="mb-1.5" required>
                    Title of your review
                  </Label>
                  <Input
                    id="review-title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder="Summary of your thoughts"
                  />
                </div>

                <div>
                  <Label htmlFor="review-content" className="mb-1.5" required>
                    Your review
                  </Label>
                  <Textarea
                    id="review-content"
                    rows={3}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    placeholder="Share your experience navigating the site..."
                  />
                </div>

                <div className="flex items-start gap-2 pt-1 text-xs text-on-surface-variant font-light">
                  <span className="material-symbols-outlined text-secondary text-[16px] shrink-0 mt-0.5">
                    verified_user
                  </span>
                  <p className="italic">
                    This review is based on my own experience and is my genuine opinion.
                  </p>
                </div>

                <Button
                  type="submit"
                  variant="gold"
                  size="default"
                  className="w-full shadow-sm hover:shadow-md"
                >
                  <span>Submit Review</span>
                  <span className="material-symbols-outlined text-[16px] ml-1">rate_review</span>
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
