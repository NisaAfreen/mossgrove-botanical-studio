import { img } from '../config/brand';
import type { Article, PortfolioProject, Service, Testimonial } from '../types';

/** Sample service descriptions. Starting prices are indicative demo figures only. */
export const services: Service[] = [
  {
    id: 'residential', name: 'Residential Landscape Design', image: img('s-residential'),
    short: 'Whole-garden plans for independent homes and villas.',
    description:
      'We study how you use the space, map sun and shade through the day, and draw a planting and hardscape plan that fits your home: paths, beds, lawn, lighting and water.',
    includes: ['Site visit & sun study', 'Concept moodboard', 'Planting plan & plant list', 'Hardscape & lighting layout'],
    from: 'From ₹45,000 (sample)', timeline: '3–6 weeks',
  },
  {
    id: 'balcony-terrace', name: 'Balcony & Terrace Gardens', image: img('s-balcony'),
    short: 'Container gardens that respect load, wind and drainage.',
    description:
      'Planters sized for your railing and floor load, wind-tolerant plants, drip irrigation and seating, so a bare balcony becomes the room you use most.',
    includes: ['Load & drainage check', 'Custom planters', 'Drip irrigation', 'Furniture & lighting styling'],
    from: 'From ₹18,000 (sample)', timeline: '1–3 weeks',
  },
  {
    id: 'lawn', name: 'Lawn Design & Installation', image: img('s-lawn'),
    short: 'Soil preparation, levelling and grass that suits your climate.',
    description:
      'We prepare and level the soil, choose a grass variety for your sun and foot traffic, and lay turf or seed with edging and sprinklers.',
    includes: ['Soil test & preparation', 'Grass selection', 'Turf laying or seeding', 'Edging & sprinklers'],
    from: 'From ₹95 / sq ft (sample)', timeline: '1–2 weeks',
  },
  {
    id: 'renovation', name: 'Garden Renovation', image: img('s-renovation'),
    short: 'Rework an overgrown or tired garden without starting over.',
    description:
      'Keep the mature trees, lose what is not working. We edit, replant and restructure beds, refresh soil and fix drainage problems.',
    includes: ['Plant health audit', 'Selective removal', 'Soil & mulch refresh', 'Replanting plan'],
    from: 'From ₹30,000 (sample)', timeline: '2–4 weeks',
  },
  {
    id: 'commercial', name: 'Commercial Landscaping', image: img('s-commercial'),
    short: 'Offices, cafés, lobbies and facades that stay green.',
    description:
      'Planting schemes for workplaces and hospitality, including vertical gardens, planters and entrance landscapes, designed with a maintenance plan from day one.',
    includes: ['Brand-aligned planting', 'Vertical & facade greening', 'Maintenance contract', 'Plant replacement cover'],
    from: 'Custom quote', timeline: '4–10 weeks',
  },
  {
    id: 'maintenance', name: 'Garden Maintenance', image: img('s-maintenance'),
    short: 'Scheduled visits for pruning, feeding and seasonal changes.',
    description:
      'Fortnightly or monthly visits from a gardener who knows your plants: pruning, feeding, pest checks, repotting and seasonal replanting.',
    includes: ['Pruning & shaping', 'Feeding & pest checks', 'Repotting', 'Seasonal replanting'],
    from: 'From ₹2,500 / visit (sample)', timeline: 'Ongoing',
  },
];

/** Illustrative demo projects. Before/after photos show the type of change, not one real site. */
export const projects: PortfolioProject[] = [
  {
    id: 'balcony-retreat', title: 'The Reading Balcony', location: 'Urban apartment · 6th floor', space: 'Balcony · 70 sq ft',
    summary: 'A bare apartment balcony reimagined as a shaded reading nook with layered pots, trailing plants and a rattan chair.',
    before: img('pf-balcony-b'), after: img('pf-balcony-a'),
    plants: ['Areca palm', 'Philodendron Brasil', 'Monstera', 'Terracotta clusters'], duration: '10 days (concept)',
  },
  {
    id: 'courtyard-home', title: 'Lantern House Garden', location: 'Contemporary home', space: 'Backyard · 2,400 sq ft',
    summary: 'A flat lawn turned into a layered evening garden with lit pathways, a native tree canopy and planted borders.',
    before: img('pf-home-b'), after: img('pf-home-a'),
    plants: ['Ficus topiary', 'Ornamental grasses', 'Bougainvillea screen', 'Warm path lighting'], duration: '6 weeks (concept)',
  },
  {
    id: 'rooftop-oasis', title: 'Skyline Terrace', location: 'Rooftop · mid-rise building', space: 'Terrace · 900 sq ft',
    summary: 'An exposed rooftop deck converted into an outdoor oasis with raised beds, wind-tolerant planting and shade trees in planters.',
    before: img('pf-roof-b'), after: img('pf-roof-a'),
    plants: ['Raised kitchen beds', 'Planter trees', 'Bougainvillea', 'Drip irrigation'], duration: '4 weeks (concept)',
  },
  {
    id: 'studio-office', title: 'Greenline Workspace', location: 'Commercial interior', space: 'Office · 3,000 sq ft',
    summary: 'A hard-edged corridor office softened with planter islands, hanging greenery and low-maintenance specimen plants.',
    before: img('pf-comm-b'), after: img('pf-comm-a'),
    plants: ['ZZ plant', 'Snake plant', 'Hanging pothos', 'Planter islands'], duration: '3 weeks (concept)',
  },
];

