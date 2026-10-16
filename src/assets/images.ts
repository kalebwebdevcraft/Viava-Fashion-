// Direct Vite ES module asset imports - guarantees hashing & emission to dist/assets on Vercel
import heroImg from './images/hero_viava_fashion_1792167759332.jpg';
import habeshaImg from './images/product_habesha_contemporary_1792167760569.jpg';
import tailoredImg from './images/product_streetwear_tailored_1792167760503.jpg';
import eveningImg from './images/product_evening_silk_1792167760833.jpg';
import lifestyleImg from './images/gallery_addis_lifestyle_1792167761891.jpg';

export const FASHION_IMAGES = {
  hero: heroImg,
  habesha: habeshaImg,
  tailored: tailoredImg,
  evening: eveningImg,
  lifestyle: lifestyleImg,
};

// Also expose public static fallback paths
export const STATIC_IMAGES = {
  hero: '/images/hero_viava_fashion.jpg',
  habesha: '/images/product_habesha_contemporary.jpg',
  tailored: '/images/product_streetwear_tailored.jpg',
  evening: '/images/product_evening_silk.jpg',
  lifestyle: '/images/gallery_addis_lifestyle.jpg',
};
