import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'vsh21wfq',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

export async function getProducts({ category, featured } = {}) {
  let filter = '*[_type == "product"';
  const conditions = [];
  if (category) conditions.push(`category == "${category}"`);
  if (featured === true) conditions.push('featured == true');
  if (conditions.length) filter += ' && ' + conditions.join(' && ');
  filter += ']';

  return await client.fetch(`
    ${filter}{
      _id,
      title,
      "slug": slug.current,
      mainImage,
      shortDescription,
      category,
      price,
      featured
    } | order(_createdAt desc)
  `);
}

export async function getProductBySlug(slug) {
  return await client.fetch(
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
}

export async function getCategories() {
  return await client.fetch(
    `array::unique(*[_type == "product"].category)`
  );
}
