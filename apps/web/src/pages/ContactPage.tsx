import React, { useState } from 'react';
import { REALTOR_INFO } from '@nova/types';
import {
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
  Separator,
} from '@nova/ui';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 400);
  };

  return (
    <div className="w-full flex flex-col">
      <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Breadcrumb Architectural Folio Indicator (Clean without harsh line) */}
        <div className="pt-6 pb-2 flex items-center space-x-2 text-xs font-semibold text-on-surface-variant uppercase tracking-widest">
          <span>Editorial Folio</span>
          <span className="text-secondary">•</span>
          <span className="text-secondary font-medium">Bespoke Advisory &amp; Direct Contact</span>
        </div>

        {/* 1. MAIN TWO-COLUMN CONTACT SECTION (12-Column Grid: 5 / 7 Ratio) */}
        <section className="py-8 pb-16 sm:pb-24">
          <div className="grid grid-cols-12 gap-y-12 lg:gap-x-12 items-start">
            {/* Left Column (5 Cols) */}
            <div className="col-span-12 lg:col-span-5 pr-0 lg:pr-4 flex flex-col justify-between">
              <div>
                <Badge variant="gold" className="mb-3">
                  Direct Line to Thomas
                </Badge>
                <h1 className="text-3xl sm:text-4xl lg:text-headline-section font-headline-section text-primary mb-4 leading-tight">
                  Contact Thomas Majcan
                </h1>
                <p className="font-body-md text-base sm:text-body-md text-on-surface-variant mb-8 leading-relaxed font-light">
                  Call or email me today for expert and personalized service. I would be happy to help you in any way that I can across Nova Scotia.
                </p>

                {/* Direct Contact Card */}
                <Card className="bg-surface-container-lowest p-6 border border-outline-variant/60 shadow-sm space-y-4 mb-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-11 h-11 rounded-xl bg-surface-container flex items-center justify-center text-secondary shrink-0">
                      <span className="material-symbols-outlined text-[22px]">phone_in_talk</span>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-secondary uppercase tracking-widest block">
                        Direct Cell / Text
                      </span>
                      <a
                        className="text-base sm:text-lg text-primary font-medium hover:text-secondary transition-colors"
                        href={REALTOR_INFO.phoneTel}
                      >
                        {REALTOR_INFO.phone}
                      </a>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center space-x-4">
                    <div className="w-11 h-11 rounded-xl bg-surface-container flex items-center justify-center text-secondary shrink-0">
                      <span className="material-symbols-outlined text-[22px]">mark_email_unread</span>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-secondary uppercase tracking-widest block">
                        Direct Email
                      </span>
                      <a
                        className="text-sm sm:text-base text-primary font-medium hover:text-secondary transition-colors truncate block max-w-[220px] sm:max-w-none"
                        href={REALTOR_INFO.emailMailto}
                      >
                        {REALTOR_INFO.email}
                      </a>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start space-x-4">
                    <div className="w-11 h-11 rounded-xl bg-surface-container flex items-center justify-center text-secondary shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[22px]">location_on</span>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-secondary uppercase tracking-widest block">
                        Century 21 Optimum Office
                      </span>
                      <p className="text-xs text-on-surface-variant leading-relaxed font-light mt-0.5">
                        {REALTOR_INFO.officeAddress}
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Thin Line Social Icons */}
                <div className="flex items-center space-x-3 mb-10 text-on-surface-variant">
                  <span className="text-xs font-semibold text-secondary uppercase tracking-widest mr-2">
                    Follow:
                  </span>
                  <a
                    aria-label="Facebook"
                    className="w-10 h-10 rounded-xl border border-outline-variant/60 bg-surface-container-lowest flex items-center justify-center text-primary hover:border-secondary hover:text-secondary transition-all shadow-xs"
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                    </svg>
                  </a>
                  <a
                    aria-label="X"
                    className="w-10 h-10 rounded-xl border border-outline-variant/60 bg-surface-container-lowest flex items-center justify-center text-primary hover:border-secondary hover:text-secondary transition-all shadow-xs"
                    href="https://x.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                    </svg>
                  </a>
                  <a
                    aria-label="Instagram"
                    className="w-10 h-10 rounded-xl border border-outline-variant/60 bg-surface-container-lowest flex items-center justify-center text-primary hover:border-secondary hover:text-secondary transition-all shadow-xs"
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                    </svg>
                  </a>
                  <a
                    aria-label="YouTube"
                    className="w-10 h-10 rounded-xl border border-outline-variant/60 bg-surface-container-lowest flex items-center justify-center text-primary hover:border-secondary hover:text-secondary transition-all shadow-xs"
                    href="https://youtube.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Professional shadcn Form (7 Cols) */}
            <div className="col-span-12 lg:col-span-7">
              <Card className="bg-surface-container-lowest p-6 sm:p-10 lg:p-12 border border-outline-variant/60 shadow-xl luxury-card-shadow">
                <CardHeader className="p-0 mb-6">
                  <Badge variant="gold" className="w-fit mb-2">Message Thomas Majcan</Badge>
                  <CardTitle className="text-2xl sm:text-3xl font-title-editorial">
                    Direct Inquiry Form
                  </CardTitle>
                  <CardDescription>
                    Send your questions, neighborhood preferences, or consultation request directly to Thomas.
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-0">
                  {submitted ? (
                    <div className="p-8 sm:p-10 text-center text-primary bg-surface-container-low rounded-2xl border border-secondary/40 space-y-3">
                      <span className="material-symbols-outlined text-secondary text-5xl">check_circle</span>
                      <h3 className="text-2xl font-title-editorial font-medium">Thank You</h3>
                      <p className="text-sm text-on-surface-variant max-w-md mx-auto font-light">
                        Your message has been delivered directly to Thomas Majcan. He will review your request and be in touch shortly.
                      </p>
                      <Button
                        variant="gold"
                        size="sm"
                        className="mt-4"
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({ name: '', email: '', phone: '', message: '' });
                        }}
                      >
                        Send Another Note
                      </Button>
                    </div>
                  ) : (
                    <form className="space-y-6" onSubmit={handleSubmit}>
                      <div>
                        <Label htmlFor="contact-name" className="mb-1.5" required>
                          Name
                        </Label>
                        <Input
                          id="contact-name"
                          required
                          type="text"
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="contact-email" className="mb-1.5" required>
                            Email Address
                          </Label>
                          <Input
                            id="contact-email"
                            required
                            type="email"
                            placeholder="name@domain.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="contact-phone" className="mb-1.5">
                            Phone Number
                          </Label>
                          <Input
                            id="contact-phone"
                            type="tel"
                            placeholder="902-..."
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="contact-message" className="mb-1.5" required>
                          Message
                        </Label>
                        <Textarea
                          id="contact-message"
                          required
                          placeholder="Tell me what you are looking for in Nova Scotia..."
                          rows={5}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        />
                      </div>

                      <Button
                        variant="gold"
                        size="lg"
                        type="submit"
                        disabled={submitting}
                        className="w-full shadow-md hover:shadow-lg transition-all"
                      >
                        {submitting ? (
                          <span>Sending message...</span>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <span className="material-symbols-outlined text-[18px] ml-2">send</span>
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 2. SCHEDULE A CONSULTATION FULL-WIDTH CALLOUT */}
        <section className="mb-16 sm:mb-24">
          <div className="bg-[#12212F] text-white p-8 sm:p-12 lg:p-14 rounded-3xl border border-white/10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="max-w-2xl">
              <Badge variant="gold" className="mb-3">
                Complimentary Real Estate Review
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-title-editorial text-white mb-3">
                Schedule a Consultation
              </h2>
              <p className="text-sm sm:text-base text-[#D8E4F0]/85 font-light leading-relaxed">
                Book a private discussion regarding coastal acreage, waterfront residences, Halifax relocations, or an in-depth Atlantic market evaluation.
              </p>
            </div>
            <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <a href={REALTOR_INFO.phoneTel} className="w-full sm:w-auto">
                <Button variant="gold" size="lg" className="w-full shadow-md">
                  <span className="material-symbols-outlined text-[18px] mr-2">calendar_month</span>
                  <span>Book a Free 30 Min Consultation</span>
                </Button>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
