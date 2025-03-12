/**
 * SEO Configuration for Constructiv AI
 * 
 * Manages site-wide SEO settings including meta tags, OpenGraph, and Twitter cards.
 * Configured specifically for construction industry targeting small to midsize builders.
 * 
 * @packageDocumentation
 * @module next-seo
 */

// Define types for OpenGraph images
interface OpenGraphImage {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
  type?: string;
}

// Define types for OpenGraph video
interface OpenGraphVideo {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
  type?: string;
  secureUrl?: string;
  description?: string;
  duration?: number;
  releaseDate?: string;
  actors?: Array<{
    profile: string;
    role?: string;
  }>;
  directors?: string[];
  writers?: string[];
  tags?: string[];
}

// Define types for OpenGraph profile
interface OpenGraphProfile {
  firstName?: string;
  lastName?: string;
  username?: string;
  gender?: string;
}

// Define types for OpenGraph book
interface OpenGraphBook {
  authors?: string[];
  isbn?: string;
  releaseDate?: string;
  tags?: string[];
}

// Define types for OpenGraph article
interface OpenGraphArticle {
  publishedTime?: string;
  modifiedTime?: string;
  expirationTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
}

// Define types for Twitter card
interface TwitterCard {
  cardType?: string;
  site?: string;
  handle?: string;
}

// Define types for additional meta tags
interface AdditionalMetaTag {
  keyOverride?: string;
  content: string;
  property?: string;
  name?: string;
  httpEquiv?: string;
}

// Define types for additional link tags
interface AdditionalLinkTag {
  keyOverride?: string;
  rel: string;
  href: string;
  sizes?: string;
  type?: string;
  as?: string;
  crossOrigin?: string;
}

// Define main SEO configuration interface
interface SEOConfig {
  titleTemplate?: string;
  title?: string;
  defaultTitle?: string;
  noindex?: boolean;
  nofollow?: boolean;
  robotsProps?: {
    nosnippet?: boolean;
    notranslate?: boolean;
    noimageindex?: boolean;
    noarchive?: boolean;
    maxSnippet?: number;
    maxImagePreview?: 'none' | 'standard' | 'large';
    maxVideoPreview?: number;
  };
  description?: string;
  canonical?: string;
  mobileAlternate?: {
    media: string;
    href: string;
  };
  languageAlternates?: Array<{
    hrefLang: string;
    href: string;
  }>;
  openGraph?: {
    url?: string;
    type?: string;
    title?: string;
    description?: string;
    images?: OpenGraphImage[];
    videos?: OpenGraphVideo[];
    locale?: string;
    site_name?: string;
    profile?: OpenGraphProfile;
    book?: OpenGraphBook;
    article?: OpenGraphArticle;
  };
  twitter?: TwitterCard;
  facebook?: {
    appId?: string;
  };
  additionalMetaTags?: AdditionalMetaTag[];
  additionalLinkTags?: AdditionalLinkTag[];
}

// Default SEO configuration
const defaultSEO: SEOConfig = {
  titleTemplate: '%s | Constructiv AI',
  defaultTitle: 'Constructiv AI - Smart Pre-Construction Management for Builders',
  description: 'AI-powered platform helping small to midsize builders streamline pre-construction planning, estimating, and project management. Purpose-built for construction companies managing 15-25 projects annually.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://constructiv.ai/',
    site_name: 'Constructiv AI',
    images: [
      {
        url: 'https://constructiv.ai/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Constructiv AI - Smart Pre-Construction Management Platform',
      }
    ],
    description: 'Streamline your construction planning with AI-powered tools for accurate estimating, efficient scheduling, and simplified project management.',
  },
  twitter: {
    handle: '@constructiv_ai',
    site: '@constructiv_ai',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'theme-color',
      content: '#000000',
    },
    {
      name: 'keywords',
      content: 'construction management, pre-construction planning, construction estimating, builder software, construction AI, project management, small builders, construction technology',
    },
    {
      name: 'application-name',
      content: 'Constructiv AI',
    }
  ]
};

export default defaultSEO;
