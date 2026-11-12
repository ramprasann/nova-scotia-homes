export interface MobileProperty {
  id: string;
  title: string;
  address: string;
  city: string;
  postalCode: string;
  region: string;
  price: number;
  formattedPrice: string;
  originalPrice?: number;
  priceDropAmount?: string;
  beds: string;
  baths: number;
  sqft: number;
  type: string;
  status: string;
  description: string;
  features: string[];
  images: string[];
  isFeatured?: boolean;
  lat: number;
  lng: number;
  openHouse?: {
    date: string;
    time: string;
  };
}

export const NOVA_SCOTIA_PROPERTIES: MobileProperty[] = [
  {
    id: '8-sherwood-street',
    title: '8 Sherwood Street',
    address: '8 Sherwood Street',
    city: 'Cole Harbour',
    postalCode: 'B2V 2P4',
    region: 'Cole Harbour',
    price: 498900,
    formattedPrice: '$498,900',
    originalPrice: 514900,
    priceDropAmount: '$16,000',
    beds: '2+1 Beds',
    baths: 2,
    sqft: 1850,
    type: 'Single Family',
    status: 'Featured Listing',
    isFeatured: true,
    lat: 44.6642,
    lng: -63.4861,
    openHouse: {
      date: 'This Sunday',
      time: '2:00 PM - 4:00 PM',
    },
    description:
      'Quiet residential cul-de-sac setting offering manicured grounds, refined interior finishes, and immediate proximity to Cole Harbour educational centers and scenic Atlantic trails.',
    features: [
      'Quiet Cul-de-Sac Setting',
      'Finished Lower Level Suite',
      'Attached Heated Garage',
      'Private Landscaped Backyard',
      'Proximity to Top Cole Harbour Schools',
      'Heat Pump & Central Air',
    ],
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCVi67yoVc5zhAkBldBZ9S5HpvGEP1Xllk_ZOHaUkKLO9HsSjOMW1UJepzZ5f2MM6I7TkmM4BbpsUgy5a72e5yAWHSGauGICsL332YgcYkOYvZzbwTUVTNWBr_BO-ANxCE2pQe1wk3NVg55i19qkFE1FaBcuhm241DkDJZErBtSJdsB0R-irXC2bM1ZAa2UMyMiX5YA6IVavyXJNpdMZe8CM80LbNHFKEwuZ1pkyLa5',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBMHsbac3dUgd7-ad2sxvuyzBS6zIHLrXVDat7G54f5dAZGqbNwN58LxjJnfBoc4WQtr4feBSMeJ8NRjYbA60VO_3sT5fZxxRffBHq5PGM1PE4qvLsGF1fs1IZkUyXobZ1yRKWVTY1yctVeU9tFzqOvNS1n-_moIafwSBwSLypuC33hHYfI6ceIHQpw3Qt-bD8m8AnTjOlcdQcuGwntKd73jvsQC29t4wP6nX8DDAOW',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB0XlgYwYEBHlhoYffnXfdMyof0FDrOPb4ddWFIAGwLRBBHLlPFoTJcZL13WY6s1bTbNzQkAGv847LomnXFjw28Pjx-k9CbVHvUUMUQe6LKGjJImTpCqucoqUh3DHOZ8oGB4GV9jZVXRPo50b86iVm8LAvaNq87L8Cuv7sT1Da4HxwF-K-RZn4luLYEGUu0CbqqyiUYYMZQmF9b2ChE8C15vmSOh3hDJTHVnPjnRSU',
    ],
  },
  {
    id: 'hydrostone-historic-townhome',
    title: 'Historic Hydrostone Row Residence',
    address: '5542 Young Street',
    city: 'Halifax',
    postalCode: 'B3K 1Z6',
    region: 'Halifax',
    price: 649000,
    formattedPrice: '$649,000',
    beds: '3 Beds',
    baths: 2,
    sqft: 1620,
    type: 'Townhome',
    status: 'MLS® Exclusive',
    lat: 44.6612,
    lng: -63.6015,
    description:
      'Impeccably preserved Hydrostone architecture with modern bespoke renovations. Steps from European-style artisan bakeries, cafes, and Halifax peninsula transit corridors.',
    features: [
      'Original Hydrostone Masonry',
      'Restored Hardwood Flooring',
      'Private Courtyard Garden',
      'Renovated Chef Kitchen',
      'Walkable Historic Market',
    ],
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBqNu8MupuEjirCPSqFui3qDg_7MA-gVU308hA0mox8TceWmG4cOsT1lXmz2vIm4u6tjc2s-htXnbvMc72yIA1xc2L3jYuiAW0wtlLnmtnd27HNvgwJUrh85dGuSYktl-HuDJElSyYk54xbE20M1gip0p2Ou9yL9dfhaEInjgAM7HwVr2B5kPhBG_fYdMhCBr2K5fSk6IIPxwtcLANIe4O8XpVTDoOffcH-ZmVVhg13',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDUbEN2WwgdKDN3zCXoIFWVnjT0BCLSfzm1z_KlkmU6xBoACfh4SRxRBrWXlzpBcrtSIY4YDVDF_fs_xFM0aXSP9zqboJVFnrd9qOr1lkbDRf4UhnpjC39Ao_JPNZMg48f8r5pfKpD5wqyXhP9JmlH0mAZ4DJyDFGoHi_-TKuA25rEKFskfamBmaGX_CuG1aLpL_wvNgxGisUwCjanhCh09AQllZT9-WwB-pch1rLju',
    ],
  },
  {
    id: 'eastern-shore-ocean-estate',
    title: 'Eastern Shore Coastal Retreat',
    address: '142 Marine Gateway',
    city: 'Eastern Passage',
    postalCode: 'B3G 1E8',
    region: 'Eastern Shore',
    price: 785000,
    formattedPrice: '$785,000',
    originalPrice: 810000,
    priceDropAmount: '$25,000',
    beds: '4 Beds',
    baths: 3,
    sqft: 2400,
    type: 'Waterfront',
    status: 'New Listing',
    lat: 44.6083,
    lng: -63.4939,
    openHouse: {
      date: 'Next Saturday',
      time: '1:00 PM - 3:00 PM',
    },
    description:
      'Breathtaking coastal headland vistas with uninterrupted Atlantic surf views. Custom built with expansive oceanfront sundecks and private shoreline access.',
    features: [
      'Direct Shoreline Frontage',
      'Cathedral Cedar Ceilings',
      'Wrap-Around Ocean Deck',
      'Energy Efficient Geothermal',
      'Expansive Acreage & Privacy',
    ],
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC4o8UHK-Y76gv_7U0me4zRtFglnGLawXxuN4BHU0Z8nEtg9OTz97F6kEd-5bRC_h_Xisgsiu2OYlFZ-OkVqzecArGf85qOTOWwdfuuWqfI5Q141XAONOq1NpByPI793emwChwaINxyrpVC_cAFheVOdGEo203uyjuQtDiZ8kKLkXKKxKpiHZxeJf6auGNVyB6BN2F7gZW2fPYsIYaqw49jr6QhekNzhyCqXAYKZ48c',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCd_tKjZXNqsH6QPtynIS6tVLSpR4EdrS9jYwhxgYsNX0uWCYKDlPLIFH5AozI141QbuXiEJJljqq1CX_XpODBCOLuX0AHzqCdkCDmm8YAMsXJse3r98Jq7Yva1vON7Q3WyVb-mqaCGOBgXge14Z1KEf09kNR3qFOV0zOomMIGJGxwTqY5JmXbWQstp5TtWTxvNtvNdqjNiuU8VH3eZWOFj-rJjayzI968epZhtm_zV',
    ],
  },
  {
    id: 'portland-hills-executive',
    title: 'Portland Hills Executive Home',
    address: '88 Portland Woods Boulevard',
    city: 'Dartmouth',
    postalCode: 'B2W 6C3',
    region: 'Dartmouth',
    price: 589000,
    formattedPrice: '$589,000',
    beds: '3+1 Beds',
    baths: 3,
    sqft: 2150,
    type: 'Single Family',
    status: 'Active',
    lat: 44.6625,
    lng: -63.5042,
    description:
      'Sophisticated suburban design in prestigious Portland Hills. Minutes from Morris Lake trails, fine amenities, and fast transit to downtown Halifax.',
    features: [
      'Granite Kitchen Island',
      'Primary Ensuite with Soaker Tub',
      'Walkout Finished Basement',
      'Attached Double Garage',
      'Morris Lake Trail Access',
    ],
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCyDmpA7PQbKEorIPJT0807JjZIyl9xYR2A4fMzfQorvnuFm69Kq9jC4WPq5_VJZkBrTCJO5aigVkNoeY4nMwEjNleHfJlBlULCwqUd0pKEXdY5xNYOiotR56FNCYOgDAbykQZRX1rH8PxXuRdVq4ef3FRU2kSvVDGj_QbdmXtznvktDaxUY2Emw3hNIDBrRHdj5kaYLjcbsR83dN11BJ6wCHRH5WxsfPBwBzjpkpF_',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBMaRkhSyUXJhcpJ6r20LFYWmm2e0e8_K1YHg9SO80EjhVF0U41JTODbwoMeHJG0WEtjtUIPiLsB9ltmLeYzevo9UqsBItA3D2oaWdAqTR8DciZUzlhmM_evWL74qTO8apHWSR3vfVlJgYO80LGz8TWLbPkROvwpcVYU13HRygYHZQaF3sIPpU-wYevxjGIPJm5pLphlbJvS-sCF62_rePPJX0k5qqNk9_aIRW4hYzQ',
    ],
  },
  {
    id: 'downtown-halifax-heritage-condo',
    title: 'Downtown Halifax Luxury Suite',
    address: '1540 Hollis Street',
    city: 'Halifax',
    postalCode: 'B3J 1V3',
    region: 'Halifax',
    price: 525000,
    formattedPrice: '$525,000',
    beds: '2 Beds',
    baths: 2,
    sqft: 1280,
    type: 'Condo',
    status: 'MLS® Exclusive',
    lat: 44.6465,
    lng: -63.5714,
    description:
      'Refined urban sanctuary overlooking the Halifax Harbour. High ceilings, panoramic floor-to-ceiling glass, concierge service, and heated underground parking.',
    features: [
      'Halifax Harbour Views',
      'Floor-to-Ceiling Windows',
      'Building Concierge & Gym',
      'Underground Heated Parking',
      'Steps to Waterfront Boardwalk',
    ],
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDMwLITTMjPQRhBvNQwsOkwNbVmkSTg7MoFBnaKVFbLFcBA_ol8Y5hXSDj6sGPZsszJ5MDZMBCSikOr9X6rZBPYQAbOHrH891DUFA2Km-F8Ss8rCI68fF2gErhtyUkkmMMm7CZNBRWoJyq_4i_E6NXA6dQjpVDYxpHMLyxUIHlg6sFOydp7G8s3UWooqS8WL02XMao8gLktKFxOZzBmSQD9EkcghvVx90JqqiDd-eyk',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCwOVan20pCi4-sqicc9GC7aYweWG2AqDXRAuhKtyL58nXvjnbqwMUcZ3grxzn_EcjlVnPs4rS_qk3Wa1_hJy3K3K7vV7qmwuqz7xOvsfqlQT1qkZW0sp_jJratPGK4lTHbc1cuYFl7EQtzfaCiJN49YXyJ2DyXX7dXNdreLxBwqZEn3wKYiU4Uss-e2f54mocnwwpfa4cwXCbRifSqs2mSwJNACWIuN9Lzbi2H5BrM',
    ],
  },
  {
    id: 'annapolis-valley-orchard-estate',
    title: 'Annapolis Valley Country Home',
    address: '422 University Avenue',
    city: 'Wolfville',
    postalCode: 'B4P 2R8',
    region: 'Annapolis Valley',
    price: 695000,
    formattedPrice: '$695,000',
    beds: '4 Beds',
    baths: 3,
    sqft: 2800,
    type: 'Single Family',
    status: 'Active',
    lat: 45.0911,
    lng: -64.3644,
    description:
      'Picturesque Wolfville residence overlooking orchard landscapes and Blomidon ridge. Character craftsmanship paired with contemporary entertaining spaces.',
    features: [
      'Panoramic Valley Views',
      'Covered Veranda & Firepit',
      'Chef Kitchen with Gas Range',
      'Separate Studio / Office',
      'Close to Acadia University & Wineries',
    ],
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAAC-18HR3HNt5JdQ7fBIFB9eOwDRp1xqIgw7_T70qjc2iFl3KY7sw5z-jVBKF7Zu9fL57ncfIauGuAY8yk44WcF84hLXdt_vHnb4Ssu61-iLYfYiLexFVXPGfiCxAW-7cii_Xt2bjxIRJFdseGRy5bVTYaOkTeFaKI2eBIYQ4CS_T6qk8sXzDXcXGpoe1BG3Hwf6GDojuUh2sCvmHsg1hcNYwPaXyYygvCbnP5QOUu',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCI9xN1JSJg8KSoOkywekSH0O-bdk46pva4X-riRsabW0DlmEfgF7k9Do9dNc3i1Ze120OCrzeMEqMFUkOHX8R0WwSu-6YnYVlLm0edXWHC-RhCcxhUJTj3WWchpeW7urofog4JzvVGk7Gab-kgoC_4mtyEnX70kLu-AKl_By3wm34jNyu95hKUUOaJprlv8HWddPB23U8RbdypwtXLddplbhGscLPXNCIbNTYj9gYU',
    ],
  },
];

