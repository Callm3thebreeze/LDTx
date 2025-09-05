export interface BlogPost {
  id: string;
  title: string;
  description: string;
  category: string;
  slug: string;
  publishDate: Date;
  author: string;
  image?: string;
  tags: string[];
  content: string;
  featured?: boolean;
  readTime?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory?: string;
  slug: string;
  price: number;
  originalPrice?: number;
  affiliateLink: string;
  image: string;
  images?: string[];
  rating?: number;
  reviews?: number;
  features: string[];
  tags: string[];
  inStock: boolean;
  featured?: boolean;
  brand?: string;
  warranty?: string;
  specifications?: Record<string, string>;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
  parent?: string;
}

export interface SiteConfig {
  title: string;
  description: string;
  author: string;
  url: string;
  social: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    email: string;
  };
}