export const articles: Article[] = [
  {
    slug: 'best-indoor-plants-for-beginners', category: 'Plant Care', title: 'The Best Indoor Plants for Beginners',
    excerpt: 'Seven forgiving plants that handle low light, missed waterings and the odd move across the room.',
    image: img('j-beginners'), readTime: '5 min read', date: 'Sample article',
    body: [
      { paragraphs: ['Starting with the right plant matters more than having a green thumb. The plants below forgive the most common beginner mistakes: overwatering, too little light and moving them around.'] },
      { heading: 'Start with the forgiving five', paragraphs: ['Snake plant, ZZ plant, pothos, peace lily and jade are the easiest to keep alive. Snake and ZZ plants store water and cope with dim corners. Pothos trails happily from a shelf. Peace lily droops when thirsty, so it tells you when to water. Jade loves a sunny sill.'], list: ['Snake plant: low light, water every 2–3 weeks', 'ZZ plant: low light, very drought tolerant', 'Pothos: medium light, weekly water', 'Peace lily: medium light, keep lightly moist', 'Jade: full sun, water every 10–14 days'] },
      { heading: 'Check light before you buy', paragraphs: ['Stand where the plant will live at midday. If you can read comfortably without a lamp, that is medium light. If the sun lands directly on the spot for hours, choose a sun-lover like jade or aloe.'] },
      { heading: 'Water by touch, not by calendar', paragraphs: ['Push a finger into the soil. If the top few centimetres are dry, water thoroughly until it drains, then empty the saucer. Most indoor plants are lost to soggy roots rather than thirst.'] },
    ],
  },
  {
    slug: 'build-a-beautiful-balcony-garden', category: 'Balcony Gardens', title: 'How to Build a Beautiful Balcony Garden',
    excerpt: 'Work with your railing, your wind and your sun hours. A simple framework for small outdoor spaces.',
    image: img('j-balcony'), readTime: '6 min read', date: 'Sample article',
    body: [
      { paragraphs: ['A balcony garden succeeds when it is planned around three things: how much sun it gets, how windy it is, and how much weight and water the floor can take.'] },
      { heading: 'Map your sun hours', paragraphs: ['Count the hours of direct sun in a day. Six or more suits bougainvillea, jasmine and herbs. Three to five suits ferns, pothos and peace lilies. Less than three is a shade balcony: lean on foliage.'] },
      { heading: 'Layer in three heights', paragraphs: ['Use one tall anchor plant in a corner, mid-height pots along the floor, and trailing plants on the railing. Layering makes a small space feel planted rather than cluttered.'], list: ['Tall: areca palm or bamboo in a 14" planter', 'Middle: clustered terracotta pots', 'Trailing: philodendron, pothos or portulaca on rail planters'] },
      { heading: 'Plan for water', paragraphs: ['Lightweight potting mix, saucers and a simple drip kit keep plants healthy and floors clean. Check with your building before adding heavy planters.'] },
    ],
  },
  {
    slug: 'simple-guide-to-watering-indoor-plants', category: 'Plant Care', title: 'A Simple Guide to Watering Indoor Plants',
    excerpt: 'How often, how much, and the signs that tell you a plant needs more or less.',
    image: img('j-watering'), readTime: '4 min read', date: 'Sample article',
    body: [
      { paragraphs: ['There is no universal watering schedule. Light, pot size, season and soil all change how quickly a plant drinks. Learn the signs and you will rarely get it wrong.'] },
      { heading: 'Water deeply, then wait', paragraphs: ['Water until it runs from the drainage hole, then let the soil dry to the right depth before watering again. Shallow, frequent sips keep roots near the surface.'] },
      { heading: 'Read the leaves', paragraphs: ['Soft, yellowing lower leaves and damp soil usually mean too much water. Crisp brown edges and dry, shrinking soil usually mean too little.'] },
      { heading: 'Adjust with the seasons', paragraphs: ['Plants drink more in the heat of April to June and less during cooler, cloudy months. Check soil more often in summer and stretch the gap in winter.'] },
    ],
  },
  {
    slug: 'creating-a-low-maintenance-garden', category: 'Garden Design', title: 'Creating a Low-Maintenance Garden',
    excerpt: 'Structure, mulch and the right plant palette: designing a garden that looks good with little upkeep.',
    image: img('j-lowmaint'), readTime: '7 min read', date: 'Sample article',
    body: [
      { paragraphs: ['A low-maintenance garden is designed, not neglected. Strong structure and the right plants do most of the work for you.'] },
      { heading: 'Let hardscape carry the design', paragraphs: ['Stone edges, gravel paths and a few well-placed walls look tidy all year. They mean fewer beds to weed and less lawn to mow.'] },
      { heading: 'Choose climate-suited plants', paragraphs: ['Native and climate-adapted shrubs need less water and fewer treatments. Group plants by water needs so one drip line serves a whole bed.'] },
      { heading: 'Mulch everything', paragraphs: ['Five centimetres of bark or coco mulch keeps soil cool, holds water and suppresses weeds. Top it up once or twice a year.'] },
    ],
  },
  {
    slug: 'choosing-plants-for-your-climate', category: 'Garden Design', title: 'Choosing the Right Plants for Your Climate',
    excerpt: 'Humid coast, dry plateau or hill station: matching plants to where you live.',
    image: img('j-climate'), readTime: '6 min read', date: 'Sample article',
    body: [
      { paragraphs: ['Plants that thrive in a humid coastal city can sulk on a dry plateau. Matching plants to your climate is the single biggest step toward an easy garden.'] },
      { heading: 'Humid and warm', paragraphs: ['Tropical foliage such as monstera, calathea, anthurium and palms enjoy humidity. Watch for fungal issues and give good airflow.'] },
      { heading: 'Hot and dry', paragraphs: ['Bougainvillea, succulents, frangipani and ornamental grasses tolerate heat and irregular water. Mulch heavily and water early in the morning.'] },
      { heading: 'Cool and hilly', paragraphs: ['Lavender, hydrangea, roses and many herbs do well where nights are cool. Protect tender plants from frost in winter.'] },
    ],
  },
  {
    slug: 'repotting-without-stress', category: 'Plant Care', title: 'Repotting Without the Stress',
    excerpt: 'When to move up a pot size, what mix to use, and how to help a plant settle in.',
    image: img('j-repot'), readTime: '4 min read', date: 'Sample article',
    body: [
      { paragraphs: ['Roots circling the pot or poking out of the drainage hole are the signal to repot. Spring and early monsoon are the gentlest times.'] },
      { heading: 'Go up one size', paragraphs: ['Choose a pot about 5 cm wider than the current one. A pot that is too large holds excess water and can rot roots.'] },
      { heading: 'Settle it in', paragraphs: ['Water well, keep it out of strong sun for a week and skip fertiliser for a month while new roots grow.'] },
    ],
  },
];

