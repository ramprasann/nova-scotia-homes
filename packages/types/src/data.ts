import { PropertyListing, ClientTestimonial, RealEstateService, GalleryItem, ServicePillar, FeaturedListingInfo } from './index';

export const REALTOR_INFO = {
  name: 'Thomas Majcan',
  brokerage: 'Century 21 Optimum',
  phone: '902 233 5111',
  phoneDisplay: '902-233-5111',
  phoneTel: 'tel:9022335111',
  email: 'sutomusic@bellaliant.net',
  emailMailto: 'mailto:sutomusic@bellaliant.net',
  officeAddress: '24 Logiealmond Close, Unit 24 – Dartmouth, NS B3B 0C8',
  experienceYears: 22,
  servingSince: 2003,
  tagline: 'Your Real Estate Pro since 2003',
  motto: '“Your Consultant/Community Real Estate Sales Pro since 2003 — Tested, Trusted and Recommended”',
  quoteHeadline: '“Go with a Pro!”',
  domain: 'www.novascotiahomes.ca',
  designerCredit: 'Designed by David Glowasky using DIVI theme',
};

export const FEATURED_PROPERTY: PropertyListing = {
  id: '8-sherwood-street',
  title: '8 Sherwood Street, Cole Harbour, Nova Scotia B2V2P4',
  address: '8 Sherwood Street, Cole Harbour, Nova Scotia B2V2P4',
  price: 498900,
  formattedPrice: '$498,900',
  community: 'Cole Harbour',
  bedrooms: '2+1 bedrooms',
  bathrooms: '2 baths',
  sqft: '1,850 sqft',
  description:
    'Quiet residential cul-de-sac setting offering manicured grounds, refined interior finishes, and immediate proximity to Cole Harbour educational centers and trails.',
  imageUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBMHsbac3dUgd7-ad2sxvuyzBS6zIHLrXVDat7G54f5dAZGqbNwN58LxjJnfBoc4WQtr4feBSMeJ8NRjYbA60VO_3sT5fZxxRffBHq5PGM1PE4qvLsGF1fs1IZkUyXobZ1yRKWVTY1yctVeU9tFzqOvNS1n-_moIafwSBwSLypuC33hHYfI6ceIHQpw3Qt-bD8m8AnTjOlcdQcuGwntKd73jvsQC29t4wP6nX8DDAOW',
  badgeText: 'For Sale',
  brokerageLogoUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCPd-GVVy7KuXVv7XrXhMvjzjpIqZfFKpu5I1MMir5g-QoErElftu123ZQJ6iADMfq4N6nzsUzV1_g63iiSSp1c0u5SJFC7lS7S7JS8dWxx74vAdOiyATsPwgVNqiJI_JU70LB0-k7jMc0O6vxaopLdlH3rLDjw66Bu8iXgQN0VYJgqX-roeUw_TrXjiA1Jh0-aPj23wkO-mQPw-DgdwmN7ouJqEKvidQTlg3jsfM5Z',
};

export const SERVICING_AREAS = [
  'Colby',
  'Forest Hills',
  'Cole Harbour',
  'Woodlawn',
  'Portland Hills & Portland Estates',
  'Eastern Passage',
  'Dartmouth',
  'Halifax',
  'Kentville',
  'Wolfville',
  'Windsor',
  'Brooklyn',
  'Ardoise',
  'Annapolis Valley',
  'ALL counties in Nova Scotia',
];

export const FEATURED_LISTING: FeaturedListingInfo = {
  address: '8 Sherwood Street',
  city: 'Cole Harbour',
  postalCode: 'B2V 2P4',
  price: 498900,
  formattedPrice: '$498,900',
  specs: {
    beds: '2+1',
    baths: 2,
    sqft: 1850,
  },
  imageUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCVi67yoVc5zhAkBldBZ9S5HpvGEP1Xllk_ZOHaUkKLO9HsSjOMW1UJepzZ5f2MM6I7TkmM4BbpsUgy5a72e5yAWHSGauGICsL332YgcYkOYvZzbwTUVTNWBr_BO-ANxCE2pQe1wk3NVg55i19qkFE1FaBcuhm241DkDJZErBtSJdsB0R-irXC2bM1ZAa2UMyMiX5YA6IVavyXJNpdMZe8CM80LbNHFKEwuZ1pkyLa5',
};

