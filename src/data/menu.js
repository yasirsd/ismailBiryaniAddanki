import { fryPic, lassiPic, nizamiPic } from '@/assets/images'

const img = (id) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`

export const menuCategories = [
  { id: 'bread', name: 'Indian Bread', tagline: 'From the tandoor' },
  { id: 'biryani', name: "Ismail's Biryani Specials", tagline: 'The house specials' },
  { id: 'veg', name: 'Veg Curries', tagline: 'From the curry pot' },
  { id: 'chicken-bone', name: 'Chicken Curries (Bones)', tagline: 'Cooked on the bone' },
  { id: 'chicken-boneless', name: 'Chicken Curries (Bone Less)', tagline: 'Bone less curries' },
  { id: 'rice', name: 'Fried Rice', tagline: 'Tossed to order' },
  { id: 'desserts', name: 'Desserts', tagline: 'A sweet ending' },
]

export const menuItems = [
  {
    id: 'butter-naan',
    category: 'bread',
    name: 'Butter Naan',
    description: 'Soft tandoor naan, finished with butter.',
    price: 75,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Butter_Naan_2.jpg/960px-Butter_Naan_2.jpg',
  },
  {
    id: 'roti',
    category: 'bread',
    name: 'Roti',
    description: 'Whole-wheat roti, cooked on the tandoor.',
    price: 55,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Tandoori-rotis.jpg/960px-Tandoori-rotis.jpg',
  },
  {
    id: 'chicken-dum-2',
    category: 'biryani',
    name: 'Chicken Dum (2 Pcs.) Biryani',
    description:
      'Chicken and long-grain basmati, slow-cooked the dum way with saffron and mint.',
    price: 240,
    tag: 'Signature',
    image: nizamiPic,
    objectPosition: '38% 58%',
  },
  {
    id: 'chicken-fry-3',
    category: 'biryani',
    name: 'Chicken Fry (3 Pcs.) Biryani',
    description: 'Dum biryani served with fried chicken pieces.',
    price: 260,
    tag: "Chef's pick",
    image: fryPic,
    objectPosition: '62% 55%',
  },
  {
    id: 'mutton-dum-4',
    category: 'biryani',
    name: 'Mutton Dum (4 Pcs.) Biryani',
    description: 'Slow-cooked mutton dum biryani, finished with saffron rice.',
    price: 450,
    tag: 'House favorite',
    image: img('1633945274405-b6c8069047b0'),
    objectPosition: '50% 46%',
  },
  {
    id: 'paneer-butter-masala',
    category: 'veg',
    name: 'Paneer Butter Masala',
    description: 'Paneer in a tomato and butter gravy.',
    price: 385,
    image: img('1588166524941-3bf61a9c41db'),
  },
  {
    id: 'palak-paneer',
    category: 'veg',
    name: 'Palak Paneer',
    description: 'Paneer simmered in a spinach gravy.',
    price: 320,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Palak_Paneer_at_WCI_2023.jpg/960px-Palak_Paneer_at_WCI_2023.jpg',
  },
  {
    id: 'kadai-paneer',
    category: 'veg',
    name: 'Kadai Paneer',
    description: 'Paneer and capsicum in a kadai masala.',
    price: 380,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Kadai_paneer_with_garlic_naan.jpg/960px-Kadai_paneer_with_garlic_naan.jpg',
  },
  {
    id: 'chicken-curry-bone',
    category: 'chicken-bone',
    name: 'Chicken Curry',
    description: 'Chicken simmered in a spiced onion and tomato gravy.',
    price: 375,
    image: img('1565557623262-b51c2513a641'),
  },
  {
    id: 'butter-chicken',
    category: 'chicken-boneless',
    name: 'Butter Chicken',
    description: 'Boneless chicken in a creamy tomato and butter gravy.',
    price: 440,
    image: img('1603894584373-5ac82b2ae398'),
  },
  {
    id: 'veg-fried-rice',
    category: 'rice',
    name: 'Veg. Fried Rice',
    description: 'Rice tossed with mixed vegetables.',
    price: 310,
    image: img('1603133872878-684f208fb84b'),
  },
  {
    id: 'egg-fried-rice',
    category: 'rice',
    name: 'Egg Fried Rice',
    description: 'Rice tossed with egg.',
    price: 320,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Egg_Fried_Rice.jpg/960px-Egg_Fried_Rice.jpg',
  },
  {
    id: 'zeera-rice',
    category: 'rice',
    name: 'Zeera Rice',
    description: 'Steamed rice tempered with cumin.',
    price: 300,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Jeera_rice.jpg/960px-Jeera_rice.jpg',
  },
  {
    id: 'lassi',
    category: 'desserts',
    name: 'Lassi (Sweet / Salt)',
    description: 'Chilled yogurt lassi, served sweet or salted.',
    price: 75,
    image: lassiPic,
    objectPosition: '50% 68%',
  },
]
