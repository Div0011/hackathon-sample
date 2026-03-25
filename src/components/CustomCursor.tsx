import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

export const CustomCursor = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
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
      
      const target = e.target as HTMLElement;
      const isOverInteractive = target.closest('button, a, [role="button"], input, select');
      setIsHovering(!!isOverInteractive);
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
    <div className="fixed inset-0 pointer-events-none z-[10000]">
      {/* Outer Comic Target Ring */}
      <motion.div
        className="fixed w-12 h-12 border-4 border-black box-content flex items-center justify-center p-1 overflow-hidden"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: clicked ? 0.8 : (isHovering ? 1.4 : 1),
          rotate: clicked ? 45 : (isHovering ? 90 : 0),
          borderRadius: isHovering ? "50%" : "4px"
        }}
      >
         {/* Inner Reactive Rainbow Core */}
         <motion.div 
            className="w-full h-full relative"
            animate={{
               rotate: isHovering ? 360 : 0
            }}
            transition={{
               duration: 2,
               repeat: Infinity,
               ease: "linear"
            }}
         >
            {/* Rainbow Conic Gradient (Only visible on hover or active) */}
            <div 
               className={`absolute inset-0 transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}
               style={{
                  background: 'conic-gradient(#ff0000, #ffaa00, #00ff00, #00e3fd, #b330ff, #ff00ff, #ff0000)'
               }}
            />
            
            {/* Inner Core Point */}
            <div className={`absolute inset-1 border-2 border-black flex items-center justify-center bg-white ${isHovering ? 'scale-75' : 'scale-100'} transition-transform`}>
               <div className={`w-2 h-2 border-2 border-black rotate-45 ${isHovering ? 'bg-black' : 'bg-primary'}`} />
            </div>
         </motion.div>
      </motion.div>
      
      {/* Rainbow Trailing Action Label */}
      <AnimatePresence>
        {(clicked || isHovering) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 10 }}
            className={`fixed px-3 py-1 border-2 border-black text-[9px] font-black italic shadow-[6px_6px_0px_#000] z-20 overflow-hidden`}
            style={{
              x: cursorXSpring,
              y: cursorYSpring,
              translateX: "30px",
              translateY: "30px",
              background: isHovering ? 'linear-gradient(90deg, #ff0000, #ffaa00, #00ff00, #00e3fd, #b330ff)' : '#ffb703',
              backgroundSize: '200% auto'
            }}
          >
            <span className={isHovering ? 'text-white' : 'text-black'}>
               {clicked ? 'STRIKE!' : 'SYNC?'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