export const TESTIMONIALS: ClientTestimonial[] = [
  {
    id: '1',
    author: 'Alec M.',
    location: 'Dartmouth Homeowner',
    role: 'Verified Buyer',
    rating: 5,
    quote:
      'Working with Thomas Majcan was a game-changer for us. His expertise and attention to detail made buying our first home a seamless experience.',
  },
  {
    id: '2',
    author: 'Adam M.',
    location: 'Halifax Multi-Property Investor',
    role: 'Homeowner',
    rating: 5,
    quote:
      'Thomas\'s dedication to finding us the perfect home was unparalleled. We couldn\'t be happier with our purchase and the service we received.',
  },
  {
    id: '3',
    author: 'Geo & Nicole W.',
    location: 'Eastern Shore Seller',
    role: 'Verified Client',
    rating: 5,
    quote:
      'From start to finish, Thomas provided exceptional service. His knowledge of the market and friendly approach made all the difference.',
  },
];

export const SERVICE_PILLARS: ServicePillar[] = [
  {
    id: '1',
    title: 'Home Valuation & Market Equity Info',
    description: 'In-depth comparative analysis reflecting true Nova Scotia market equity.',
  },
  {
    id: '2',
    title: 'Mortgage, Legal & Inspection Advisory',
    description: 'Coordination with vetted Atlantic financial and structural specialists.',
  },
  {
    id: '3',
    title: 'Full-Service Buyer & Seller Representation',
    description: 'Bespoke negotiation strategies tailored directly to your property objectives.',
  },
  {
    id: '4',
    title: 'Service Before, During & After Sale',
    description: 'A lasting fiduciary relationship that continues well beyond the closing date.',
  },
];

export const REAL_ESTATE_SERVICES: RealEstateService[] = [
  {
    index: '01',
    title: "Your Home's Worth and Value Info",
    subtitle: 'Comprehensive Property Evaluations',
    description:
      'Precise, fact-based comparative market analyses combining historical regional land registry data, recent comparable closings, and physical architectural assessment.',
    categoryTag: 'Valuation',
    iconName: 'analytics',
  },
  {
    index: '02',
    title: 'Mortgage, Legal, Inspection info',
    subtitle: 'Expert Selling Tips',
    description:
      'Targeted curb-appeal optimization, pre-listing maintenance advisory, bespoke staging directives, and coordination with vetted Atlantic lenders and solicitors.',
    categoryTag: 'Due Diligence',
    iconName: 'auto_stories',
  },
  {
    index: '03',
    title: 'Full Service Seller and Buyer Representation',
    subtitle: 'Mortgage Assistance & Full Representation',
    description:
      'Strategic marketing campaigns, high-yield listing placement, and seasoned contract negotiation tailored to Atlantic regional requirements.',
    categoryTag: 'Agency',
    iconName: 'account_balance',
  },
  {
    index: '04',
    title: 'Service Before, During and After Sale',
    subtitle: 'Legal and Contractual Support',
    description:
      'Long-term advisory, property transition logistics, and enduring post-closing support that continues well beyond the closing date.',
    categoryTag: 'Ongoing Client Care',
    iconName: 'gavel',
  },
];

