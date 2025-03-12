# Next-SEO Implementation Guide

## Overview

- Feature: Search Engine Optimization (SEO) and Social Media Preview Configuration
- Impact: High - Critical for website visibility and professional social sharing
- Timeline: 1-2 days for initial setup, ongoing maintenance

## Requirements

### User Story

As a construction technology company, we need our website to be easily discoverable in search engines and look professional when shared on social media platforms, particularly LinkedIn where our target audience (small to midsize builders) is active.

### Key Requirements

1. **SEO Configuration**
   - Proper meta tags for search engines
   - Consistent title and description format
   - Keywords targeting construction industry

2. **Social Media Preview Cards**
   - Professional appearance on LinkedIn and Twitter
   - High-quality images
   - Compelling descriptions

3. **Implementation Needs**
   - Next.js compatible
   - TypeScript support
   - Easy to maintain and update

### Success Metrics

- Proper rendering of social media preview cards
- Valid SEO meta tags
- Consistent branding across all pages

## Implementation

### Dependencies

- next-seo package (no additional packages needed)
- Next.js framework
- TypeScript

### Setup Instructions

1. **Installation**

   ```bash
   npm install next-seo
   # or
   yarn add next-seo
   ```

2. **File Structure**

   ```project-structure
   src/
   ├── config/
   │   └── next-seo.ts    # Main SEO configuration
   └── pages/
       └── _app.tsx       # Global SEO implementation
   ```

3. **Image Requirements**
   - OpenGraph Image Size: 1200x630 pixels
   - Format: JPG or PNG
   - Quality: High resolution, clear branding
   - Location: public/images/og-image.jpg
   - Alt text: Must be descriptive

4. **Content Configuration Best Practices**
   - Titles: 50-60 characters
   - Descriptions: 150-160 characters
   - Keywords: Construction industry specific
   - URLs: Clean, descriptive paths

### Implementation Examples

1. **Global SEO Setup (_app.tsx)**

   ```typescript
   import { DefaultSeo } from 'next-seo';
   import defaultSEO from '../config/next-seo';

   function MyApp({ Component, pageProps }) {
     return (
       <>
         <DefaultSeo {...defaultSEO} />
         <Component {...pageProps} />
       </>
     );
   }
   ```

2. **Page-Specific SEO**

   ```typescript
   import { NextSeo } from 'next-seo';

   function EstimatingPage() {
     return (
       <>
         <NextSeo
           title="Construction Cost Estimating"
           description="AI-powered estimating for builders"
         />
         {/* Page content */}
       </>
     );
   }
   ```

### Testing & Validation

1. **Social Media Preview Testing**
   - LinkedIn Post Inspector: <https://www.linkedin.com/post-inspector/>
   - Twitter Card Validator: <https://cards-dev.twitter.com/validator>
   - Facebook Sharing Debugger: <https://developers.facebook.com/tools/debug/>

2. **SEO Validation**
   - View page source to verify meta tags
   - Use browser dev tools to inspect `<head>` section
   - Test with Google's Mobile-Friendly Test

### Monitoring

1. **Regular Checks**
   - Monthly review of SEO performance
   - Validation of social media previews
   - Update content as product offerings evolve

2. **Common Issues to Watch**
   - Broken image links
   - Outdated descriptions
   - Missing meta tags
   - Incorrect image dimensions

## Additional Notes

### Image Best Practices

1. **Main OG Image**
   - Professional, clean design
   - Include company logo
   - Minimal text
   - Clear value proposition

2. **Page-Specific Images**
   - Relevant to page content
   - Consistent branding
   - High contrast for readability
   - Optimized file size

### Content Guidelines

1. **Titles**
   - Include main keyword
   - Be specific and descriptive
   - Follow format: "[Page Title] | Constructiv AI"

2. **Descriptions**
   - Include target keywords naturally
   - Focus on value proposition
   - Be concise but informative
   - Include call to action when appropriate

### Regular Maintenance

- Update images as branding evolves
- Refresh descriptions with new features
- Monitor and update keywords
- Keep social media handles current
