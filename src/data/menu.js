export const menuCategories = [
  { id: 'chicken', name: 'Chicken Dum Biryani', tagline: 'The signature' },
  { id: 'mutton', name: 'Mutton Biryani', tagline: 'Slow-cooked luxury' },
  { id: 'family', name: 'Family Packs', tagline: 'Made to share' },
  { id: 'special', name: 'Special Biryani', tagline: 'Chef’s creations' },
  { id: 'starters', name: 'Starters', tagline: 'The opening act' },
  { id: 'beverages', name: 'Beverages', tagline: 'Cool the spice' },
  { id: 'desserts', name: 'Desserts', tagline: 'A sweet ending' },
]

export const menuItems = [
  // Chicken
  {
    id: 'signature-chicken-dum',
    category: 'chicken',
    name: 'Signature Chicken Dum Biryani',
    description:
      'Sneha Farm chicken layered with long-grain basmati, slow-cooked in a sealed handi with saffron, mint and traditional Hyderabadi masalas.',
    price: 260,
    tag: 'Signature',
    image:
      'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'chicken-boneless-dum',
    category: 'chicken',
    name: 'Chicken Boneless Dum',
    description:
      'Tender boneless chicken marinated overnight in yogurt and whole spices, dum-cooked on low flame.',
    price: 290,
    image:
      'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'chicken-fry-piece',
    category: 'chicken',
    name: 'Chicken Fry Piece Biryani',
    description:
      'Signature dum biryani crowned with a golden fried leg piece — crisp outside, silken within.',
    price: 320,
    tag: 'Chef’s pick',
    image:
      'https://images.unsplash.com/photo-1633945274309-2c16c31e77b5?auto=format&fit=crop&w=1600&q=80',
  },
  // Mutton
  {
    id: 'mutton-dum',
    category: 'mutton',
    name: 'Hyderabadi Mutton Dum Biryani',
    description:
      'Aged, hand-cut mutton simmered with saffron milk, browned onions and heritage masalas — a four-hour ceremony on the flame.',
    price: 420,
    tag: 'House favorite',
    image:
      'https://images.unsplash.com/photo-1701579231378-3726490a407b?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'mutton-keema',
    category: 'mutton',
    name: 'Mutton Keema Biryani',
    description:
      'Minced mutton, ghee-toasted rice, whole cardamom and a whisper of rose water.',
    price: 380,
    image:
      'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1600&q=80',
  },
  // Family packs
  {
    id: 'family-jumbo',
    category: 'family',
    name: 'Family Jumbo Handi (Serves 4)',
    description:
      'A grand copper handi of signature dum biryani, raita, salan and shorba. Served at your table, opened at your table.',
    price: 1099,
    tag: 'Serves 4',
    image:
      'https://images.unsplash.com/photo-1701579231349-d7459c40919d?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'family-mutton',
    category: 'family',
    name: 'Family Mutton Feast (Serves 6)',
    description:
      'Slow-cooked mutton dum, hara masala kebab, sheer khurma and a live steam presentation.',
    price: 1899,
    tag: 'Serves 6',
    image:
      'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=1600&q=80',
  },
  // Special
  {
    id: 'special-nizami',
    category: 'special',
    name: 'Nizami Reserve Biryani',
    description:
      'A limited weekend creation — kesar-infused basmati, edible silver leaf, house-blended garam masala.',
    price: 549,
    tag: 'Limited',
    image:
      'https://images.unsplash.com/photo-1633945274309-2c16c31e77b5?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'special-veg',
    category: 'special',
    name: 'Royal Vegetable Dum',
    description:
      'Baby vegetables, paneer and cashew braise, sealed with dough and finished on charcoal.',
    price: 249,
    image:
      'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=1600&q=80',
  },
  // Starters
  {
    id: 'chicken-65',
    category: 'starters',
    name: 'Andhra Chicken 65',
    description:
      'Signature crispy fry with curry leaves, ghost chilli and a squeeze of Nellore lime.',
    price: 220,
    image:
      'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'kebab-hara',
    category: 'starters',
    name: 'Hara Masala Kebab',
    description:
      'Coriander, mint and green chilli marinated chicken, kissed by the tandoor.',
    price: 240,
    image:
      'https://images.unsplash.com/photo-1633945274309-2c16c31e77b5?auto=format&fit=crop&w=1600&q=80',
  },
  // Beverages
  {
    id: 'saffron-lassi',
    category: 'beverages',
    name: 'Saffron Kesar Lassi',
    description:
      'Thick yogurt whisked with saffron, cardamom and a whisper of rose.',
    price: 90,
    image:
      'https://images.unsplash.com/photo-1638176067000-9e2545bb54c8?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'irani-chai',
    category: 'beverages',
    name: 'Hyderabadi Irani Chai',
    description:
      'A slow-brewed decoction, whole milk, palm sugar. Served in vintage porcelain.',
    price: 60,
    image:
      'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=1600&q=80',
  },
  // Desserts
  {
    id: 'double-ka-meetha',
    category: 'desserts',
    name: 'Double Ka Meetha',
    description:
      'Hyderabad’s beloved bread pudding, saffron milk, ghee-fried bread, crowned with pistachio.',
    price: 140,
    tag: 'Tradition',
    image:
      'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'sheer-khurma',
    category: 'desserts',
    name: 'Sheer Khurma',
    description:
      'Vermicelli in reduced milk with dates, almonds and a hint of kewra.',
    price: 160,
    image:
      'https://images.unsplash.com/photo-1567337710282-00832b415979?auto=format&fit=crop&w=1600&q=80',
  },
]
