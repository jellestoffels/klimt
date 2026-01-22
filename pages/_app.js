import '../styles/globals.css';
import Layout from '../components/Layout';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { Inter } from 'next/font/google'; [cite_start]// [cite: 17]

// Initialize font with Latin subset
const inter = Inter({ subsets: ['latin'] });

[cite_start]// Transition Specs from PDF 0.7 [cite: 83, 84, 85]
const transitionAnim = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
};

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isContact = router.pathname === '/contact';

  return (
    // Apply font globally via the className
    <div className={inter.className}>
      <Layout>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={router.pathname}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              duration: 0.7,
              ease: [0.2, 0.8, 0.2, 1]
            }}
          >
            {/* Page Content */}
            <motion.div
              variants={transitionAnim}
              transition={{ duration: 0.3, delay: 0.42 }}
            >
              <Component {...pageProps} />
            </motion.div>

            [cite_start]{/* Transition Overlay [cite: 89, 90] */}
            <motion.div
              className="fixed inset-0 z-[100] pointer-events-none"
              style={{ backgroundColor: isContact ? [cite_start]'rgba(156,156,156,0.92)' : 'rgba(0,0,0,0.92)' }} // [cite: 93, 94]
              initial={{ scaleY: 0, originY: 1 }}
              animate={{ scaleY: 0, transition: { duration: 0.01 } }}
              exit={{ 
                scaleY: [0, 1, 1, 0],
                originY: [1, 1, 0, 0],
                transition: { duration: 0.7, times: [0, 0.4, 0.6, 1], ease: [0.2, 0.8, 0.2, 1] }
              }}
            />
          </motion.div>
        </AnimatePresence>
      </Layout>
    </div>
  );
}