/** Fictional demo testimonials. Names are placeholders, not real clients. */
export const testimonials: Testimonial[] = [
  { id: 't1', quote: 'The planner suggested plants I would never have picked for a west-facing balcony, and every one of them is still thriving.', name: 'Ananya R.', context: 'Sample review · balcony garden' },
  { id: 't2', quote: 'Clear plan, honest about what would and would not work on our terrace, and the drip system saved our summer.', name: 'Kabir & Meera S.', context: 'Sample review · terrace design' },
  { id: 't3', quote: 'My monstera arrived well packed with a care card that actually explained what to do in the first week.', name: 'Rohan D.', context: 'Sample review · plant order' },
];

export const benefits = [
  { title: 'Plants chosen for health', text: 'Each plant would be checked for roots, pests and leaf condition before it is packed.', icon: 'leaf' },
  { title: 'Considered garden design', text: 'Plans start with sun, wind, soil and how you actually use the space.', icon: 'compass' },
  { title: 'Plant-care guidance', text: 'Every order would include a care card, plus help over chat after delivery.', icon: 'droplet' },
  { title: 'Made for your space', text: 'Balcony, terrace, backyard or office: suggestions are sized to fit.', icon: 'ruler' },
  { title: 'Sustainable practice', text: 'Peat-free mixes, reusable nursery pots and drip irrigation by default.', icon: 'recycle' },
  { title: 'Delivery & aftercare', text: 'Careful local delivery and a settling-in check after the first fortnight.', icon: 'truck' },
] as const;
