import type { Variants } from "framer-motion";

export const EASE_OUT = [0.16, 1, 0.3, 1] as [number, number, number, number];

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

export const fadeUpVariantsCustom = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT, delay },
  },
});

export const staggerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
