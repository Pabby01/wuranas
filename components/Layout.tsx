import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { PropsWithChildren } from 'react';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -20,
  },
};

export default function Layout({ children }: PropsWithChildren) {
  const router = useRouter();

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={router.route}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
        }}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
