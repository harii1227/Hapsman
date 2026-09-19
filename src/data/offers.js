export const initialOffers = [];

export const getLiveCoupons = () => {
  let customCoupons = [];
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const saved = localStorage.getItem('hapsman_admin_coupons');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Exclude any legacy hardcoded demo offers (HAPSMAN10, FESTIVE100, COMBO20, offer-1, etc.)
          const legacyCodes = ['HAPSMAN10', 'FESTIVE100', 'COMBO20'];
          customCoupons = parsed.filter(
            (c) =>
              c &&
              !legacyCodes.includes(c.code?.toUpperCase()) &&
              !String(c.id || '').startsWith('offer-')
          );
          // If legacy coupons were found and filtered out, rewrite clean list to localStorage
          if (customCoupons.length !== parsed.length) {
            localStorage.setItem('hapsman_admin_coupons', JSON.stringify(customCoupons));
          }
        }
      }
    } catch {
      // Ignore
    }
  }

  return customCoupons;
};

export const offers = getLiveCoupons();

export const promotionalBanners = [
  {
    id: 'banner-1',
    headline: 'Good Food. Great Gifting.',
    subheadline: 'Crafted with natural ingredients, traditional Indian recipes and royal packaging.',
    ctaText: 'Explore Festive Hampers',
    ctaLink: '/products/gift-hampers',
    tag: 'FESTIVE COLLECTION 2026'
  },
  {
    id: 'banner-2',
    headline: 'Healthy Snacking, Made Delicious.',
    subheadline: 'Say goodbye to fried chips. Enjoy 100% roasted makhana and ancient millets.',
    ctaText: 'Shop Roasted Makhana',
    ctaLink: '/products/makhana',
    tag: 'GUILT-FREE MUNCHING'
  }
];