// Calculate Haversine distance in km between two GPS coordinates
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radius of the Earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

// LocalStorage Storage Keys for Mobile Features
const SAVED_HOMES_KEY = 'nsh_mobile_saved_homes';
const SAVED_NOTES_KEY = 'nsh_mobile_property_notes';
const RECENTLY_VIEWED_KEY = 'nsh_mobile_recently_viewed';
const NOTIFICATIONS_READ_KEY = 'nsh_mobile_read_notifications';

// 1. Saved Homes
export function getSavedPropertyIds(): string[] {
  try {
    const raw = localStorage.getItem(SAVED_HOMES_KEY);
    return raw ? JSON.parse(raw) : ['8-sherwood-street']; // default save for demo
  } catch {
    return ['8-sherwood-street'];
  }
}

export function toggleSavedPropertyId(id: string): boolean {
  try {
    const current = getSavedPropertyIds();
    const exists = current.includes(id);
    const updated = exists ? current.filter((x) => x !== id) : [...current, id];
    localStorage.setItem(SAVED_HOMES_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('savedHomesUpdated'));
    return !exists;
  } catch {
    return false;
  }
}

export function isPropertySaved(id: string): boolean {
  return getSavedPropertyIds().includes(id);
}

// 2. Personal Notes for Saved Homes
export function getPropertyNotes(): Record<string, string> {
  try {
    const raw = localStorage.getItem(SAVED_NOTES_KEY);
    return raw ? JSON.parse(raw) : { '8-sherwood-street': 'Love the cul-de-sac and heated garage.' };
  } catch {
    return {};
  }
}

