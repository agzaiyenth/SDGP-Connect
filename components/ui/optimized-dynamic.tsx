// Copyright (c) 2025, Psycode Lab's (https://www.psycodelabs.lk). All Rights Reserved.
//
// This software is the property of Psycode Lab's. and its suppliers, if any.
// Dissemination of any information or reproduction of any material contained
// herein in any form is strictly forbidden, unless permitted by Psycode Lab's expressly.
// You may not alter or remove any copyright or other notice from copies of this content.
import dynamic from 'next/dynamic';
import React from 'react';

// Optimized dynamic loading with better performance characteristics
export const createOptimizedDynamic = <T extends React.ComponentType<any>>(
  importFunction: () => Promise<{ default: T }>,
  options: {
    ssr?: boolean;
    loading?: () => React.ReactElement;
    fallbackHeight?: string;
  } = {}
) => {
  const {
    ssr = false,
    loading,
    fallbackHeight = '50px'
  } = options;

  return dynamic(importFunction, {
    ssr,
    loading: loading || (() => (
      <div 
        className="animate-pulse bg-muted rounded" 
        style={{ minHeight: fallbackHeight }}
        aria-label="Loading component..."
      />
    ))
  });
};

// Pre-optimized components for common use cases
export const OptimizedMotionDiv = createOptimizedDynamic(
  () => import("framer-motion").then((mod) => ({ default: mod.motion.div })),
  { fallbackHeight: '100px' }
);

export const OptimizedMotionSection = createOptimizedDynamic(
  () => import("framer-motion").then((mod) => ({ default: mod.motion.section })),
  { fallbackHeight: '200px' }
);

export const OptimizedChart = createOptimizedDynamic(
  () => import("recharts").then((mod) => ({ default: mod.ResponsiveContainer })),
  { fallbackHeight: '300px' }
);
