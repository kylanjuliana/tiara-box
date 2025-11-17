"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useAnimation } from "framer-motion";

type TiaraBoxItem =
  | {
      type: "letter";
      title?: string;
      body: string;
    }
  | {
      type: "image";
      src: string;
      alt: string;
      caption?: string;
    };

const tiaraBoxItems: TiaraBoxItem[] = [
  {
    type: "letter",
    title: "A Little Note",
    body: "This is a tiny placeholder letter. You can replace this with a real message later.",
  },
  {
    type: "image",
    src: "/next.svg",
    alt: "Placeholder image",
    caption: "Replace this with a special image.",
  },
];

type TiaraBoxProps = {
  unlocked: boolean;
};

export function TiaraBox({ unlocked }: TiaraBoxProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);

  const currentItem = tiaraBoxItems[currentIndex];

  const boxControls = useAnimation();

  useEffect(() => {
    if (!unlocked) {
      // Locked: slow bouncy wiggle
      boxControls.start({
        y: [0, -6, 0],
        rotateZ: [0, -2, 2, 0],
        scale: 1,
        transition: {
          duration: 2.2,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        },
      });
    } else {
      // Unlock moment: quick jump/pop once, then rest
      boxControls.start({
        y: [0, -6, 0],
        scale: [1, 1.06, 1],
        rotateZ: 0,
        transition: {
          duration: 0.5,
          ease: "easeOut",
        },
      });
    }
  }, [unlocked, boxControls]);

  function handleNext() {
    if (!unlocked) {
      return;
    }

    if (!hasOpenedOnce) {
      setHasOpenedOnce(true);
      return;
    }

    setCurrentIndex((prev) => (prev + 1) % tiaraBoxItems.length);
  }

  return (
    <motion.button
      type="button"
      onClick={handleNext}
      animate={boxControls}
      initial={false}
      whileHover={
        unlocked
          ? { scale: 1.03, y: -4 }
          : undefined
      }
      whileTap={
        unlocked
          ? { scale: 0.97, y: 0 }
          : undefined
      }
      className={`relative flex h-72 w-72 flex-col items-center justify-center rounded-2xl border border-cyan-300 bg-gradient-to-br from-cyan-100 to-cyan-200 p-4 shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-cyan-400/60 sm:h-80 sm:w-80 transition-opacity ${
        unlocked ? "opacity-100 cursor-pointer" : "opacity-60 cursor-default"
      }`}
      aria-disabled={!unlocked}
      aria-label={
        !unlocked
          ? "Gift box locked until countdown ends"
          : hasOpenedOnce
          ? "Reveal the next surprise"
          : "Open Tiara's gift box"
      }
    >
      {/* Gift box base */}
      <div className="relative flex h-full w-full flex-col items-stretch justify-between">
        {/* Lid */}
        <motion.div
          className="relative z-20 h-2/5 rounded-2xl bg-gradient-to-b from-cyan-200 to-cyan-300 shadow-md"
          animate={
            hasOpenedOnce && unlocked
              ? { y: -12, rotateX: 18 }
              : { y: 0, rotateX: 0 }
          }
          transition={{ type: "spring", stiffness: 120, damping: 12 }}
          style={{ transformOrigin: "bottom center" }}
        >
          {/* Ribbon and bow suggestion */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-full w-4 rounded-full bg-white/80" />
          </div>
          <div className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
            <div className="h-3 w-3 rounded-full bg-rose-200 shadow-sm" />
            <div className="h-3 w-3 rounded-full bg-rose-200 shadow-sm" />
          </div>
        </motion.div>

        {/* Box body */}
        <div className="relative z-10 flex h-3/5 flex-col rounded-2xl bg-gradient-to-t from-cyan-200 to-cyan-100 px-4 pb-4 pt-6 shadow-md">
          {/* Vertical ribbon */}
          <div className="pointer-events-none absolute inset-y-0 left-1/2 w-4 -translate-x-1/2 bg-white/80" />
          {/* Horizontal ribbon */}
          <div className="pointer-events-none absolute inset-x-4 top-1/2 h-3 -translate-y-1/2 rounded-full bg-white/70" />

          {/* Inner content area */}
          <div className="relative z-10 flex h-full w-full items-center justify-center">
            {!unlocked ? (
              <div className="flex flex-col items-center gap-2 text-center">
                <p className="text-sm font-semibold text-cyan-900">
                  locked until you finish your thingy
                </p>
              </div>
            ) : !hasOpenedOnce ? (
              <div className="flex flex-col items-center gap-2 text-center">
                <p className="text-sm font-semibold text-cyan-900">
                  Click to open your gift
                </p>
                <p className="max-w-[9rem] text-xs text-cyan-800/80">
                  Each click reveals a new surprise inside the box.
                </p>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="flex h-full w-full items-center justify-center"
                >
                  {currentItem.type === "letter" ? (
                    <div className="flex h-full w-full flex-col items-start justify-center rounded-xl bg-white/85 p-3 text-left shadow-sm">
                      {currentItem.title && (
                        <h2 className="mb-1 text-xs font-semibold text-cyan-900">
                          {currentItem.title}
                        </h2>
                      )}
                      <p className="max-h-28 w-full overflow-y-auto text-[11px] leading-relaxed text-slate-800">
                        {currentItem.body}
                      </p>
                    </div>
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center rounded-xl bg-white/85 p-2 text-center shadow-sm">
                      <div className="relative mb-2 h-20 w-full">
                        <Image
                          src={currentItem.src}
                          alt={currentItem.alt}
                          fill
                          className="object-contain"
                        />
                      </div>
                      {currentItem.caption && (
                        <p className="text-[11px] text-slate-700">
                          {currentItem.caption}
                        </p>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </motion.button>
  );
}