export const SCENES_FROM_NOVA_SCOTIA: GalleryItem[] = [
  {
    id: 'consultation',
    title: 'Consultation & Strategy',
    category: 'Consultation & Strategy',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAm2Cd-sz_MrdjZ7z4_4KFKb_lvKP9whTRu4dfO-8GDm-JsyGH2619PAJz0iUGsxA-bxtbV5xmopSKUihet2nECykgPzuBDl-of1g0sJIAdPawQEapEnM3QdlLL1l3IYuCyjmjp2l1uKlX_PSX4fZfi4ClOgXhm0Z9LEd4lCiHXQQUc0EwvyosTTfURYnuom34ANmL-GL_Z7cus7WtWWOYx-nOlvZH00gjEDz0VBN2u',
  },
  {
    id: 'eastern-shore',
    title: 'Eastern Shore Headlands',
    category: 'Eastern Shore Headlands',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCd_tKjZXNqsH6QPtynIS6tVLSpR4EdrS9jYwhxgYsNX0uWCYKDlPLIFH5AozI141QbuXiEJJljqq1CX_XpODBCOLuX0AHzqCdkCDmm8YAMsXJse3r98Jq7Yva1vON7Q3WyVb-mqaCGOBgXge14Z1KEf09kNR3qFOV0zOomMIGJGxwTqY5JmXbWQstp5TtWTxvNtvNdqjNiuU8VH3eZWOFj-rJjayzI968epZhtm_zV',
  },
  {
    id: 'citadel',
    title: 'Halifax Citadel National Site',
    category: 'Halifax Citadel National Site',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAjhCBwS0zuAAJDkgmygALlmUZQrMFM2wwVRvkCH1s0nYsmCbl8uQjQj7AM4b4sxGmX76kKfZdzoPXKuuTUepnxjvHv4w0B_h9gKKcln3e5huav6wZk0ngnMWUYkpAyTDuaiL2aWxlNvb8l0Z-CKWsieztUirvFPLigUhZnhf7BBh0S8x3idL_c2GGHLh7Ir4vnbZbjBpMNP9iHumZtsBOYBEmaTGxtBfFNKizcTXYt',
  },
  {
    id: 'urban-core',
    title: 'Urban Core & Harbourfront',
    category: 'Urban Core & Harbourfront',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDxUIIPDty-AB6k_86D2PE6R-IzNu2MEUunjkqeq1yJdZVePP6c9Y4i1WXjs1pu2-O_J_nTqYVTv7nG_6IeM0gpwJELenl_RFIcOl7tJfw81doThEg9KleHkdMbaV1tIp8S5qMcJfHHIv7CQ12pvDcJNFVIIFlSLPMzPYs9pwHPk7c-jvQStjziRr2GdiUvZYnoMZCl9SbcHDOaJl31bty67CE77H6whKnpaF839jcn',
  },
  {
    id: 'musician-community',
    title: 'Community Spirit & Musician',
    category: 'Community Spirit & Musician',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAAC-18HR3HNt5JdQ7fBIFB9eOwDRp1xqIgw7_T70qjc2iFl3KY7sw5z-jVBKF7Zu9fL57ncfIauGuAY8yk44WcF84hLXdt_vHnb4Ssu61-iLYfYiLexFVXPGfiCxAW-7cii_Xt2bjxIRJFdseGRy5bVTYaOkTeFaKI2eBIYQ4CS_T6qk8sXzDXcXGpoe1BG3Hwf6GDojuUh2sCvmHsg1hcNYwPaXyYygvCbnP5QOUu',
  },
  {
    id: 'lobster-shack',
    title: 'Traditional Coastal Outposts',
    category: 'Traditional Coastal Outposts',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB0XlgYwYEBHlhoYffnXfdMyof0FDrOPb4ddWFIAGwLRBBHLlPFoTJcZL13WY6s1bTbNzQkAGv847LomnXFjw28Pjx-k9CbVHvUUMUQe6LKGjJImTpCqucoqUh3DHOZ8oGB4GV9jZVXRPo50b86iVm8LpAvaNq87L8Cuv7sT1Da4HxwF-K-RZn4luLYEGUu0CbqqyiUYYMZQmF9b2ChE8C15vmSOh3hDJTHVnPjnRSU',
  },
  {
    id: 'field-exploration',
    title: 'Daily Field Explorations',
    category: 'Daily Field Explorations',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBMaRkhSyUXJhcpJ6r20LFYWmm2e0e8_K1YHg9SO80EjhVF0U41JTODbwoMeHJG0WEtjtUIPiLsB9ltmLeYzevo9UqsBItA3D2oaWdAqTR8DciZUzlhmM_evWL74qTO8apHWSR3vfVlJgYO80LGz8TWLbPkROvwpcVYU13HRygYHZQaF3sIPpU-wYevxjGIPJm5pLphlbJvS-sCF62_rePPJX0k5qqNk9_aIRW4hYzQ',
  },
  {
    id: 'hydrostone',
    title: 'Historic Hydrostone District',
    category: 'Historic Hydrostone District',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDUbEN2WwgdKDN3zCXoIFWVnjT0BCLSfzm1z_KlkmU6xBoACfh4SRxRBrWXlzpBcrtSIY4YDVDF_fs_xFM0aXSP9zqboJVFnrd9qOr1lkbDRf4UhnpjC39Ao_JPNZMg48f8r5pfKpD5wqyXhP9JmlH0mAZ4DJyDFGoHi_-TKuA25rEKFskfamBmaGX_CuG1aLpL_wvNgxGisUwCjanhCh09AQllZT9-WwB-pch1rLju',
  },
  {
    id: 'cole-harbour',
    title: 'Cole Harbour & Eastern Suburbs',
    category: 'Cole Harbour & Eastern Suburbs',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCyDmpA7PQbKEorIPJT0807JjZIyl9xYR2A4fMzfQorvnuFm69Kq9jC4WPq5_VJZkBrTCJO5aigVkNoeY4nMwEjNleHfJlBlULCwqUd0pKEXdY5xNYOiotR56FNCYOgDAbykQZRX1rH8PxXuRdVq4ef3FRU2kSvVDGj_QbdmXtznvktDaxUY2Emw3hNIDBrRHdj5kaYLjcbsR83dN11BJ6wCHRH5WxsfPBwBzjpkpF_',
  },
];

