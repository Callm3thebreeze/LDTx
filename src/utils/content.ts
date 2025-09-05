// Funciones utilitarias para cargar contenido centralizado
import type { BlogPost, Product, Category } from '../types';

// Cargar contenido del sitio (hero, secciones, etc.)
export async function getSiteContent() {
  const { default: content } = await import('../data/site-content.json');
  return content;
}

// Cargar posts del blog
export async function getBlogPosts(): Promise<BlogPost[]> {
  const { default: posts } = await import('../data/blog-posts.json');
  return posts.map((post) => ({
    ...post,
    publishDate: new Date(post.publishDate),
  }));
}

// Cargar posts destacados
export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  const posts = await getBlogPosts();
  return posts.filter((post) => post.featured);
}

// Cargar posts por categoría
export async function getBlogPostsByCategory(
  category: string
): Promise<BlogPost[]> {
  const posts = await getBlogPosts();
  return posts.filter((post) => post.category === category);
}

// Cargar productos
export async function getProducts(): Promise<Product[]> {
  const { default: products } = await import('../data/products.json');
  return products;
}

// Cargar productos destacados
export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((product) => product.featured);
}

// Cargar productos por categoría
export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((product) => product.category === category);
}

// Cargar un producto por slug
export async function getProductBySlug(
  slug: string
): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((product) => product.slug === slug);
}

// Cargar categorías
export async function getCategories(): Promise<Category[]> {
  const { default: categories } = await import('../data/categories.json');
  return categories;
}

// Cargar contenido de páginas
export async function getPagesContent() {
  const { default: content } = await import('../data/pages-content.json');
  return content;
}

// Cargar contenido específico de una página
export async function getPageContent(pageKey: string) {
  const content = await getPagesContent();
  return content.pages[pageKey] || null;
}

// Cargar subcategorías de una categoría específica
export async function getSubcategoriesByCategory(category: string) {
  const products = await getProductsByCategory(category);
  const subcategories = new Map();

  products.forEach((product) => {
    if (product.subcategory) {
      const key = product.subcategory;
      if (subcategories.has(key)) {
        subcategories.set(key, subcategories.get(key) + 1);
      } else {
        subcategories.set(key, 1);
      }
    }
  });

  return Array.from(subcategories.entries()).map(([slug, count]) => ({
    name: slug.charAt(0).toUpperCase() + slug.slice(1),
    slug,
    count,
  }));
}
