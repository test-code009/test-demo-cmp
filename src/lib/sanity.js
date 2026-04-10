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

export async function getProducts({ category, featured } = {}) {
  const conditions = ['_type == "product"'];
  if (category) conditions.push(`category == "${category}"`);
  if (featured === true) conditions.push('featured == true');

  const query = `*[${conditions.join(' && ')}]{
    _id,
    title,
    "slug": slug.current,
    mainImage,
    shortDescription,
    category,
    price,
    featured
  } | order(_createdAt desc)`;

  console.log('[Sanity] running query:', query);
  const result = await client.fetch(query);
  console.log('[Sanity] getProducts result count:', result?.length);
  console.log('[Sanity] getProducts data:', result);
  return result;
}

export async function getProductBySlug(slug) {
  const result = await client.fetch(
    `*[_type == "product" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      mainImage,
      shortDescription,
      description,
      category,
      price,
      featured,
      specs
    }`,
    { slug }
  );
  console.log('[Sanity] getProductBySlug result:', result);
  return result;
}

export async function getCategories() {
  return await client.fetch(
    `array::unique(*[_type == "product"].category)`
  );
}
