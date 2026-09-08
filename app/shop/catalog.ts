export const catalog = [
  { slug: 'original-shop-tee', name: 'Original Shop Tee', category: 'Heavyweight tee', price: 34, image: '/product-shop-tee.png', group: 'tees', color: 'Washed black' },
  { slug: 'sumner-service-hoodie', name: 'Sumner Service Hoodie', category: 'Midweight fleece', price: 68, image: '/product-heritage-hoodie.png', group: 'hoodies', color: 'Vintage navy' },
  { slug: 'garage-patch-cap', name: 'Garage Patch Cap', category: 'Five-panel cap', price: 32, image: '/product-garage-cap.png', group: 'headwear', color: 'Black' },
  { slug: 'counter-essentials-kit', name: 'Counter Essentials Kit', category: 'Garage goods', price: 48, image: '/product-shop-kit.png', group: 'goods', color: 'Original' },
  { slug: 'night-shift-tee', name: 'Night Shift Tee', category: 'Pigment-dyed tee', price: 36, image: '/product-shop-tee.png', group: 'tees', color: 'Washed black' },
  { slug: 'bay-door-hoodie', name: 'Bay Door Hoodie', category: 'Heavyweight fleece', price: 72, image: '/product-heritage-hoodie.png', group: 'hoodies', color: 'Vintage navy' },
  { slug: 'wrench-club-cap', name: 'Wrench Club Cap', category: 'Canvas cap', price: 30, image: '/product-garage-cap.png', group: 'headwear', color: 'Black' },
  { slug: 'shop-rag-decal-pack', name: 'Shop Rag + Decal Pack', category: 'Four-piece set', price: 24, image: '/product-shop-kit.png', group: 'goods', color: 'Original' },
] as const;

export type ShopProduct = (typeof catalog)[number];
export const sizes = ['S', 'M', 'L', 'XL', '2XL', '3XL'];
export const money = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
export const isApparel = (product: ShopProduct) => product.group === 'tees' || product.group === 'hoodies';
export const productHref = (name: string) => `/products/${catalog.find((product) => product.name === name)?.slug ?? catalog[0].slug}`;