export function savePropertyNote(id: string, note: string): void {
  try {
    const notes = getPropertyNotes();
    if (note.trim()) {
      notes[id] = note.trim();
    } else {
      delete notes[id];
    }
    localStorage.setItem(SAVED_NOTES_KEY, JSON.stringify(notes));
    window.dispatchEvent(new Event('propertyNotesUpdated'));
  } catch (e) {
    console.error('Failed to save note', e);
  }
}

// 3. Recently Viewed Properties
export function getRecentlyViewedIds(): string[] {
  try {
    const raw = localStorage.getItem(RECENTLY_VIEWED_KEY);
    return raw ? JSON.parse(raw) : ['8-sherwood-street', 'portland-hills-executive'];
  } catch {
    return ['8-sherwood-street'];
  }
}

export function addRecentlyViewedId(id: string): void {
  try {
    const current = getRecentlyViewedIds();
    const updated = [id, ...current.filter((x) => x !== id)].slice(0, 8);
    localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('recentlyViewedUpdated'));
  } catch (e) {
    console.error('Failed to update recently viewed', e);
  }
}

// 4. In-App Activity & Price Drop Notifications
export interface MobileNotificationItem {
  id: string;
  type: 'price_drop' | 'new_listing' | 'open_house' | 'market_update';
  title: string;
  message: string;
  time: string;
  propertyId?: string;
}

