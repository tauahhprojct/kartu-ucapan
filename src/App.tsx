/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { ConfettiBurst } from './components/ConfettiBurst';
import { EnvelopeWelcome } from './components/EnvelopeWelcome';
import { ScrapbookPage } from './components/ScrapbookPage';
import { shouldAutostartFromSearch } from './utils/scrapbookState';

export default function App() {
  const [hasOpened, setHasOpened] = useState<boolean>(() =>
    shouldAutostartFromSearch(window.location.search)
  );
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (!showConfetti) return;
    const timer = window.setTimeout(() => {
      setShowConfetti(false);
    }, 4800);
    return () => window.clearTimeout(timer);
  }, [showConfetti]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#FFFDF8] text-[#1E263B]">
        <ConfettiBurst active={showConfetti} />

        <AnimatePresence mode="wait">
          {!hasOpened ? (
            <motion.div
              key="welcome-envelope"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <EnvelopeWelcome
                onStartOpening={() => setShowConfetti(true)}
                onOpenComplete={() => setHasOpened(true)}
              />
            </motion.div>
          ) : (
            <motion.div
              key="scrapbook-main"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <ScrapbookPage />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
