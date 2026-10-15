import type { PlannerPreferences, PlannerRecommendation } from '../types';

/**
 * Rule-based garden planner. Pure frontend logic with predefined recommendations —
 * no external API. Plants are picked from the demo catalogue by space, style and care level.
 */

const styleNotes: Record<PlannerPreferences['style'], { title: string; note: string; palette: string[] }> = {
  Minimalist: {
    title: 'Quiet Green Minimal',
    note: 'A restrained palette of two or three sculptural plants, repeated in matching pots, with plenty of breathing room.',
    palette: ['snake-plant', 'zz-plant', 'haworthia', 'fiddle-leaf-fig'],
  },
  Tropical: {
    title: 'Layered Tropical Retreat',
    note: 'Big leaves, deep greens and a canopy feel: tall palms at the back, broad foliage in the middle, trailing plants at the edges.',
    palette: ['areca-palm', 'monstera-deliciosa', 'calathea', 'anthurium', 'philodendron-brasil'],
  },
  Modern: {
    title: 'Clean-Line Modern',
    note: 'Architectural forms in geometric planters, lit from below in the evening. Structure first, flowers second.',
    palette: ['fiddle-leaf-fig', 'ficus-topiary', 'snake-plant', 'zz-plant'],
  },
  Cottage: {
    title: 'Soft Cottage Garden',
    note: 'Loose, abundant planting in terracotta, with fragrance, climbing colour and a few herbs within reach.',
    palette: ['bougainvillea', 'lavender', 'terracotta-trio', 'heirloom-seeds', 'peace-lily'],
  },
  'Low-Maintenance': {
    title: 'Easy-Care Evergreen',
    note: 'Drought-tolerant, slow-growing plants grouped by water needs, mulched and set on a simple drip line.',
    palette: ['zz-plant', 'snake-plant', 'jade-plant', 'aloe-vera', 'mammillaria'],
  },
};

const spaceLayouts: Record<PlannerPreferences['space'], string[]> = {
  Balcony: ['Rail planters for trailing plants', 'One tall anchor plant in the sunniest corner', 'Clustered floor pots on saucers'],
  Terrace: ['Wind-break planting along the parapet', 'Raised beds or large planters for small trees', 'A shaded seating zone with drip irrigation'],
  Backyard: ['Defined beds with stone or steel edging', 'A lawn or gravel area for use', 'Layered borders: tree, shrub, groundcover'],
  Indoor: ['A statement plant near the brightest window', 'Shelf or hanging plants for vertical interest', 'Grouped humidity-lovers in the bathroom or kitchen'],
  Commercial: ['Planter islands to guide movement', 'Low-light specimens away from windows', 'A maintenance schedule built into the design'],
};

const serviceFor: Record<PlannerPreferences['space'], string> = {
  Balcony: 'Balcony & Terrace Gardens',
  Terrace: 'Balcony & Terrace Gardens',
  Backyard: 'Residential Landscape Design',
  Indoor: 'Plant styling consultation',
  Commercial: 'Commercial Landscaping',
};

const sizeFactor = { Small: 1, Medium: 2.2, Large: 4 } as const;

const baseCost: Record<PlannerPreferences['space'], number> = {
  Balcony: 14000, Terrace: 32000, Backyard: 60000, Indoor: 9000, Commercial: 85000,
};

const fmt = (n: number) =>
  n >= 100000 ? `₹${(n / 100000).toFixed(1).replace(/\.0$/, '')}L` : `₹${Math.round(n / 1000)}k`;

const easyPlants = ['zz-plant', 'snake-plant', 'jade-plant', 'aloe-vera', 'haworthia', 'mammillaria', 'satin-pothos', 'philodendron-brasil'];
const sunPlants = ['bougainvillea', 'jade-plant', 'aloe-vera', 'lavender', 'ficus-topiary', 'mammillaria'];
const indoorPlants = ['monstera-deliciosa', 'snake-plant', 'peace-lily', 'zz-plant', 'calathea', 'satin-pothos', 'fiddle-leaf-fig', 'areca-palm', 'moth-orchid', 'philodendron-brasil'];

export function recommend(p: PlannerPreferences): PlannerRecommendation {
  const style = styleNotes[p.style];
  const indoor = p.space === 'Indoor' || p.space === 'Commercial';
  const suitsSpace = (id: string) => (indoor ? indoorPlants.includes(id) || id === 'haworthia' : true);

  // 1. Keep the style's character: up to two picks from its palette that suit the space
  //    (for low-care requests, prefer the easy ones in that palette).
  const palette = style.palette.filter(suitsSpace);
  const ordered = p.maintenance === 'Low'
    ? [...palette.filter((id) => easyPlants.includes(id)), ...palette.filter((id) => !easyPlants.includes(id))]
    : palette;
  const picks = ordered.slice(0, 2);

  // 2. Fill the rest from plants matched to the space and the care level.
  const fill = p.maintenance === 'Low'
    ? easyPlants
    : p.maintenance === 'High'
      ? ['moth-orchid', 'calathea', 'fiddle-leaf-fig', 'anthurium', 'lavender']
      : indoor ? indoorPlants : sunPlants;
  for (const id of [...fill, ...palette, ...(indoor ? indoorPlants : sunPlants)]) {
    if (picks.length >= 4) break;
    if (!picks.includes(id) && suitsSpace(id)) picks.push(id);
  }
  const productIds = picks;

  const cost = baseCost[p.space] * sizeFactor[p.size];
  const budgetCap: Record<PlannerPreferences['budget'], number> = {
    'Under ₹25k': 25000, '₹25k–₹75k': 75000, '₹75k–₹2L': 200000, '₹2L+': Infinity,
  };
  const cap = budgetCap[p.budget];
  const low = Math.min(cost * 0.8, cap === Infinity ? cost * 0.8 : cap * 0.7);
  const high = Math.min(cost * 1.3, cap === Infinity ? cost * 1.3 : cap);
  const estimate = `${fmt(Math.max(low, 5000))} – ${fmt(Math.max(high, 9000))}`;

  const careRhythm =
    p.maintenance === 'Low'
      ? 'About 15 minutes a week: water on a drip timer, check leaves fortnightly.'
      : p.maintenance === 'Moderate'
        ? 'Two short sessions a week: watering, deadheading and a monthly feed.'
        : 'A hands-on routine: misting, rotating, pruning and seasonal swaps you will enjoy.';

  return {
    title: `${style.title} for a ${p.size.toLowerCase()} ${p.space.toLowerCase()}`,
    styleNote: style.note,
    layout: spaceLayouts[p.space],
    productIds,
    service: serviceFor[p.space],
    estimate,
    careRhythm,
  };
}
