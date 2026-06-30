/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { ReactNode } from 'react';
import { motion } from 'motion/react';

interface ScrollAnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  id?: string;
  key?: any; // To satisfy TS key validation on custom components
}

export default function ScrollAnimatedSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.6,
  id,
}: ScrollAnimatedSectionProps) {
  const getVariants = () => {
    const hiddenOffset = 40;
    let x = 0;
    let y = 0;

    if (direction === 'up') y = hiddenOffset;
    if (direction === 'down') y = -hiddenOffset;
    if (direction === 'left') x = hiddenOffset;
    if (direction === 'right') x = -hiddenOffset;

    return {
      hidden: {
        opacity: 0,
        x,
        y,
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for a super fluid, premium feel
        },
      },
    };
  };

  if (direction === 'none') {
    return (
      <motion.div
        id={id}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-10% 0px' }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration, delay } },
        }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10% 0px' }}
      variants={getVariants()}
      className={className}
    >
      {children}
    </motion.div>
  );
}
