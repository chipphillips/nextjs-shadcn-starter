/**
 * recommendedPackages.ts (Revised)
 *
 * This file provides a structured list of recommended packages for your Next.js 14 + TypeScript web app,
 * now including Stripe payment integration.
 *
 * Organized into:
 *    1) Must Have
 *    2) Need to Have
 *    3) Nice to Have
 *
 * Also includes which features typically need Zod, TypeScript types, or specific modules.
 *
 * Each package includes ARM64 compatibility status and any architecture-specific considerations.
 */

////////////////////////////////////////////////////////////////////////////////
// PACKAGE RECOMMENDATIONS
////////////////////////////////////////////////////////////////////////////////

export const mustHavePackages = [
    {
      name: "next",
      version: "14.x",
      purpose: "Core framework for routing, server-side rendering, API routes, etc.",
      notes: "Fully compatible with ARM64. Uses App Router features.",
      arm64Status: "Native"
    },
    {
      name: "react",
      version: "18.x",
      purpose: "UI library for building interactive interfaces.",
      notes: "Architecture independent. No ARM64 considerations needed.",
      arm64Status: "Native"
    },
    {
      name: "react-dom",
      version: "18.x",
      purpose: "DOM-specific methods for React; required by Next.js.",
      notes: "Architecture independent.",
      arm64Status: "Native"
    },
    {
      name: "typescript",
      version: "5.3.x",
      purpose: "Static type checking for better developer experience.",
      notes: "Fully compatible with ARM64. Install @types/* packages as needed.",
      arm64Status: "Native"
    },
    {
      name: "tailwindcss",
      version: "^3.4.0",
      purpose: "Utility-first CSS framework for rapid UI development.",
      notes: "Architecture independent. Include postcss and autoprefixer.",
      arm64Status: "Native"
    },
    {
      name: "zod",
      version: "^3.22.0",
      purpose: "Runtime schema validation and type inference.",
      notes: "Architecture independent. No native dependencies.",
      arm64Status: "Native"
    },
    {
      name: "react-hook-form",
      version: "^7.49.0",
      purpose: "Lightweight library for form state management.",
      notes: "Architecture independent. Pairs with Zod.",
      arm64Status: "Native"
    }
  ];
  
  export const needToHavePackages = [
    {
      name: "zustand",
      version: "^4.4.0",
      purpose: "Lightweight, minimal state management.",
      notes: "Architecture independent. Great for UI states.",
      arm64Status: "Native"
    },
    {
      name: "@tanstack/react-query",
      version: "^5.0.0",
      purpose: "Manages server-state caching and data fetching.",
      notes: "Architecture independent. Optimized for ARM64.",
      arm64Status: "Native"
    },
    {
      name: "@supabase/supabase-js",
      version: "^2.39.0",
      purpose: "Client library for Supabase (Postgres, Auth, Storage).",
      notes: "Fully compatible with ARM64.",
      arm64Status: "Native"
    },
    {
      name: "prisma",
      version: "^5.7.0",
      purpose: "ORM for type-safe database queries and migrations.",
      notes: "Native ARM64 support for query engine.",
      arm64Status: "Native"
    },
    {
      name: "ai",
      version: "^2.2.0",
      purpose: "Vercel AI SDK for OpenAI integration.",
      notes: "Architecture independent. Optimized streaming.",
      arm64Status: "Native"
    },
    {
      name: "stripe",
      version: "^14.0.0",
      purpose: "Server-side Stripe integration.",
      notes: "Architecture independent. No native dependencies.",
      arm64Status: "Native"
    },
    {
      name: "@stripe/stripe-js",
      version: "^2.2.0",
      purpose: "Client library for Stripe Checkout.",
      notes: "Architecture independent.",
      arm64Status: "Native"
    }
  ];
  
  export const niceToHavePackages = [
    {
      name: "next-seo",
      version: "^6.4.0",
      purpose: "SEO configuration for Next.js apps.",
      notes: "Architecture independent.",
      arm64Status: "Native"
    },
    {
      name: "next-sitemap",
      version: "^4.2.0",
      purpose: "Generates sitemaps automatically.",
      notes: "Architecture independent.",
      arm64Status: "Native"
    },
    {
      name: "@sentry/nextjs",
      version: "^7.91.0",
      purpose: "Error monitoring and performance tracking.",
      notes: "Native ARM64 support for crash reporting.",
      arm64Status: "Native"
    },
    {
      name: "react-icons",
      version: "^4.12.0",
      purpose: "Pre-built icon sets for your UI.",
      notes: "Architecture independent.",
      arm64Status: "Native"
    },
    {
      name: "clsx",
      version: "^2.0.0",
      purpose: "Conditional utility for className strings.",
      notes: "Architecture independent.",
      arm64Status: "Native"
    }
  ];
  
  ////////////////////////////////////////////////////////////////////////////////
  // FEATURE-TO-PACKAGE MAPPING
  ////////////////////////////////////////////////////////////////////////////////
  
  export const featureToPackageMapping = {
    formsAndValidation: {
      packages: ["react-hook-form", "zod"],
      reason:
        "React Hook Form for form state, Zod for runtime validation + TypeScript inferences."
    },
    globalUIState: {
      packages: ["zustand"],
      reason:
        "Simple store for ephemeral UI states (dialog toggles, voice record states, etc.)."
    },
    serverDataCaching: {
      packages: ["@tanstack/react-query"],
      reason:
        "Built-in caching, retries, and background revalidation for data from your API."
    },
    databaseAndAuth: {
      packages: ["@supabase/supabase-js", "prisma"],
      reason:
        "Supabase for hosted Postgres + Auth; Prisma as a type-safe ORM layer."
    },
    aiAndChatFeatures: {
      packages: ["ai", "openai (optional)"],
      reason:
        "Vercel AI SDK or direct OpenAI calls for GPT-based chat, streaming responses, or voice features."
    },
    paymentAndSubscription: {
      packages: ["stripe", "@stripe/stripe-js"],
      reason:
        "Stripe server library for Checkout sessions & subscriptions; @stripe/stripe-js for client-side integration."
    }
  };
  
  ////////////////////////////////////////////////////////////////////////////////
  // ARCHITECTURE CONSIDERATIONS
  ////////////////////////////////////////////////////////////////////////////////
  
  export const architectureConsiderations = {
    nativeModules: {
        description: "Packages with native dependencies",
        considerations: [
            "Prefer packages with native ARM64 support",
            "Check package.json cpu[] field for architecture support",
            "Some modules may fall back to x64 emulation",
            "Monitor performance impact of emulated modules"
        ]
    },
    buildTools: {
        description: "Build and development tools",
        considerations: [
            "Use ARM64 versions of Node.js and npm",
            "Some build tools may require x64 emulation",
            "Configure appropriate memory limits for ARM64",
            "Monitor build performance and resource usage"
        ]
    },
    performance: {
        description: "Performance optimization",
        considerations: [
            "Leverage ARM64 native performance where possible",
            "Use worker threads for CPU-intensive tasks",
            "Configure appropriate heap sizes for ARM64",
            "Monitor emulation overhead for x64 modules"
        ]
    }
  };
  
  ////////////////////////////////////////////////////////////////////////////////
  // SAMPLE EXPORT
  ////////////////////////////////////////////////////////////////////////////////
  
  export default {
    mustHavePackages,
    needToHavePackages,
    niceToHavePackages,
    featureToPackageMapping
  };
  