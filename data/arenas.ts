// Arena catalog — mirrors the PaddlesPK web app's static list.
// Bookings reference arenas by name (bookings.arena_name).
export type Arena = {
  name: string;
  location: string;
  courtType: string;
  price: string;
  priceNum: number;
  image: string;
  indoor: boolean;
  surface: string;
  facilities: string[];
};

const GLASS_IMG =
  'https://images.unsplash.com/photo-1642352684040-ac721f390031?w=800&q=80';
const INDOOR_IMG =
  'https://images.unsplash.com/photo-1691258571040-dd64c51532b4?w=800&q=80';

export const CITIES = [
  'All',
  'Lahore',
  'Karachi',
  'Islamabad',
  'Rawalpindi',
  'Peshawar',
] as const;

export const arenas: Arena[] = [
  { name: 'Elite Padel Club', location: 'Lahore', courtType: 'Professional Glass Court', price: 'Rs. 2,500', priceNum: 2500, image: GLASS_IMG, indoor: true, surface: 'Glass', facilities: ['Parking', 'Locker Rooms', 'Coaching', 'Cafe'] },
  { name: 'Court Masters', location: 'Karachi', courtType: 'Premium Indoor Court', price: 'Rs. 2,800', priceNum: 2800, image: INDOOR_IMG, indoor: true, surface: 'Artificial Grass', facilities: ['Parking', 'Locker Rooms'] },
  { name: 'Padel Paradise', location: 'Islamabad', courtType: 'Professional Glass Court', price: 'Rs. 2,600', priceNum: 2600, image: GLASS_IMG, indoor: true, surface: 'Glass', facilities: ['Parking', 'Coaching', 'Cafe'] },
  { name: 'DHA Sports Complex', location: 'Lahore', courtType: 'Outdoor Court', price: 'Rs. 2,000', priceNum: 2000, image: INDOOR_IMG, indoor: false, surface: 'Concrete', facilities: ['Parking'] },
  { name: 'Smash Arena', location: 'Rawalpindi', courtType: 'Standard Court', price: 'Rs. 1,800', priceNum: 1800, image: GLASS_IMG, indoor: false, surface: 'Synthetic', facilities: ['Parking', 'Equipment Rental'] },
  { name: 'Peshawar Padel Hub', location: 'Peshawar', courtType: 'Premium Indoor Court', price: 'Rs. 2,200', priceNum: 2200, image: INDOOR_IMG, indoor: true, surface: 'Artificial Grass', facilities: ['Parking', 'Locker Rooms', 'First Aid'] },
  { name: 'Pace Padel Arena', location: 'Lahore', courtType: 'Professional Glass Court', price: 'Rs. 3,000', priceNum: 3000, image: GLASS_IMG, indoor: true, surface: 'Glass', facilities: ['Parking', 'Locker Rooms', 'Coaching', 'Cafe', 'Showers'] },
  { name: 'Gulberg Padel Club', location: 'Lahore', courtType: 'Premium Indoor Court', price: 'Rs. 2,200', priceNum: 2200, image: INDOOR_IMG, indoor: true, surface: 'Artificial Grass', facilities: ['Parking', 'Locker Rooms', 'Coaching'] },
  { name: 'Cantt Padel Zone', location: 'Lahore', courtType: 'Outdoor Court', price: 'Rs. 1,800', priceNum: 1800, image: GLASS_IMG, indoor: false, surface: 'Synthetic', facilities: ['Parking', 'Equipment Rental'] },
  { name: 'Model Town Padel', location: 'Lahore', courtType: 'Professional Glass Court', price: 'Rs. 2,700', priceNum: 2700, image: INDOOR_IMG, indoor: true, surface: 'Glass', facilities: ['Parking', 'Cafe', 'Coaching', 'First Aid'] },
  { name: 'Clifton Padel Club', location: 'Karachi', courtType: 'Professional Glass Court', price: 'Rs. 3,000', priceNum: 3000, image: GLASS_IMG, indoor: true, surface: 'Glass', facilities: ['Parking', 'Locker Rooms', 'Coaching', 'Cafe', 'Gym'] },
  { name: 'Defence Padel Arena', location: 'Karachi', courtType: 'Premium Indoor Court', price: 'Rs. 2,700', priceNum: 2700, image: INDOOR_IMG, indoor: true, surface: 'Artificial Grass', facilities: ['Parking', 'Locker Rooms', 'Showers'] },
  { name: 'Gulshan Padel Zone', location: 'Karachi', courtType: 'Outdoor Court', price: 'Rs. 1,600', priceNum: 1600, image: GLASS_IMG, indoor: false, surface: 'Concrete', facilities: ['Parking', 'First Aid'] },
  { name: 'Bahria Padel Courts', location: 'Karachi', courtType: 'Standard Court', price: 'Rs. 2,300', priceNum: 2300, image: INDOOR_IMG, indoor: true, surface: 'Synthetic', facilities: ['Parking', 'Equipment Rental', 'Coaching'] },
  { name: 'F-10 Padel Club', location: 'Islamabad', courtType: 'Professional Glass Court', price: 'Rs. 2,800', priceNum: 2800, image: GLASS_IMG, indoor: true, surface: 'Glass', facilities: ['Parking', 'Locker Rooms', 'Coaching', 'Cafe'] },
  { name: 'Blue Area Sports Hub', location: 'Islamabad', courtType: 'Premium Indoor Court', price: 'Rs. 2,500', priceNum: 2500, image: INDOOR_IMG, indoor: true, surface: 'Artificial Grass', facilities: ['Parking', 'Showers', 'First Aid'] },
  { name: 'G-11 Padel Arena', location: 'Islamabad', courtType: 'Outdoor Court', price: 'Rs. 2,000', priceNum: 2000, image: GLASS_IMG, indoor: false, surface: 'Synthetic', facilities: ['Parking', 'Equipment Rental'] },
  { name: 'Bahria Town Padel', location: 'Islamabad', courtType: 'Premium Indoor Court', price: 'Rs. 2,400', priceNum: 2400, image: INDOOR_IMG, indoor: true, surface: 'Glass', facilities: ['Parking', 'Locker Rooms', 'Cafe', 'Coaching'] },
  { name: 'Saddar Padel Hub', location: 'Rawalpindi', courtType: 'Premium Indoor Court', price: 'Rs. 1,900', priceNum: 1900, image: GLASS_IMG, indoor: true, surface: 'Artificial Grass', facilities: ['Parking', 'Locker Rooms'] },
  { name: 'Rawalpindi Sports Arena', location: 'Rawalpindi', courtType: 'Outdoor Court', price: 'Rs. 1,500', priceNum: 1500, image: INDOOR_IMG, indoor: false, surface: 'Concrete', facilities: ['Parking', 'First Aid'] },
  { name: 'Chaklala Padel Court', location: 'Rawalpindi', courtType: 'Standard Court', price: 'Rs. 2,100', priceNum: 2100, image: GLASS_IMG, indoor: true, surface: 'Synthetic', facilities: ['Parking', 'Equipment Rental', 'First Aid'] },
  { name: 'Westridge Padel Club', location: 'Rawalpindi', courtType: 'Professional Glass Court', price: 'Rs. 2,300', priceNum: 2300, image: INDOOR_IMG, indoor: true, surface: 'Glass', facilities: ['Parking', 'Locker Rooms', 'Coaching', 'Cafe'] },
  { name: 'Hayatabad Padel Club', location: 'Peshawar', courtType: 'Professional Glass Court', price: 'Rs. 2,400', priceNum: 2400, image: GLASS_IMG, indoor: true, surface: 'Glass', facilities: ['Parking', 'Locker Rooms', 'Coaching', 'Cafe'] },
  { name: 'Peshawar Cantt Padel', location: 'Peshawar', courtType: 'Premium Indoor Court', price: 'Rs. 2,000', priceNum: 2000, image: INDOOR_IMG, indoor: true, surface: 'Artificial Grass', facilities: ['Parking', 'Locker Rooms', 'First Aid'] },
  { name: 'University Town Padel', location: 'Peshawar', courtType: 'Outdoor Court', price: 'Rs. 1,700', priceNum: 1700, image: GLASS_IMG, indoor: false, surface: 'Synthetic', facilities: ['Parking', 'Equipment Rental'] },
  { name: 'Regi Model Town Arena', location: 'Peshawar', courtType: 'Premium Indoor Court', price: 'Rs. 2,100', priceNum: 2100, image: INDOOR_IMG, indoor: true, surface: 'Artificial Grass', facilities: ['Parking', 'Coaching', 'Showers'] },
];

export function findArena(name: string): Arena | undefined {
  return arenas.find((a) => a.name === name);
}
