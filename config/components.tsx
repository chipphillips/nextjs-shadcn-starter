'use client';

import { AIVoiceInputDemo } from '@/components/demos/ai-voice-input-demo';
import { AIInputWithSearchDemo } from '@/components/demos/ai-input-with-search-demo';
import { AIInputWithSuggestionsDemo } from '@/components/demos/ai-input-with-suggestions-demo';
import { GridPatternCardDemo } from '@/components/demos/grid-pattern-card-demo';
import { BentoGridDemo } from '@/components/demos/bento-grid-demo';
import { MeteorsDemo } from '@/components/demos/meteors-demo';
import { ShimmerButtonDemo } from '@/components/demos/shimmer-button-demo';
import { RainbowButtonDemo } from '@/components/demos/rainbow-button-demo';
import { TriggerButtonDemo } from '@/components/demos/trigger-button-demo';
import { type ReactNode } from 'react';

interface ComponentShowcase {
  id: string;
  title: string;
  description: string;
  component: ReactNode;
}

interface Category {
  title: string;
  description: string;
  components: ComponentShowcase[];
}

export const categories: Category[] = [
  {
    title: 'AI Components',
    description: 'Advanced AI-powered components with voice, search, and suggestion capabilities.',
    components: [
      {
        id: 'ai-voice-input',
        title: 'AI Voice Input',
        description: 'A sophisticated voice input component with visualization and time tracking.',
        component: <AIVoiceInputDemo />,
      },
      {
        id: 'ai-input-with-search',
        title: 'AI Input with Search',
        description: 'An advanced input component with web search toggle and file upload capabilities.',
        component: <AIInputWithSearchDemo />,
      },
      {
        id: 'ai-input-with-suggestions',
        title: 'AI Input with Suggestions',
        description: 'A sophisticated input component with customizable action suggestions.',
        component: <AIInputWithSuggestionsDemo />,
      },
    ],
  },
  {
    title: 'Interactive Elements',
    description: 'Beautiful and engaging interactive components for enhanced user experience.',
    components: [
      {
        id: 'trigger-button',
        title: 'Trigger Button',
        description: 'An enhanced button component with smooth animations and visual feedback.',
        component: <TriggerButtonDemo />,
      },
      {
        id: 'shimmer-button',
        title: 'Shimmer Button',
        description: 'An animated button with a shimmering effect that adds visual interest to CTAs.',
        component: <ShimmerButtonDemo />,
      },
      {
        id: 'rainbow-button',
        title: 'Rainbow Button',
        description: 'A stunning button with animated rainbow gradient and glow effect.',
        component: <RainbowButtonDemo />,
      },
    ],
  },
  {
    title: 'Layout Components',
    description: 'Versatile layout components for building beautiful user interfaces.',
    components: [
      {
        id: 'grid-pattern-card',
        title: 'Grid Pattern Card',
        description: 'A sophisticated card component with a grid pattern background and ellipsis dots.',
        component: <GridPatternCardDemo />,
      },
      {
        id: 'bento-grid',
        title: 'Bento Grid',
        description: 'A beautiful grid layout with hover effects and dynamic content.',
        component: <BentoGridDemo />,
      },
      {
        id: 'meteors',
        title: 'Meteors',
        description: 'A beautiful meteor shower animation effect for cards and sections.',
        component: <MeteorsDemo />,
      },
    ],
  },
];