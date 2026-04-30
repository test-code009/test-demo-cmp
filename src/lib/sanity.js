import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'vsh21wfq',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01',
  useCdn: true,
  perspective: 'published',
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  if (!source || !source.asset) return null;
  return builder.image(source);
}

// Shared product fields for all queries
const PRODUCT_FIELDS = `
  _id,
  titleLv,
  titleEn,
  "slug": slug.current,
  mainImage,
  imageAltLv,
  imageAltEn,
  shortDescriptionLv,
  shortDescriptionEn,
  price,
  "category": category->{titleLv, titleEn, "slug": slug.current},
  featured
`;

export async function getProducts({ featured } = {}) {
  const conditions = ['_type == "product"'];
  if (featured === true) conditions.push('featured == true');

  const query = `*[${conditions.join(' && ')}]{
    ${PRODUCT_FIELDS}
  } | order(_createdAt desc)`;

  return await client.fetch(query);
}

export async function getProductBySlug(slug) {
  return await client.fetch(
    `*[_type == "product" && slug.current == $slug][0]{
      ${PRODUCT_FIELDS},
      "galleryImages": galleryImages[]{ asset }
    }`,
    { slug }
  );
}

export async function getLatestProducts(limit = 3) {
  return await client.fetch(
    `*[_type == "product"] | order(_createdAt desc) [0...$limit] {
      ${PRODUCT_FIELDS}
    }`,
    { limit }
  );
}

export async function getFeaturedProducts() {
  return await client.fetch(
    `*[_type == "product" && featured == true] | order(_createdAt desc) {
      ${PRODUCT_FIELDS}
    }`
  );
}

export async function getCategories() {
  return await client.fetch(
    `*[_type == "category"] | order(titleLv asc) {
      "slug": slug.current,
      titleLv,
      titleEn
    }`
  );
}