export const APP_NOTIFICATIONS: MobileNotificationItem[] = [
  {
    id: 'notif-1',
    type: 'price_drop',
    title: 'Price Drop Alert',
    message: '8 Sherwood Street reduced by $16,000! Now offered at $498,900.',
    time: '2 hours ago',
    propertyId: '8-sherwood-street',
  },
  {
    id: 'notif-2',
    type: 'open_house',
    title: 'Open House This Sunday',
    message: 'Join Thomas at 8 Sherwood Street, Cole Harbour from 2:00 PM – 4:00 PM.',
    time: '5 hours ago',
    propertyId: '8-sherwood-street',
  },
  {
    id: 'notif-3',
    type: 'new_listing',
    title: 'New Oceanfront Listing',
    message: 'Eastern Shore Coastal Retreat just hit the market at $785,000.',
    time: '1 day ago',
    propertyId: 'eastern-shore-ocean-estate',
  },
  {
    id: 'notif-4',
    type: 'market_update',
    title: 'Halifax & Dartmouth Market Report',
    message: 'Fall/Winter regional stats: Average days on market steady at 18 days.',
    time: '2 days ago',
  },
];

export function getReadNotificationIds(): string[] {
  try {
    const raw = localStorage.getItem(NOTIFICATIONS_READ_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function markNotificationAsRead(id: string): void {
  try {
    const current = getReadNotificationIds();
    if (!current.includes(id)) {
      localStorage.setItem(NOTIFICATIONS_READ_KEY, JSON.stringify([...current, id]));
      window.dispatchEvent(new Event('notificationsUpdated'));
    }
  } catch (e) {
    console.error('Failed to mark read', e);
  }
}


