import '../styles/globals.css';
import Layout from '../components/Layout';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { Inter } from 'next/font/google'; 

// Initialize font with Latin subset
const inter = Inter({ subsets: ['latin'] });

const transitionAnim = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
};

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isContact = router.pathname === '/contact';

  return (
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
            <motion.div
              variants={transitionAnim}
              transition={{ duration: 0.3, delay: 0.42 }}
            >
              <Component {...pageProps} />
            </motion.div>

            {/* Transition Overlay */}
            <motion.div
              className="fixed inset-0 z-[100] pointer-events-none"
              style={{ backgroundColor: isContact ? 'rgba(156,156,156,0.92)' : 'rgba(0,0,0,0.92)' }}
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