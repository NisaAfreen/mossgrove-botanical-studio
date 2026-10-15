/**
 * Brand configuration — edit this one file to rebrand the demo.
 * Everything below is placeholder content for a client presentation.
 */
export const brand = {
  name: 'Mossgrove',
  fullName: 'Mossgrove Botanical Studio',
  tagline: 'Plants, gardens and green spaces, designed to grow with you.',
  statement:
    'A botanical studio and plant shop concept: carefully chosen plants for the home, and garden design for balconies, terraces and backyards.',
  demoNotice: 'Demo website — sample brand, products, prices and content.',
  contact: {
    // Neutral placeholders — replace before launch.
    phone: '+91 00000 00000',
    email: 'hello@example.com',
    studio: 'Studio address to be confirmed',
    hours: 'Mon–Sat · 9:00–18:00 (sample hours)',
  },
  social: [
    { label: 'Instagram', href: '#' },
    { label: 'Pinterest', href: '#' },
    { label: 'YouTube', href: '#' },
    { label: 'LinkedIn', href: '#' },
  ],
  currency: 'INR',
  deliveryFee: 149,
  freeDeliveryOver: 1999,
};

/** Resolves a file in /public/images in both the dev server and the single-file build. */
export const img = (name: string) => `${import.meta.env.BASE_URL}images/${name}.webp`;
