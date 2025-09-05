// Funciones utilitarias para cargar contenido desde Strapi
import type { BlogPost, Product, Category } from '../types';

// Configuración de Strapi
const STRAPI_URL = 'http://localhost:1337';
const API_URL = `${STRAPI_URL}/api`;

// Función helper para hacer peticiones a Strapi
async function fetchFromStrapi(endpoint: string) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`Error fetching ${endpoint}: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching from Strapi:', error);
    // Fallback: intentar cargar desde JSON local
    return null;
  }
}

// ========================================
// FUNCIONES DE CONTENIDO DEL SITIO (Strapi)
// ========================================

// Cargar contenido del sitio desde Strapi
export async function getSiteContent() {
  const data = await fetchFromStrapi('/site-contents?populate=*');

  if (!data) {
    // Fallback: cargar desde JSON local
    const { default: content } = await import('../data/site-content.json');
    return content;
  }

  // Transformar datos de Strapi al formato esperado
  const siteContent: any = {};

  data.data.forEach((item: any) => {
    const section = item.attributes.section;
    const content = item.attributes.content;

    if (section === 'hero') {
      siteContent.hero = content;
    } else if (section === 'blog') {
      siteContent.sections = siteContent.sections || {};
      siteContent.sections.blog = content;
    } else if (section === 'products') {
      siteContent.sections = siteContent.sections || {};
      siteContent.sections.products = content;
    } else if (section === 'cta') {
      siteContent.sections = siteContent.sections || {};
      siteContent.sections.cta = content;
    }
  });

  return siteContent;
}

// ========================================
// FUNCIONES DE BLOG POSTS (Strapi)
// ========================================

// Cargar posts del blog desde Strapi
export async function getBlogPosts(): Promise<BlogPost[]> {
  const data = await fetchFromStrapi('/blog-posts?populate=*');

  if (!data) {
    // Fallback: cargar desde JSON local
    const { default: posts } = await import('../data/blog-posts.json');
    return posts.map((post) => ({
      ...post,
      publishDate: new Date(post.publishDate),
    }));
  }

  // Transformar datos de Strapi al formato esperado
  return data.data.map((item: any) => {
    const attrs = item.attributes;
    return {
      id: item.id.toString(),
      title: attrs.title,
      description: attrs.description,
      category: attrs.category,
      slug: attrs.slug,
      publishDate: new Date(attrs.publishDate),
      author: attrs.author,
      image: attrs.image,
      tags: attrs.tags || [],
      content: attrs.content || '',
      featured: attrs.featured || false,
      readTime: attrs.readTime,
    };
  });
}

// Cargar posts destacados desde Strapi
export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  const posts = await getBlogPosts();
  return posts.filter((post) => post.featured);
}

// Cargar posts por categoría desde Strapi
export async function getBlogPostsByCategory(
  category: string
): Promise<BlogPost[]> {
  const posts = await getBlogPosts();
  return posts.filter((post) => post.category === category);
}

// Cargar un post por slug desde Strapi
export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | undefined> {
  const posts = await getBlogPosts();
  return posts.find((post) => post.slug === slug);
}

// ========================================
// FUNCIONES DE PRODUCTOS (siguen usando JSON)
// ========================================

// Cargar productos (mantiene JSON por ahora)
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

// ========================================
// FUNCIONES DE CATEGORÍAS Y PÁGINAS (siguen usando JSON)
// ========================================

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
