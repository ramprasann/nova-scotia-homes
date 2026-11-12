import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import thomasPhoto from '../assets/thomas.jpg';
import {
  REALTOR_INFO,
  FEATURED_PROPERTY,
  SERVICING_AREAS,
  TESTIMONIALS,
  REAL_ESTATE_SERVICES,
} from '@nova/types';
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
  StarRating,
  Separator,
} from '@nova/ui';

export const HomePage: React.FC = () => {
  const [selectedIntent, setSelectedIntent] = useState<'selling' | 'buying' | 'both'>('selling');
  const [isSaved, setIsSaved] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setFormSubmitted(true);
    }, 400);
  };

  return (
    <div className="w-full flex flex-col">
      {/* SECTION 1: HERO (Pill removed per user request) */}
      <section className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center bg-primary-container overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt="Peggy's Cove Sunset in Nova Scotia"
            className="w-full h-full object-cover object-center scale-105 transform hover:scale-100 transition-transform duration-1000"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJnKHjxayZLBsCuE8a3B3-GB-FJJXgrdUvI7k7M6KyY69ojdPCQaPG2HAnk_FCBdxFgaVZUHTT2EPW99Bx9yKcXI794ml0fIRoP9gwJ-MLU3c8Myq6AUd5sBOYNKz6G-hDZcvigm3o56tWu0-T5YKIIJC0zDt1MmiuHFOv60QBAWtD91VXxYxrtRTjJA07-BgsG6VT5u00_fw69nNvzYsDBpxDJ_c9l-4gbulMBq9R"
          />
          {/* Subtle multi-stop gradient for maximum readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#091118] via-[#12212F]/65 to-[#091118]/45"></div>
        </div>

        <div className="relative z-10 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center text-on-primary">
          <h1 className="text-3xl sm:text-5xl lg:text-display-hero font-display-hero max-w-4xl mx-auto mb-6 text-white leading-[1.1] tracking-tight drop-shadow-sm font-normal">
            Discover Your Dream Home in Nova Scotia
          </h1>

          <p className="text-base sm:text-lg lg:text-body-lg font-body-lg text-[#F7F4EE]/90 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Find the Perfect Property with Thomas Majcan. Explore a curated selection of homes that match your lifestyle and budget.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={REALTOR_INFO.phoneTel}>
              <Button variant="gold" size="lg" className="w-full sm:w-auto shadow-lg hover:shadow-xl group">
                <span className="material-symbols-outlined text-[20px] mr-2">call</span>
                <span>Call Thomas today!</span>
              </Button>
            </a>
            <Link to="/contact">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-white/60 text-white hover:bg-white hover:text-primary transition-all shadow-md backdrop-blur-sm"
              >
                <span>Contact Thomas</span>
                <span className="material-symbols-outlined text-[18px] ml-2">arrow_forward</span>
              </Button>
            </Link>
          </div>

          {/* Quick Metrics Trust Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-14 pt-8 border-t border-white/15 text-left">
            <div className="p-2">
              <p className="text-xl sm:text-2xl font-title-editorial text-secondary-fixed font-semibold">22+ Years</p>
              <p className="text-xs text-gray-300 font-light mt-0.5">Continuous NS Practice</p>
            </div>
            <div className="p-2">
              <p className="text-xl sm:text-2xl font-title-editorial text-secondary-fixed font-semibold">C21 Optimum</p>
              <p className="text-xs text-gray-300 font-light mt-0.5">Top Atlantic Brokerage</p>
            </div>
            <div className="p-2">
              <p className="text-xl sm:text-2xl font-title-editorial text-secondary-fixed font-semibold">Fiduciary Care</p>
              <p className="text-xs text-gray-300 font-light mt-0.5">Before, During &amp; After</p>
            </div>
            <div className="p-2">
              <p className="text-xl sm:text-2xl font-title-editorial text-secondary-fixed font-semibold">All NS Counties</p>
              <p className="text-xs text-gray-300 font-light mt-0.5">Full Interprovincial Reach</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: WELCOME (Asymmetric 5:7 Split Layout) */}
      <section className="w-full py-16 sm:py-24 bg-surface" id="about">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-12 gap-y-12 lg:gap-x-12 items-center">
            {/* Left Column: Clean Single Advisor Card (5 cols) - Fully Responsive & Prominent */}
            <div className="col-span-12 lg:col-span-5 relative">
              <div className="relative w-full rounded-2xl overflow-hidden shadow-xl border border-outline-variant/50 bg-surface-container-high group transition-all duration-300">
                <img
                  alt="Thomas Majcan - Nova Scotia Licensed Realtor"
                  className="w-full h-auto object-cover object-top block transition-transform duration-700 group-hover:scale-105"
                  src={thomasPhoto}
                />
                <div className="p-4 bg-surface-container-lowest border-t border-outline-variant/40 flex items-center justify-between">
                  <div>
                    <p className="font-title-editorial text-base font-semibold text-primary">
                      {REALTOR_INFO.name}
                    </p>
                    <p className="text-xs font-label-caps uppercase text-secondary font-semibold">
                      {REALTOR_INFO.brokerage} • Dartmouth, NS
                    </p>
                  </div>
                  <Badge variant="gold">Realtor® Since 2003</Badge>
                </div>
              </div>
            </div>

            {/* Right Column: Editorial Narrative (7 cols) - Clean without harsh colored lines */}
            <div className="col-span-12 lg:col-span-7 lg:pl-6">
              <Badge variant="gold" className="text-[11px] font-semibold tracking-widest uppercase mb-3">
                Atlantic Heritage • Established Practice
              </Badge>

              <h2 className="text-3xl sm:text-4xl lg:text-headline-section font-headline-section text-primary mb-6 leading-tight">
                Welcome Everyone.
              </h2>

              <div className="space-y-5 text-on-surface-variant font-body-md text-base sm:text-body-md leading-relaxed">
                <p className="font-body-lg text-lg text-primary font-normal leading-relaxed">
                  Whether you're a first-time Home Buyer, Downsizing, Growing a family, Estate Sale or looking to invest, Thomas provides expert guidance every step of the way.
                </p>
                <p>
                  Yes, Experience is everything. Go with a Pro! Real estate decisions are among the most significant choices you will make, and my mission is to ensure you make them with absolute peace of mind.
                </p>
                <p>
                  From historic Hydrostone homes and suburban residences in Dartmouth to coastal retreats along the Eastern Shore, my approach combines deep neighborhood knowledge, rigorous valuation analysis, and tireless client advocacy.
                </p>
              </div>

              {/* Signature Quote Callout Card (Curved vertical line removed) */}
              <div className="mt-8 p-6 rounded-2xl bg-[#f8f5ee] border border-outline-variant/50 shadow-xs">
                <p className="font-title-editorial text-lg sm:text-xl italic text-primary leading-snug">
                  {REALTOR_INFO.motto}
                </p>
                <p className="text-xs font-semibold text-secondary uppercase tracking-widest mt-2">
                  — {REALTOR_INFO.name} | {REALTOR_INFO.brokerage}
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link to="/about">
                  <Button variant="secondary" size="default">
                    <span>Read Full Professional Story</span>
                    <span className="material-symbols-outlined text-[16px] ml-2">arrow_forward</span>
                  </Button>
                </Link>
                <a href={REALTOR_INFO.phoneTel}>
                  <Button variant="gold" size="default">
                    <span>Call {REALTOR_INFO.phone}</span>
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: CREDENTIAL BAND (Navy Background) */}
      <section className="w-full py-14 bg-primary-container text-on-primary">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sellers */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-secondary/40 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-secondary-fixed text-2xl">savings</span>
                <Badge variant="gold">For Sellers</Badge>
              </div>
              <p className="text-title-editorial font-title-editorial text-white text-xl leading-snug mb-2">
                SELLERS save your money on listing rates.
              </p>
              <p className="text-sm text-gray-300 font-light">
                Keep more of your hard-earned equity through competitive listing fee structures tailored to Nova Scotia homeowners.
              </p>
            </div>

            {/* Buyers */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-secondary/40 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-secondary-fixed text-2xl">key</span>
                <Badge variant="gold">For Buyers</Badge>
              </div>
              <p className="text-title-editorial font-title-editorial text-white text-xl leading-snug mb-2">
                BUYERS using me generally do NOT pay for my FULL services.
              </p>
              <p className="text-sm text-gray-300 font-light">
                Receive seasoned guidance, contract review, and full representation during your search without paying direct advisory fees.
              </p>
            </div>

            {/* Relocating */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-secondary/40 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-secondary-fixed text-2xl">flight_takeoff</span>
                <Badge variant="gold">Relocation</Badge>
              </div>
              <p className="text-title-editorial font-title-editorial text-white text-xl leading-snug mb-2">
                RELOCATING? I have a Sales Representative network to sell fast.
              </p>
              <p className="text-sm text-gray-300 font-light">
                Seamless interprovincial connections to coordinate your sale and purchase across Canada and international destinations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: SERVICING AREAS + RELOCATION */}
      <section className="w-full py-16 sm:py-24 bg-surface-container-low" id="areas">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-12 gap-y-12 lg:gap-x-12">
            {/* Left Column: Servicing Areas (7 cols) */}
            <div className="col-span-12 lg:col-span-7">
              <Badge variant="gold" className="text-[11px] font-semibold tracking-widest uppercase mb-3">
                Regional Focus
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-headline-section font-headline-section text-primary mb-4">
                Areas Serviced
              </h2>
              <p className="text-body-md font-body-md text-on-surface-variant mb-8 max-w-xl font-light">
                Providing dedicated residential and acreage representation across the Halifax Regional Municipality, Dartmouth, and all major counties throughout Nova Scotia.
              </p>

              {/* Tag / Chip Cloud */}
              <div className="flex flex-wrap gap-2.5">
                {SERVICING_AREAS.map((area, idx) => (
                  <span
                    key={idx}
                    className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 cursor-default ${
                      area === 'Cole Harbour' || area === 'ALL counties in Nova Scotia'
                        ? 'bg-secondary text-white shadow-sm'
                        : 'bg-surface-container-lowest border border-outline-variant/60 text-primary hover:border-secondary hover:bg-white'
                    }`}
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column: Relocation Card (5 cols) */}
            <div className="col-span-12 lg:col-span-5">
              <Card className="bg-surface-container-lowest p-6 sm:p-8 border border-outline-variant/60 shadow-md luxury-card-shadow">
                <CardHeader className="p-0 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="material-symbols-outlined text-secondary text-3xl">map</span>
                    <Badge variant="gold">Coast to Coast</Badge>
                  </div>
                  <CardTitle className="text-xl sm:text-2xl font-title-editorial text-primary">
                    Relocation Specialists
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-4 text-sm text-on-surface-variant font-light leading-relaxed">
                  <p>
                    Moving across Canada or internationally? Thomas works with a proven network of Sales Representatives to ensure your transition to or from Nova Scotia is smooth, coordinated, and stress-free.
                  </p>
                  <p>
                    Get curated market assessments, school zone consultations, and neighborhood walkthroughs tailored to your arrival schedule.
                  </p>
                  <Separator className="my-4" />
                  <div className="pt-2 flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-outline font-semibold">Ready to move?</p>
                      <p className="text-primary font-medium text-sm">{REALTOR_INFO.phone}</p>
                    </div>
                    <Link to="/contact">
                      <Button variant="gold" size="sm">
                        Request Packet
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: FEATURED PROPERTY SHOWCASE (8 Sherwood Street) */}
      <section className="w-full py-16 sm:py-24 bg-surface" id="featured">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Badge variant="gold" className="text-[11px] font-semibold tracking-widest uppercase mb-3">
              Curated Listing
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-headline-section font-headline-section text-primary mb-3">
              Featured Property
            </h2>
            <p className="text-body-md font-body-md text-on-surface-variant font-light">
              Explore this handpicked Nova Scotia residence representing exceptional architectural quality and value.
            </p>
          </div>

          {/* Featured Property Card */}
          <Card className="max-w-5xl mx-auto overflow-hidden border border-outline-variant/60 shadow-lg luxury-card-shadow">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Photo Area (7 cols) */}
              <div className="col-span-1 lg:col-span-7 relative min-h-[320px] sm:min-h-[380px] bg-surface-container overflow-hidden group">
                <img
                  alt={FEATURED_PROPERTY.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src={FEATURED_PROPERTY.imageUrl}
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge variant="primary" className="bg-[#12212F] text-white">
                    {FEATURED_PROPERTY.badgeText}
                  </Badge>
                  <Badge variant="gold">
                    MLS® Exclusive
                  </Badge>
                </div>
                <button
                  type="button"
                  aria-label="Save property"
                  onClick={() => setIsSaved(!isSaved)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-primary shadow-sm hover:text-rose-600 transition-colors cursor-pointer"
                >
                  <span className={`material-symbols-outlined text-[20px] ${isSaved ? 'fill text-rose-600' : ''}`}>
                    favorite
                  </span>
                </button>
              </div>

              {/* Details Area (5 cols) */}
              <div className="col-span-1 lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-surface-container-lowest">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-secondary uppercase tracking-wider">
                      {FEATURED_PROPERTY.community}, NS
                    </span>
                    <span className="text-xs text-on-surface-variant bg-surface-container px-2.5 py-0.5 rounded-full font-medium">
                      Cole Harbour
                    </span>
                  </div>

                  <h3 className="text-2xl lg:text-3xl font-title-editorial font-medium text-primary leading-tight mb-2">
                    8 Sherwood Street
                  </h3>
                  <p className="text-sm text-on-surface-variant font-light mb-6">
                    Cole Harbour, Nova Scotia B2V 2P4
                  </p>

                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-outline-variant/40 mb-6 text-center">
                    <div className="p-2">
                      <span className="material-symbols-outlined text-secondary text-xl">bed</span>
                      <p className="text-xs font-semibold text-primary mt-1">{FEATURED_PROPERTY.bedrooms}</p>
                    </div>
                    <div className="p-2 border-x border-outline-variant/40">
                      <span className="material-symbols-outlined text-secondary text-xl">bathtub</span>
                      <p className="text-xs font-semibold text-primary mt-1">{FEATURED_PROPERTY.bathrooms}</p>
                    </div>
                    <div className="p-2">
                      <span className="material-symbols-outlined text-secondary text-xl">square_foot</span>
                      <p className="text-xs font-semibold text-primary mt-1">{FEATURED_PROPERTY.sqft}</p>
                    </div>
                  </div>

                  <p className="text-sm text-on-surface-variant font-light leading-relaxed mb-6">
                    {FEATURED_PROPERTY.description}
                  </p>
                </div>

                <div>
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="text-xs uppercase tracking-wider text-outline font-semibold">Offering Price</span>
                    <span className="text-2xl sm:text-3xl font-title-editorial text-primary font-semibold">
                      {FEATURED_PROPERTY.formattedPrice}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <a href={REALTOR_INFO.phoneTel} className="flex-1">
                      <Button variant="gold" className="w-full">
                        Schedule Tour
                      </Button>
                    </a>
                    <Link to="/contact">
                      <Button variant="secondary" size="icon" aria-label="Inquire about property">
                        <span className="material-symbols-outlined text-[18px]">mail</span>
                      </Button>
                    </Link>
                  </div>

                  <div className="mt-6 pt-4 border-t border-outline-variant/30 flex items-center justify-between">
                    <img
                      alt="Century 21 Optimum Logo"
                      className="h-6 w-auto object-contain opacity-90"
                      src={FEATURED_PROPERTY.brokerageLogoUrl}
                    />
                    <span className="text-[11px] text-on-surface-variant/70 font-light">Direct Brokerage Listing</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* SECTION 6: CLIENT TESTIMONIALS */}
      <section className="w-full py-16 sm:py-24 bg-surface-container-low" id="testimonials">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Badge variant="gold" className="text-[11px] font-semibold tracking-widest uppercase mb-3">
              Client Experiences
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-headline-section font-headline-section text-primary mb-3">
              What Clients Say
            </h2>
            <p className="text-body-md font-body-md text-on-surface-variant font-light">
              Read first-hand feedback from homeowners, buyers, and sellers across Nova Scotia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <Card
                key={t.id}
                className="bg-surface-container-lowest p-6 sm:p-8 border border-outline-variant/60 shadow-sm luxury-card-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <StarRating rating={t.rating} />
                    <span className="text-xs font-semibold text-secondary uppercase tracking-wider">
                      5.0 Verified
                    </span>
                  </div>
                  <p className="text-base font-title-editorial italic text-primary leading-relaxed mb-6">
                    “{t.quote}”
                  </p>
                </div>
                <div className="pt-4 border-t border-outline-variant/40 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sm text-primary">{t.author}</p>
                    <p className="text-xs text-on-surface-variant font-light">{t.location}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary-container text-secondary-fixed flex items-center justify-center text-xs font-semibold">
                    {t.author.charAt(0)}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: CORE SERVICES (Harsh border line removed per Image 5) */}
      <section className="w-full py-16 sm:py-24 bg-surface" id="services">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-4">
            <div>
              <Badge variant="gold" className="text-[11px] font-semibold tracking-widest uppercase mb-3">
                Pillars of Practice
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-headline-section font-headline-section text-primary">
                Core Real Estate Services
              </h2>
            </div>
            <p className="text-body-md font-body-md text-on-surface-variant max-w-md font-light">
              Comprehensive real estate solutions ensuring a seamless journey before, during, and after your transaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {REAL_ESTATE_SERVICES.map((s) => (
              <Card
                key={s.index}
                className="p-6 sm:p-8 border border-outline-variant/60 hover:border-secondary/60 transition-all duration-200 luxury-card-shadow bg-surface-container-lowest flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl sm:text-3xl font-title-editorial text-secondary font-light">
                      {s.index}
                    </span>
                    <Badge variant="subtle" className="text-xs">
                      {s.categoryTag}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-title-editorial font-medium text-primary mb-2">
                    {s.title}
                  </h3>
                  <p className="text-sm text-on-surface-variant font-light leading-relaxed">
                    {s.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-outline-variant/30 flex items-center justify-between text-xs text-secondary font-semibold uppercase tracking-wider">
                  <span>Inquire with Thomas</span>
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: GET STARTED FORM (Professional shadcn Form) */}
      <section className="w-full py-16 sm:py-24 bg-surface-container-low" id="contact">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-12 gap-y-12 lg:gap-x-12 items-start">
            {/* Left Column: Direct Consultation Details (5 cols) */}
            <div className="col-span-12 lg:col-span-5">
              <Badge variant="gold" className="text-[11px] font-semibold tracking-widest uppercase mb-3">
                Initiate Consultation
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-headline-section font-headline-section text-primary mb-4">
                Get Started
              </h2>
              <p className="text-body-md font-body-md text-on-surface-variant leading-relaxed mb-8 font-light">
                Ready to find your dream home or sell your property? Please connect now to receive experienced advice and schedule a consultation with Thomas Majcan.
              </p>

              <Card className="bg-surface-container-lowest p-6 border border-outline-variant/60 space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-secondary shrink-0">
                    <span className="material-symbols-outlined text-[20px]">phone</span>
                  </div>
                  <div>
                    <p className="text-xs uppercase font-label-caps tracking-wider text-outline font-semibold">Direct Phone</p>
                    <a href={REALTOR_INFO.phoneTel} className="text-primary font-medium text-sm hover:text-secondary transition-colors">
                      {REALTOR_INFO.phone}
                    </a>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-secondary shrink-0">
                    <span className="material-symbols-outlined text-[20px]">mail</span>
                  </div>
                  <div>
                    <p className="text-xs uppercase font-label-caps tracking-wider text-outline font-semibold">Direct Email</p>
                    <a href={REALTOR_INFO.emailMailto} className="text-primary font-medium text-sm hover:text-secondary transition-colors">
                      {REALTOR_INFO.email}
                    </a>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-secondary shrink-0">
                    <span className="material-symbols-outlined text-[20px]">location_on</span>
                  </div>
                  <div>
                    <p className="text-xs uppercase font-label-caps tracking-wider text-outline font-semibold">Office Location</p>
                    <p className="text-primary font-medium text-xs leading-relaxed">
                      {REALTOR_INFO.officeAddress}
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Column: Professional shadcn Form (7 cols) */}
            <div className="col-span-12 lg:col-span-7">
              <Card className="bg-surface-container-lowest p-6 sm:p-10 border border-outline-variant/60 shadow-xl luxury-card-shadow">
                <CardHeader className="p-0 mb-6">
                  <Badge variant="gold" className="w-fit mb-2">Direct Correspondence</Badge>
                  <CardTitle className="text-2xl sm:text-3xl font-title-editorial">Send an Inquiry</CardTitle>
                  <CardDescription>
                    Fill in your details below and Thomas will personally respond within 24 hours.
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-0">
                  {formSubmitted ? (
                    <div className="p-8 sm:p-10 text-center text-primary bg-surface-container-low rounded-2xl border border-secondary/40 space-y-3">
                      <span className="material-symbols-outlined text-secondary text-5xl">check_circle</span>
                      <h3 className="text-2xl font-title-editorial font-medium">Inquiry Sent Successfully</h3>
                      <p className="text-sm text-on-surface-variant max-w-md mx-auto font-light">
                        Thank you for reaching out. Thomas Majcan has received your message and will review your real estate requirements promptly.
                      </p>
                      <Button
                        variant="gold"
                        size="sm"
                        className="mt-4"
                        onClick={() => {
                          setFormSubmitted(false);
                          setFormData({ name: '', email: '', phone: '', message: '' });
                        }}
                      >
                        Send Another Note
                      </Button>
                    </div>
                  ) : (
                    <form className="space-y-6" onSubmit={handleFormSubmit}>
                      {/* Segmented Intent Selector */}
                      <div>
                        <Label className="mb-2" required>
                          I am planning to:
                        </Label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 bg-surface-container rounded-2xl border border-outline-variant/40">
                          {(['selling', 'buying', 'both'] as const).map((intent) => (
                            <button
                              key={intent}
                              type="button"
                              onClick={() => setSelectedIntent(intent)}
                              className={`py-2.5 px-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-150 cursor-pointer ${
                                selectedIntent === intent
                                  ? 'bg-primary text-white shadow-sm'
                                  : 'text-on-surface-variant hover:text-primary hover:bg-white/50'
                              }`}
                            >
                              {intent === 'both' ? 'Both / Relocating' : `${intent.charAt(0).toUpperCase() + intent.slice(1)} Home`}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="home-name" className="mb-1.5" required>
                            Full Name
                          </Label>
                          <Input
                            id="home-name"
                            required
                            type="text"
                            placeholder="e.g. Sarah Jenkins"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="home-email" className="mb-1.5" required>
                            Email Address
                          </Label>
                          <Input
                            id="home-email"
                            required
                            type="email"
                            placeholder="name@domain.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="home-phone" className="mb-1.5">
                          Phone Number (Optional)
                        </Label>
                        <Input
                          id="home-phone"
                          type="tel"
                          placeholder="e.g. 902-233-5111"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>

                      <div>
                        <Label htmlFor="home-message" className="mb-1.5" required>
                          Preferred Area / Timeline / Questions
                        </Label>
                        <Textarea
                          id="home-message"
                          required
                          placeholder="Tell Thomas about your desired neighborhood, timeline, or property valuation request..."
                          rows={4}
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
                            <span>Send Message to Thomas</span>
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
        </div>
      </section>

      {/* SECTION 9: NAVY BANNER ACTION */}
      <section className="w-full py-16 bg-[#0e1a24] text-white text-center">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <Badge variant="gold" className="mb-4">
            Direct Brokerage Contact
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-title-editorial text-white mb-4">
            {REALTOR_INFO.quoteHeadline}
          </h2>
          <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto mb-8 font-light">
            Tested, Trusted and Recommended Real Estate Sales Pro in Nova Scotia since 2003.
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
                <span>Book a Consultation</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
