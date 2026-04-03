import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [clicked, setClicked] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 250 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    setIsMobile(isCoarse);

    if (isCoarse) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorX, cursorY]);

  if (isMobile) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[999999]">
      {/* Outer Comic Pulse */}
      <motion.div
        className="fixed w-10 h-10 border-4 border-black box-content flex items-center justify-center p-1"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: clicked ? 0.8 : 1,
          rotate: clicked ? 45 : 0
        }}
      >
         {/* Inner Target Point */}
         <div className="w-2 h-2 bg-primary border-2 border-black rotate-45" />
      </motion.div>
      
      {/* Trailing Action Sticker (Optional, very subtle) */}
      <motion.div
        className="fixed px-2 py-0.5 bg-[#ffb703] border-2 border-black text-[8px] font-black italic shadow-[4px_4px_0px_#000] z-20"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "25px",
          translateY: "25px",
        }}
        animate={{
           opacity: clicked ? 1 : 0,
           rotate: -15
        }}
      >
        CLICKED!
      </motion.div>
    </div>
  );
};
