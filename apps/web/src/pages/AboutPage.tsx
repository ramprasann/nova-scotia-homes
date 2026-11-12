import React from 'react';
import { Link } from 'react-router-dom';
import thomasPhoto from '../assets/thomas.jpg';
import {
  REALTOR_INFO,
  SCENES_FROM_NOVA_SCOTIA,
  REAL_ESTATE_SERVICES,
  TESTIMONIALS,
} from '@nova/types';
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  StarRating,
  Separator,
} from '@nova/ui';

export const AboutPage: React.FC = () => {
  return (
    <div className="w-full flex flex-col">
      {/* SECTION 1: HERO (Halifax Waterfront) */}
      <section className="relative w-full h-[600px] bg-primary-container overflow-hidden flex items-center">
        {/* Background Image with Navy Gradient Tint */}
        <img
          alt="Halifax waterfront skyline and maritime coastal waters"
          className="absolute inset-0 w-full h-full object-cover scale-105 transform hover:scale-100 transition-transform duration-1000"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5ckPXT3lOOdWnOBi0KPGMmWpo7KxTXOQPsyw8UvHKOvVkUIP1kdXSXSKwvScsY4HFTePeuKw1fpoSa5azbFfcQ5_FT8Crcv5D_DH0vrpmuBUr4qEZU7ZJTp1zfYvMx_yCupHVtCMpEhTUvKFnPwee9TtEPTFq2-Z-WWA5Kxj209_UvrHB7kadLha5MeZi2zg07AdSC65EyZDgT-QQ_8oY_XNoMB3ClYM7vxC5AjD-"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#091118]/90 via-[#12212F]/75 to-[#091118]/60"></div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 w-full text-white">
          <div className="grid grid-cols-12 gap-y-8 lg:gap-x-12 items-end">
            <div className="col-span-12 lg:col-span-8 pr-0 lg:pr-8">
              <Badge variant="gold" className="mb-4">
                Archival Real Estate Folio • Dartmouth &amp; Halifax
              </Badge>
              <h1 className="text-3xl sm:text-5xl lg:text-display-hero font-display-hero text-white mb-6 max-w-2xl leading-[1.1] font-normal">
                Discover Your Dream Home in Nova Scotia
              </h1>
              <p className="font-body-lg text-base sm:text-lg text-surface-container max-w-xl font-light leading-relaxed">
                Explore the vibrant communities of Nova Scotia with expert guidance from a seasoned Realtor dedicated to your real estate success.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-4 space-y-4 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
              <div>
                <span className="text-secondary-fixed text-xs font-semibold uppercase tracking-wider block mb-1">
                  Pillar I
                </span>
                <h3 className="font-title-editorial text-xl sm:text-2xl text-white">Personalized Service</h3>
                <p className="text-sm text-gray-300 font-light mt-1 leading-relaxed">
                  Direct client advocacy, singular representation, and thoughtful consultation at every step.
                </p>
              </div>
              <Separator className="bg-white/10" />
              <div>
                <span className="text-secondary-fixed text-xs font-semibold uppercase tracking-wider block mb-1">
                  Pillar II
                </span>
                <h3 className="font-title-editorial text-xl sm:text-2xl text-white">Local Expertise</h3>
                <p className="text-sm text-gray-300 font-light mt-1 leading-relaxed">
                  Over two decades of nuanced Atlantic coast market intelligence across the HRM and beyond.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: MEET THOMAS MAJCAN (Asymmetric Split) */}
      <section className="py-16 sm:py-24 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-12 gap-y-12 lg:gap-x-12 items-start">
          {/* Left: Portrait Photo */}
          <div className="col-span-12 lg:col-span-5 relative">
            <Card className="p-0 overflow-hidden border border-outline-variant/50 bg-white shadow-2xl rounded-3xl w-full max-w-lg mx-auto lg:mx-0">
              <img
                alt="Portrait of Thomas Majcan, Nova Scotia Realtor"
                className="w-full h-auto object-cover object-top block"
                src={thomasPhoto}
              />
              <div className="p-4 flex justify-between items-baseline border-t border-outline-variant/40 bg-surface-container-lowest">
                <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                  {REALTOR_INFO.name}
                </span>
                <Badge variant="gold">
                  {REALTOR_INFO.brokerage}
                </Badge>
              </div>
            </Card>
          </div>

          {/* Right: Biography & Editorial Narrative */}
          <div className="col-span-12 lg:col-span-7 pl-0 lg:pl-6 flex flex-col justify-between">
            <div>
              <Badge variant="gold" className="mb-3">
                Principal Consultant • Since {REALTOR_INFO.servingSince}
              </Badge>

              <h2 className="text-3xl sm:text-4xl lg:text-headline-section font-headline-section text-primary mb-6 leading-tight">
                Meet Thomas Majcan
              </h2>

              <div className="space-y-5 text-on-surface-variant font-body-md text-base sm:text-body-md leading-relaxed">
                <p className="font-body-lg text-lg text-primary font-normal">
                  With over 22 years of dedicated service in real estate and client care, Thomas Majcan is your trusted partner for buying and selling homes in Nova Scotia. His extensive experience spans residential properties, condos, and waterfront homes across the province.
                </p>
                <p>
                  Thomas approaches real estate through the lens of craftsmanship and community stewardship. Rather than viewing properties as rapid transactions, each engagement is curated with thoughtful attention to neighborhood character, structural integrity, and long-term financial heritage.
                </p>
                <p>
                  Having navigated decades of Atlantic real estate market cycles, Thomas provides sellers with surgical pricing precision and strategic marketing, while buyers benefit from his meticulous inspection instincts and deep community ties across Dartmouth, Halifax, and the South Shore.
                </p>
                <p>
                  An accomplished musician and active community advocate, Thomas brings a listening ear, calm temperament, and absolute fiduciary dedication to every negotiation.
                </p>
              </div>

              {/* Signature Quote Block (Clean without curved line) */}
              <div className="mt-8 p-6 rounded-2xl bg-[#f8f5ee] border border-outline-variant/50 shadow-xs">
                <p className="font-title-editorial text-lg sm:text-xl italic text-primary leading-snug">
                  {REALTOR_INFO.motto}
                </p>
                <p className="text-xs font-semibold text-secondary uppercase tracking-widest mt-2">
                  Thomas Majcan | Century 21 Optimum
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a href={REALTOR_INFO.phoneTel}>
                  <Button variant="gold" size="default">
                    <span className="material-symbols-outlined text-[18px] mr-2">call</span>
                    <span>Call Thomas Directly</span>
                  </Button>
                </a>
                <Link to="/contact">
                  <Button variant="secondary" size="default">
                    <span>Message Thomas</span>
                    <span className="material-symbols-outlined text-[16px] ml-2">north_east</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: CURATED SCENES FROM NOVA SCOTIA (9-Photo Masonry Gallery) */}
      <section className="py-16 sm:py-24 bg-surface-container-low" id="gallery">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Badge variant="gold" className="text-[11px] font-semibold tracking-widest uppercase mb-3">
              Visual Folio
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-headline-section font-headline-section text-primary mb-3">
              Scenes from Nova Scotia
            </h2>
            <p className="text-body-md font-body-md text-on-surface-variant font-light">
              Visual snapshots celebrating the diverse architectural, coastal, and urban heritage of our province.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SCENES_FROM_NOVA_SCOTIA.map((scene) => (
              <Card
                key={scene.id}
                className="overflow-hidden border border-outline-variant/60 shadow-sm luxury-card-shadow group bg-surface-container-lowest"
              >
                <div className="relative h-60 sm:h-64 overflow-hidden bg-surface-container">
                  <img
                    alt={scene.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    src={scene.imageUrl}
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="navy" className="text-[10px]">
                      {scene.category}
                    </Badge>
                  </div>
                </div>
                <div className="p-4 bg-surface-container-lowest border-t border-outline-variant/30 flex items-center justify-between">
                  <h3 className="font-title-editorial text-lg text-primary font-medium">
                    {scene.title}
                  </h3>
                  <span className="material-symbols-outlined text-secondary text-[18px]">explore</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: CLIENT ENDORSEMENTS */}
      <section className="py-16 sm:py-24 bg-surface">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Badge variant="gold" className="mb-3">
              Verified Client Feedback
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-headline-section font-headline-section text-primary mb-3">
              Endorsements &amp; Advocacy
            </h2>
            <p className="text-body-md font-body-md text-on-surface-variant font-light">
              Read what homeowners and buyers share regarding their journey with Thomas Majcan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <Card
                key={t.id}
                className="p-6 sm:p-8 border border-outline-variant/60 shadow-sm luxury-card-shadow flex flex-col justify-between bg-surface-container-lowest"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <StarRating rating={t.rating} />
                    <span className="text-xs font-semibold text-secondary uppercase tracking-wider">
                      Tested &amp; Proven
                    </span>
                  </div>
                  <p className="font-title-editorial text-base italic text-primary leading-relaxed mb-6">
                    “{t.quote}”
                  </p>
                </div>
                <div className="pt-4 border-t border-outline-variant/40 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sm text-primary">{t.author}</p>
                    <p className="text-xs text-on-surface-variant font-light">{t.location}</p>
                  </div>
                  <Badge variant="subtle">Verified</Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: ACTION BANNER */}
      <section className="w-full py-16 bg-[#0e1a24] text-white text-center">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <Badge variant="gold" className="mb-4">
            Connect Today
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-title-editorial text-white mb-4">
            Ready to Begin Your Nova Scotia Real Estate Journey?
          </h2>
          <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto mb-8 font-light">
            Contact Thomas Majcan directly for bespoke guidance, property valuations, or private viewings.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={REALTOR_INFO.phoneTel}>
              <Button variant="gold" size="lg" className="w-full sm:w-auto shadow-md">
                <span className="material-symbols-outlined text-[20px] mr-2">call</span>
                <span>Call {REALTOR_INFO.phone}</span>
              </Button>
            </a>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-white/60 text-white hover:bg-white hover:text-primary">
                <span>Contact Page</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
